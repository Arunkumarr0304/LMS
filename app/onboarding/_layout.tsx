import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, StatusBar } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function OnboardingLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ExpoStatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
