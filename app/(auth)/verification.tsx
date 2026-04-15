import { StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import SVG icons
import { Image } from 'react-native';
const Logo = (props: { width: number; height: number }) => (
  <Image source={require("../../assets/images/splash-icon.png")} style={{ width: props.width, height: props.height }} resizeMode="contain" />
);
import Edit from '../../assets/images/edit-icon.svg';

export default function VerificationScreen() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(['', '', '', '', '']);
  const [timer, setTimer] = useState<number>(23);
  const [isResendActive, setIsResendActive] = useState<boolean>(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendActive(true);
    }
  }, [timer]);

  const handleChangeText = (text: string, index: number) => {
    if (text.length <= 1) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text.length === 1 && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    router.push('/(auth)/ResetPassword');
  };

  const handleResend = () => {
    if (isResendActive) {
      setTimer(23);
      setIsResendActive(false);
      setCode(['', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    return `00:${seconds.toString().padStart(2, '0')}`;
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
            <ThemedText style={styles.title} weight="semiBold">Verify Your Account</ThemedText>
            <ThemedText style={styles.subtitle} weight="regular">
              Enter the verification code we sent to
            </ThemedText>

            <View style={styles.phoneRow}>
              <ThemedText style={styles.phoneNumber} weight="medium">+91 9876543210</ThemedText>
              <TouchableOpacity>
                <Edit width={16} height={16} />
              </TouchableOpacity>
            </View>

            {/* OTP Input Fields */}
            <View style={styles.otpContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref: TextInput | null) => { inputRefs.current[index] = ref; }}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Resend Section - Below OTP */}
            <View style={styles.resendContainer}>
              <ThemedText style={styles.resendQuestion} weight="regular">
                Didn't receive code?
              </ThemedText>
              <TouchableOpacity onPress={handleResend} disabled={!isResendActive}>
                <ThemedText
                  style={[styles.resendText, isResendActive && styles.resendActive]}
                  weight="medium"
                >
                  {isResendActive ? 'Resend' : `Resend - ${formatTime(timer)}`}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Verify Button - Bottom */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
              <ThemedText style={styles.verifyButtonText} weight="medium">Verify</ThemedText>
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
  tagline: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
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
    marginBottom: 8,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#1a1a1a',
    marginRight: 8,
  },
  resendContainer: {
    marginBottom: 24,
    marginTop: 24, 
    alignItems: 'center',
  },
  resendQuestion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  resendText: {
    fontSize: 14,
    color: '#999',
  },
  resendActive: {
    color: '#5856D6',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    fontSize: 20,
    color: '#1a1a1a',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#5856D6',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
