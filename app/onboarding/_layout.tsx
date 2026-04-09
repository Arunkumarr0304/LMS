import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, StatusBar, Platform } from 'react-native';
import { useEffect } from 'react';

export default function OnboardingLayout() {
  useEffect(() => {
    // Set Android navigation bar color for onboarding (only if not edge-to-edge)
    if (Platform.OS === 'android') {
      try {
        const NavigationBar = require('expo-navigation-bar');
        // Check if edge-to-edge is available and enabled
        if (NavigationBar.setBackgroundColorAsync) {
          NavigationBar.setBackgroundColorAsync('#000000').catch(() => {});
        }
        if (NavigationBar.setButtonStyleAsync) {
          NavigationBar.setButtonStyleAsync('light').catch(() => {});
        }
      } catch (e) {
        // Ignore if expo-navigation-bar is not available
      }
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#000000"
        translucent={false}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="index" 
          options={{
            contentStyle: { backgroundColor: '#000000' }
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
