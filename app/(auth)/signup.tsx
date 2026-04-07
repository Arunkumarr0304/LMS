import { StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Import SVG icons
import { Image } from 'react-native';
const Logo = (props: { width: number; height: number }) => (
  <Image source={require("../../assets/images/splash-icon.png")} style={{ width: props.width, height: props.height }} resizeMode="contain" />
);
import EyeOpen from '../../assets/images/eye.svg';
import EyeClose from '../../assets/images/eye-slash.svg';
import Mail from '../../assets/images/mail.svg';
import Key from "../../assets/images/key.svg";
import User from '../../assets/images/user.svg';
import Phone from '../../assets/images/phone.svg';

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const handleCreateAccount = (): void => {
    console.log('Create account attempt:', { fullName, email, phoneNumber, password });
    router.replace('/(tabs)');
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
              <ThemedText style={styles.tagline} weight="regular">Learn Skills. Grow Daily.</ThemedText>
            </View>

            {/* Sign Up Title Section */}
            <View style={styles.titleSection}>
              <ThemedText style={styles.titleText} weight="bold">Sign Up</ThemedText>
              <ThemedText style={styles.subtitleText} weight="regular">Sign up to start learning</ThemedText>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              {/* Full Name Input */}
              <View style={styles.inputContainer}>
                <User width={20} height={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full name"
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Mail width={20} height={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Phone Number Input */}
              <View style={styles.inputContainer}>
                <Phone width={20} height={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Phone number"
                  placeholderTextColor="#999"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
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

              {/* Confirm Password Input */}
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

              {/* Accept Terms Checkbox */}
              <TouchableOpacity style={styles.termsContainer} onPress={() => setAcceptedTerms(!acceptedTerms)}>
                <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                  {acceptedTerms && <View style={styles.checkboxInner} />}
                </View>
                <ThemedText style={styles.termsText} weight="regular">Accept terms & conditions</ThemedText>
              </TouchableOpacity>

              {/* Create Account Button */}
              <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
                <ThemedText style={styles.createAccountButtonText} weight="semiBold">Create account</ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Login Footer - Fixed at bottom */}
          <View style={[styles.footer, { marginBottom: Math.max(insets.bottom, Platform.OS === 'android' ? 18 : 18) }]}>
            <ThemedText style={styles.footerText} weight="regular">Already have an account? </ThemedText>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <ThemedText style={styles.loginText} weight="semiBold">Login</ThemedText>
            </TouchableOpacity>
          </View>
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
    marginBottom: 20,
  },
  tagline: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  titleSection: {
    marginBottom: 24,
  },
  titleText: {
    fontSize: 24,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    gap: 12,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
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
  termsText: {
    fontSize: 14,
    color: '#666',
  },
  createAccountButton: {
    backgroundColor: '#5856D6',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 18,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  loginText: {
    fontSize: 14,
    color: '#5856D6',
  },
});
