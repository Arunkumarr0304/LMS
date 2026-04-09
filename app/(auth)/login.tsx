import { StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import Logo
import { Image } from 'react-native';
const Logo = (props: { width: number; height: number }) => (
  <Image source={require("../../assets/images/splash-icon.png")} style={{ width: props.width, height: props.height }} resizeMode="contain" />
);
import EyeOpen from '../../assets/images/eye.svg';
import EyeClose from '../../assets/images/eye-slash.svg';
import Mail from '../../assets/images/mail.svg';
import Key from "../../assets/images/key.svg";
import Google from "../../assets/images/google.svg";
import Apple from '../../assets/images/apple.svg';
import Email from '../../assets/images/email.svg';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    console.log('Login attempt:', { email, password });
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    router.replace('/(tabs)');
  };

  const handleSocialLogin = (provider: string): void => {
    console.log('Social login:', provider);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 44 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <Logo width={200} height={72} />
            </View>

            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <ThemedText style={styles.welcomeTitle} weight="bold">Welcome back!</ThemedText>
              <ThemedText style={styles.welcomeSubtitle} weight="regular">Sign in to continue learning</ThemedText>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Mail width={20} height={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email ID / Phone no"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Input */}
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

              {/* Remember Me & Forgot Password */}
              <View style={styles.rememberForgotContainer}>
                <TouchableOpacity style={styles.rememberContainer} onPress={() => setRememberMe(!rememberMe)}>
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <View style={styles.checkboxInner} />}
                  </View>
                  <ThemedText style={styles.rememberText} weight="regular">Remember me</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(auth)/verification')}>
                  <ThemedText style={styles.forgotText} weight="medium">Forgot password?</ThemedText>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <ThemedText style={styles.loginButtonText} weight="semiBold">Login</ThemedText>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <ThemedText style={styles.dividerText} weight="regular">or</ThemedText>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login Buttons */}
              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('google')}>
                  <Google width={24} height={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('apple')}>
                  <Apple width={24} height={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('email')}>
                  <Email width={24} height={24} />
                </TouchableOpacity>
              </View>

              {/* Sign Up Footer - Inside ScrollView */}
              <View style={styles.footer}>
                <ThemedText style={styles.footerText} weight="regular">Don't have an account? </ThemedText>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                  <ThemedText style={styles.signupText} weight="semiBold">Sign up</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tagline: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    gap: 16,
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
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },
  eyeIcon: {
    // tint removed for SVG components
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#5856D6',
    backgroundColor: '#5856D6',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  rememberText: {
    fontSize: 14,
    color: '#666',
  },
  forgotText: {
    fontSize: 14,
    color: '#5856D6',
  },
  loginButton: {
    backgroundColor: '#5856D6',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#999',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  signupText: {
    fontSize: 14,
    color: '#5856D6',
  },
});
