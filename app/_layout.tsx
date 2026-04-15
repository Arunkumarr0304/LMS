import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import 'react-native-reanimated';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Manrope_200ExtraLight, Manrope_300Light, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Load Manrope fonts
  const [fontsLoaded, fontError] = useFonts({
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  // Check status on mount - ONLY ONCE
  useEffect(() => {
    checkAppStatus();
  }, []);

  // Handle routing after loading is done
  useEffect(() => {
    // Wait for everything to be ready AND initial route to be determined
    if (!isLoading && hasCompletedOnboarding !== null && isAuthenticated !== null && (fontsLoaded || fontError)) {
      
      // Give time for initial route to resolve, then check AsyncStorage FRESH
      const timer = setTimeout(async () => {
        // ALWAYS check AsyncStorage fresh - don't rely on stale state!
        const [freshOnboarding, freshAuth] = await Promise.all([
          AsyncStorage.getItem('hasCompletedOnboarding'),
          AsyncStorage.getItem('isAuthenticated')
        ]);
        
        const completedOnboarding = freshOnboarding === 'true';
        const isUserAuthenticated = freshAuth === 'true';
        
        const currentSegment = segments[0];
        const isOnboardingRoute = currentSegment === 'onboarding';
        const isAuthRoute = currentSegment === '(auth)';
        const isTabsRoute = currentSegment === '(tabs)';
        
        // Define all valid app routes that authenticated users can access
        const validAppRoutes = [
          'course-details',
          'lesson-details',
          'payment',
          'payment-success',
          'my-courses',
          'certificates',
          'payment-history',
          'help-center',
          'settings',
          'notifications',
          'modal'
        ];
        const isValidAppRoute = validAppRoutes.includes(currentSegment);

        // Update state if different (for UI consistency)
        if (completedOnboarding !== hasCompletedOnboarding) {
          setHasCompletedOnboarding(completedOnboarding);
        }
        if (isUserAuthenticated !== isAuthenticated) {
          setIsAuthenticated(isUserAuthenticated);
        }

        if (!completedOnboarding) {
          if (!isOnboardingRoute) {
            router.replace('/onboarding');
          }
        }
        else if (!isUserAuthenticated) {
          if (!isAuthRoute && !isOnboardingRoute) {
            router.replace('/(auth)/login');
          }
        }
        else {
          const isAllowedRoute = isTabsRoute || isValidAppRoute || isOnboardingRoute || isAuthRoute;
          if (!isAllowedRoute) {
            router.replace('/(tabs)');
          }
        }
        SplashScreen.hideAsync();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isLoading, hasCompletedOnboarding, isAuthenticated, segments, router, fontsLoaded, fontError]);

  const checkAppStatus = async () => {
    try {
      const [onboardingValue, authValue] = await Promise.all([
        AsyncStorage.getItem('hasCompletedOnboarding'),
        AsyncStorage.getItem('isAuthenticated')
      ]);
      
      setHasCompletedOnboarding(onboardingValue === 'true');
      setIsAuthenticated(authValue === 'true');
    } catch (error) {
      setHasCompletedOnboarding(false);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading indicator while checking onboarding status OR loading fonts
  if (isLoading || (!fontsLoaded && !fontError)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="course-details" />
        <Stack.Screen name="lesson-details" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="payment-success" />
        <Stack.Screen name="my-courses" options={{ headerShown: true, title: 'My Courses', headerTitleAlign: 'center' }} />
        <Stack.Screen name="certificates" options={{ headerShown: true, title: 'My Certificates', headerTitleAlign: 'center' }} />
        <Stack.Screen name="payment-history" options={{ headerShown: true, title: 'Payment History', headerTitleAlign: 'center' }} />
        <Stack.Screen name="help-center" options={{ headerShown: true, title: 'Help Center', headerTitleAlign: 'center' }} />
        <Stack.Screen name="settings" options={{ headerShown: true, title: 'Settings', headerTitleAlign: 'center' }} />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
