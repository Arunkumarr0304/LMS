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

  // Check onboarding status on mount
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  // Handle routing after loading is done
  useEffect(() => {
    const handleRouting = () => {
      if (!isLoading && hasCompletedOnboarding !== null && (fontsLoaded || fontError)) {
        const currentSegment = segments[0];
        const isOnboardingRoute = currentSegment === 'onboarding';
        const isAuthRoute = currentSegment === '(auth)';

        // Redirect to onboarding only if not completed and not already on onboarding/auth
        if (!hasCompletedOnboarding && !isOnboardingRoute && !isAuthRoute) {
          router.replace('/onboarding');
        }

        // Hide splash screen after routing decision
        SplashScreen.hideAsync();
      }
    };

    handleRouting();
  }, [isLoading, hasCompletedOnboarding, segments, router, fontsLoaded, fontError]);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('hasCompletedOnboarding');
      setHasCompletedOnboarding(value === 'true');
    } catch (error) {
      console.log('Error checking onboarding status:', error);
      setHasCompletedOnboarding(false);
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
        <Stack.Screen name="my-courses" options={{ title: 'My Courses', headerTitleAlign: 'center' }} />
        <Stack.Screen name="certificates" options={{ title: 'My Certificates', headerTitleAlign: 'center' }} />
        <Stack.Screen name="payment-history" options={{ title: 'Payment History', headerTitleAlign: 'center' }} />
        <Stack.Screen name="help-center" options={{ title: 'Help Center', headerTitleAlign: 'center' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings', headerTitleAlign: 'center' }} />
        <Stack.Screen name="notifications" options={{ title: 'Notifications', headerTitleAlign: 'center' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
