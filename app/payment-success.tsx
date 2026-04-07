import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import GreenTickIcon from '../assets/images/green-tick.svg';

export default function PaymentSuccessScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <GreenTickIcon width={80} height={80} />
        </View>

        {/* Payment Successful Title */}
        <ThemedText style={styles.title} weight="semiBold">
          Payment Successful
        </ThemedText>

        {/* Description */}
        <ThemedText style={styles.description} weight="regular">
          Your payment has been completed successfully.
        </ThemedText>
        <ThemedText style={styles.subDescription} weight="regular">
          A confirmation has been sent to your email.
        </ThemedText>

        {/* Amount */}
        <ThemedText style={styles.amount} weight="bold">
          ₹1,499
        </ThemedText>
        <ThemedText style={styles.amountLabel} weight="regular">
          Paid Successfully
        </ThemedText>

        {/* Transaction Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel} weight="semiBold">
              Transaction ID:
            </ThemedText>
            <ThemedText style={styles.detailValue} weight="regular">
              TXN45872639
            </ThemedText>
          </View>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel} weight="semiBold">
              Date & Time:
            </ThemedText>
            <ThemedText style={styles.detailValue} weight="regular">
              06 Apr 2026, 11:45 AM
            </ThemedText>
          </View>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel} weight="semiBold">
              Payment Method:
            </ThemedText>
            <ThemedText style={styles.detailValue} weight="regular">
              UPI
            </ThemedText>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <ThemedText style={styles.continueButtonText} weight="semiBold">
            Continue
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  subDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  amount: {
    fontSize: 32,
    color: '#4F46E5',
    marginBottom: 4,
  },
  amountLabel: {
    fontSize: 14,
    color: '#4F46E5',
    marginBottom: 32,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 40,
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    width: 280,
  },
  detailLabel: {
    fontSize: 14,
    color: '#111827',
    width: 130,
  },
  detailValue: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
