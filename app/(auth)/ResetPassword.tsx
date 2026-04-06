import { StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ManropeFonts } from '@/constants/theme';

// Import SVG icons
import { Image } from 'react-native';
const Logo = (props: { width: number; height: number }) => (
  <Image source={require("../../assets/images/splash-icon.png")} style={{ width: props.width, height: props.height }} resizeMode="contain" />
);
import EyeOpen from '../../assets/images/eye.svg';
import EyeClose from '../../assets/images/eye-slash.svg';
import Key from "../../assets/images/key.svg";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleResetPassword = (): void => {
    console.log('Reset password attempt:', { password, confirmPassword });
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Logo width={200} height={72} />
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <ThemedText style={styles.title} weight="semiBold">Reset Password</ThemedText>
            <ThemedText style={styles.subtitle} weight="regular">
              At least 9 characters with uppercase and lowercase letters
            </ThemedText>

            {/* Password Inputs */}
            <View style={styles.inputContainer}>
              <Key width={20} height={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOpen width={20} height={20} style={styles.eyeIcon} />
                ) : (
                  <EyeClose width={20} height={20} style={styles.eyeIcon} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Key width={20} height={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOpen width={20} height={20} style={styles.eyeIcon} />
                ) : (
                  <EyeClose width={20} height={20} style={styles.eyeIcon} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Reset Password Button - Bottom */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
              <ThemedText style={styles.resetButtonText} weight="medium">Reset password</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
  formSection: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
    fontFamily: ManropeFonts.regular,
  },
  eyeIcon: {
    // tint removed for SVG components
  },
  buttonContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  resetButton: {
    backgroundColor: '#5856D6',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
