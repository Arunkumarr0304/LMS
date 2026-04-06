import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import BackIcon from '../assets/images/back.svg';
import WalletIcon from '../assets/images/wallet-icon.svg';
import PaymentIconBlue from '../assets/images/payment-icon-blue.svg';
import PaymentIconGrey from '../assets/images/payment-icon-grey.svg';
import CalendarIcon from '../assets/images/calendar.svg';
import ReceiptIcon from '../assets/images/receipt-icon.svg';

const transactions = [
  {
    id: '1',
    courseName: 'React Native - Build Mobile Apps',
    transactionId: 'TXN-2026-03-001',
    date: 'Mar 5, 2025',
    paymentMethod: 'Credit Card',
    amount: 59.99,
    status: 'Completed',
  },
  {
    id: '2',
    courseName: 'Complete UI/UX Design Course',
    transactionId: 'TXN-2026-02-002',
    date: 'Mar 5, 2025',
    paymentMethod: 'Credit Card',
    amount: 49.99,
    status: 'Completed',
  },
  {
    id: '3',
    courseName: 'Digital Marketing Masterclass',
    transactionId: 'TXN-2026-01-003',
    date: 'Mar 5, 2025',
    paymentMethod: 'Credit Card',
    amount: 39.99,
    status: 'Completed',
  },
];

export default function PaymentHistoryScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <BackIcon width={20} height={20} />
      </TouchableOpacity>
      <ThemedText style={styles.title} weight="bold">
        Payment History
      </ThemedText>
      <View style={styles.placeholder} />
    </View>
  );

  const renderStatsCard = () => (
    <View style={styles.statsCard}>
      {/* Total Spent */}
      <View style={styles.totalSpentRow}>
        <WalletIcon width={32} height={32} />
        <View style={styles.totalSpentTextContainer}>
          <ThemedText style={styles.totalSpentLabel} weight="regular">
            Total Spent
          </ThemedText>
          <ThemedText style={styles.totalSpentAmount} weight="bold">
            $149.97
          </ThemedText>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statNumber} weight="bold">4</ThemedText>
          <ThemedText style={styles.statLabel} weight="regular">Transactions</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statNumber} weight="bold">3</ThemedText>
          <ThemedText style={styles.statLabel} weight="regular">Completed</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statNumber} weight="bold">1</ThemedText>
          <ThemedText style={styles.statLabel} weight="regular">Refunded</ThemedText>
        </View>
      </View>
    </View>
  );

  const renderTransactionCard = (transaction: typeof transactions[0]) => (
    <View key={transaction.id} style={styles.transactionCard}>
      {/* Header Row */}
      <View style={styles.transactionHeader}>
        <View style={styles.courseInfo}>
          <PaymentIconBlue width={40} height={40} />
          <View style={styles.courseTextContainer}>
            <ThemedText style={styles.courseName} weight="semiBold" numberOfLines={1}>
              {transaction.courseName}
            </ThemedText>
            <ThemedText style={styles.transactionId} weight="regular">
              {transaction.transactionId}
            </ThemedText>
          </View>
        </View>
        <ThemedText style={styles.amount} weight="bold">
          ${transaction.amount}
        </ThemedText>
      </View>

      {/* Meta Row */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <CalendarIcon width={14} height={14} />
          <ThemedText style={styles.metaText} weight="regular">
            {transaction.date}
          </ThemedText>
        </View>
        <View style={styles.metaItem}>
          <PaymentIconGrey width={14} height={14} />
          <ThemedText style={styles.metaText} weight="regular">
            {transaction.paymentMethod}
          </ThemedText>
        </View>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <ThemedText style={styles.statusText} weight="medium">
            {transaction.status}
          </ThemedText>
        </View>
      </View>

      {/* Download Receipt Button */}
      <TouchableOpacity style={styles.receiptButton}>
        <ReceiptIcon width={18} height={18} />
        <ThemedText style={styles.receiptButtonText} weight="semiBold">
          Download Receipt
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
        {renderStatsCard()}
        
        {/* Transaction History Section */}
        <View style={styles.transactionHistorySection}>
          <ThemedText style={styles.sectionTitle} weight="semiBold">
            Transaction History
          </ThemedText>
          <View style={styles.transactionsList}>
            {transactions.map(renderTransactionCard)}
          </View>
        </View>
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
    paddingBottom: 24,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#111827',
  },
  placeholder: {
    width: 44,
  },
  // Stats Card
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  totalSpentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  totalSpentTextContainer: {
    flex: 1,
  },
  totalSpentLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  totalSpentAmount: {
    fontSize: 24,
    color: '#4F46E5',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  // Transaction History Section
  transactionHistorySection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  courseTextContainer: {
    flex: 1,
  },
  courseName: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  transactionId: {
    fontSize: 12,
    color: '#6B7280',
  },
  amount: {
    fontSize: 16,
    color: '#4F46E5',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  statusText: {
    fontSize: 10,
    color: '#166534',
  },
  receiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EDE9FE',
    paddingVertical: 12,
    borderRadius: 8,
  },
  receiptButtonText: {
    fontSize: 14,
    color: '#4F46E5',
  },
});
