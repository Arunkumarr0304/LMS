import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import BackIcon from '../assets/images/back.svg';
import PaymentIconBlue from '../assets/images/payment-icon-blue.svg';
import CardsIcon from '../assets/images/cards-icon.svg';
import VisaIcon from '../assets/images/visa-icon.svg';
import DropdownIcon from '../assets/images/dropdown-icon.svg';
import NetBankingIcon from '../assets/images/net-banking.svg';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    courseId: string;
    courseTitle: string;
    price: string;
  }>();

  const [isCardDropdownOpen, setIsCardDropdownOpen] = useState(true);
  const [isNetBankingDropdownOpen, setIsNetBankingDropdownOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const {
    courseId = '1',
    courseTitle = 'Course',
    price = '39',
  } = params;

  const orderAmount = parseFloat(price) || 39;
  const taxRate = 0.18;
  const discountRate = 0.10;

  const tax = orderAmount * taxRate;
  const discount = (orderAmount + tax) * discountRate;
  const total = orderAmount + tax - discount;

  const handleBackPress = () => {
    router.back();
  };

  const handleConfirmCheckout = () => {
    router.push('/payment-success');
  };

  const handleAddCard = () => {
    
  };

  const handleApplyPromo = () => {
  
  };

  const toggleCardDropdown = () => {
    setIsCardDropdownOpen(!isCardDropdownOpen);
  };

  const toggleNetBankingDropdown = () => {
    setIsNetBankingDropdownOpen(!isNetBankingDropdownOpen);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle} weight="semiBold">
          Payment
        </ThemedText>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Select Payment Method Label */}
        <ThemedText style={styles.sectionLabel} weight="regular">
          Select payment method
        </ThemedText>

        {/* Select Card */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionLabel} weight="regular">
            Select Card
          </ThemedText>
          <View style={styles.cardsRow}>
            <View style={[styles.cardIcon, styles.cardIconSelected]}>
              <CardsIcon width={32} height={32} />
            </View>
            <View style={styles.cardIcon}>
              <VisaIcon width={32} height={32} />
            </View>
            <TouchableOpacity style={styles.addCardButton} onPress={handleAddCard}>
              <ThemedText style={styles.addCardText} weight="medium">
                + Add Cards
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Credit Card Image */}
        <View style={styles.section}>
          <Image
            source={require('../assets/images/credit-card.png')}
            style={styles.creditCardImage}
            resizeMode="contain"
          />
        </View>

        {/* Credit or Debit Card Dropdown */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.dropdown} onPress={toggleCardDropdown} activeOpacity={0.8}>
            <View style={styles.dropdownContent}>
              <PaymentIconBlue width={20} height={20} />
              <ThemedText style={styles.dropdownText} weight="medium">
                Credit or Debit Card
              </ThemedText>
            </View>
            <DropdownIcon 
              width={16} 
              height={16} 
              style={{ 
                transform: [{ rotate: isCardDropdownOpen ? '90deg' : '0deg' }] 
              }}
            />
          </TouchableOpacity>

          {/* Dropdown Content - Card Form Fields */}
          {isCardDropdownOpen && (
            <View style={styles.dropdownContentContainer}>
              {/* Cardholder's Name */}
              <View style={styles.inputSection}>
                <ThemedText style={styles.inputLabel} weight="regular">
                  Cardholder's name
                </ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="**********"
                  placeholderTextColor="#9CA3AF"
                  value={cardholderName}
                  onChangeText={setCardholderName}
                />
              </View>

              {/* Credit Card Number */}
              <View style={styles.inputSection}>
                <ThemedText style={styles.inputLabel} weight="regular">
                  Credit card number
                </ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="**** **** **** 0123"
                  placeholderTextColor="#9CA3AF"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                />
              </View>

              {/* Expiration Date and CVV */}
              <View style={styles.rowInputs}>
                <View style={[styles.inputSection, styles.halfInput]}>
                  <ThemedText style={styles.inputLabel} weight="regular">
                    Expiration date
                  </ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="mm/yy"
                    placeholderTextColor="#9CA3AF"
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    keyboardType="numeric"
                  />
                </View>
                <View style={[styles.inputSection, styles.halfInput]}>
                  <ThemedText style={styles.inputLabel} weight="regular">
                    CVV
                  </ThemedText>
                  <TextInput
                    style={styles.input}
                    placeholder="000"
                    placeholderTextColor="#9CA3AF"
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={3}
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Promo Code */}
        <View style={styles.section}>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Promo Code"
              placeholderTextColor="#9CA3AF"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyPromo}>
              <ThemedText style={styles.applyButtonText} weight="semiBold">
                Apply
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel} weight="regular">
              Order
            </ThemedText>
            <ThemedText style={styles.summaryValue} weight="regular">
              ${orderAmount.toFixed(1)}
            </ThemedText>
          </View>
          <View style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel} weight="regular">
              Tax
            </ThemedText>
            <ThemedText style={styles.summaryValue} weight="regular">
              {Math.round(taxRate * 100)}%
            </ThemedText>
          </View>
          <View style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel} weight="regular">
              Discount
            </ThemedText>
            <ThemedText style={styles.summaryValue} weight="regular">
              {Math.round(discountRate * 100)}%
            </ThemedText>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel} weight="regular">
              Total
            </ThemedText>
            <ThemedText style={styles.summaryValue} weight="regular">
              ${total.toFixed(1)}
            </ThemedText>
          </View>
        </View>

        {/* Net Banking Option */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.dropdown} onPress={toggleNetBankingDropdown} activeOpacity={0.8}>
            <View style={styles.dropdownContent}>
              <NetBankingIcon width={20} height={20} />
              <ThemedText style={styles.dropdownText} weight="medium">
                Net Banking
              </ThemedText>
            </View>
            <DropdownIcon 
              width={16} 
              height={16} 
              style={{ 
                transform: [{ rotate: isNetBankingDropdownOpen ? '90deg' : '0deg' }] 
              }}
            />
          </TouchableOpacity>

          {/* Dropdown Content - Net Banking Options */}
          {isNetBankingDropdownOpen && (
            <View style={styles.dropdownContentContainer}>
              {/* Select Bank Label */}
              <View style={styles.inputSection}>
                <ThemedText style={styles.inputLabel} weight="regular">
                  Select your bank
                </ThemedText>
              </View>

              {/* Bank Options Grid */}
              <View style={styles.bankGrid}>
                <TouchableOpacity style={styles.bankCard}>
                  <ThemedText style={styles.bankCardText} weight="medium">
                    HDFC Bank
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bankCard}>
                  <ThemedText style={styles.bankCardText} weight="medium">
                    ICICI Bank
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bankCard}>
                  <ThemedText style={styles.bankCardText} weight="medium">
                    SBI Bank
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bankCard}>
                  <ThemedText style={styles.bankCardText} weight="medium">
                    Axis Bank
                  </ThemedText>
                </TouchableOpacity>
              </View>

              {/* Other Banks */}
              <View style={styles.inputSection}>
                <ThemedText style={styles.inputLabel} weight="regular">
                  Other banks
                </ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Search for your bank"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          )}
        </View>

        {/* Bottom Total */}
        <View style={styles.bottomTotalRow}>
          <ThemedText style={styles.bottomTotalLabel} weight="semiBold">
            Total
          </ThemedText>
          <ThemedText style={styles.bottomTotalValue} weight="semiBold">
            $ {total.toFixed(1)}
          </ThemedText>
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Fixed Footer */}
      <SafeAreaView style={styles.footer} edges={['bottom']}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCheckout}>
          <ThemedText style={styles.confirmButtonText} weight="semiBold">
            Confirm Checkout
          </ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    color: '#111827',
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  cardsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardIconSelected: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  addCardButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  addCardText: {
    fontSize: 13,
    color: '#374151',
  },
  creditCardImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#374151',
  },
  dropdownContentContainer: {
    marginTop: 16,
    paddingTop: 4,
  },
  inputSection: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 14,
    color: '#374151',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 0,
  },
  halfInput: {
    flex: 1,
    marginBottom: 0,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 25,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
  },
  promoInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    paddingVertical: 8,
  },
  applyButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  applyButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  summarySection: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#374151',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginVertical: 8,
  },
  bankGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  bankCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  bankCardText: {
    fontSize: 14,
    color: '#374151',
  },
  bottomTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bottomTotalLabel: {
    fontSize: 16,
    color: '#111827',
  },
  bottomTotalValue: {
    fontSize: 18,
    color: '#111827',
  },
  bottomPadding: {
    height: 140,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  confirmButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
