import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import BackIcon from '../assets/images/back.svg';
import SearchIcon from '../assets/images/search.svg';
import QuickLinkIcon1 from '../assets/images/quick-link-icon1.svg';
import QuickLinkIcon2 from '../assets/images/quick-link-icon2.svg';
import QuickLinkIcon3 from '../assets/images/quick-link-icon3.svg';
import QuickLinkIcon4 from '../assets/images/quick-link-icon4.svg';
import HeadphonesIcon from '../assets/images/headphones.svg';
import LiveChatIcon from '../assets/images/live-chat.svg';
import MailBlueIcon from '../assets/images/mail-blue.svg';
import AdditionalIcon1 from '../assets/images/additional-icon1.svg';
import AdditionalIcon2 from '../assets/images/additional-icon2.svg';
import AdditionalIcon3 from '../assets/images/additional-icon3.svg';

const quickLinks = [
  {
    id: '1',
    title: 'Getting Started',
    subtitle: 'Learn the Basics',
    icon: QuickLinkIcon1,
  },
  {
    id: '2',
    title: 'Account Settings',
    subtitle: 'Manage your account',
    icon: QuickLinkIcon2,
  },
  {
    id: '3',
    title: 'Payments & Refunds',
    subtitle: 'Billing information',
    icon: QuickLinkIcon3,
  },
  {
    id: '4',
    title: 'Technical Support',
    subtitle: 'Troubleshooting help',
    icon: QuickLinkIcon4,
  },
];

const faqs = [
  'How do i enroll in a course?',
  'Can i download lessons for offline Vie...',
  'How do i track my progress?',
  'How do i get a certificate?',
  'Can i get a refund?',
  'How do i contact an instructor?',
];

const additionalResources = [
  {
    id: '1',
    title: 'User Guide',
    subtitle: 'Complete guide to using learner',
    icon: AdditionalIcon1,
  },
  {
    id: '2',
    title: 'Video Tutorials',
    subtitle: 'Learn through video guides',
    icon: AdditionalIcon2,
  },
  {
    id: '3',
    title: 'Community Forum',
    subtitle: 'Connect with other learners',
    icon: AdditionalIcon3,
  },
];

export default function HelpCenterScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleBack = () => {
    router.back();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <BackIcon width={20} height={20} />
      </TouchableOpacity>
      <ThemedText style={styles.title} weight="bold">
        Help Center
      </ThemedText>
      <View style={styles.placeholder} />
    </View>
  );

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <ThemedText style={styles.heroTitle} weight="bold">
        How can we help you?
      </ThemedText>
      <ThemedText style={styles.heroSubtitle} weight="regular">
        Search for answers or browse topics below
      </ThemedText>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchIcon width={20} height={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for Help..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );

  const renderQuickLinks = () => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle} weight="semiBold">
        Quick Links
      </ThemedText>
      <View style={styles.quickLinksGrid}>
        {quickLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <TouchableOpacity key={link.id} style={styles.quickLinkCard}>
              <IconComponent width={32} height={32} />
              <ThemedText style={styles.quickLinkTitle} weight="semiBold">
                {link.title}
              </ThemedText>
              <ThemedText style={styles.quickLinkSubtitle} weight="regular">
                {link.subtitle}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderFAQs = () => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle} weight="semiBold">
        Frequently Asked Questions
      </ThemedText>
      <View style={styles.faqList}>
        {faqs.map((faq, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqItem}
            onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
          >
            <ThemedText style={styles.faqText} weight="regular">
              {faq}
            </ThemedText>
            <ThemedText style={styles.faqArrow} weight="regular">
              {expandedFaq === index ? '⌄' : '›'}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderContactSupport = () => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle} weight="semiBold">
        Still need help?
      </ThemedText>
      <View style={styles.contactCard}>
        <HeadphonesIcon width={40} height={40} />
        <ThemedText style={styles.contactTitle} weight="semiBold">
          Contact Support
        </ThemedText>
        <ThemedText style={styles.contactSubtitle} weight="regular">
          Our support team is available 24/7 to assist you
        </ThemedText>
        
        <View style={styles.contactButtons}>
          <TouchableOpacity style={styles.liveChatButton}>
            <LiveChatIcon width={18} height={18} />
            <ThemedText style={styles.liveChatText} weight="semiBold">
              Live Chat
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emailButton}>
            <MailBlueIcon width={18} height={18} />
            <ThemedText style={styles.emailText} weight="semiBold">
              Email Us
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderAdditionalResources = () => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle} weight="semiBold">
        Additional Resources
      </ThemedText>
      <View style={styles.resourcesList}>
        {additionalResources.map((resource) => {
          const IconComponent = resource.icon;
          return (
            <TouchableOpacity key={resource.id} style={styles.resourceItem}>
              <View style={styles.resourceLeft}>
                <IconComponent width={20} height={20} />
                <View style={styles.resourceTextContainer}>
                  <ThemedText style={styles.resourceTitle} weight="regular">
                    {resource.title}
                  </ThemedText>
                  <ThemedText style={styles.resourceSubtitle} weight="regular">
                    {resource.subtitle}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.arrow} weight="regular">›</ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
        {renderHeroSection()}
        {renderQuickLinks()}
        {renderFAQs()}
        {renderContactSupport()}
        {renderAdditionalResources()}
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
    backgroundColor: '#FFFFFF',
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
  // Hero Section
  heroSection: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Manrope_400Regular',
  },
  // Section
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  // Quick Links
  quickLinksGrid: {
    gap: 12,
  },
  quickLinkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    alignItems: 'center',
  },
  quickLinkTitle: {
    fontSize: 14,
    color: '#111827',
    marginTop: 8,
    marginBottom: 2,
  },
  quickLinkSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  // FAQs
  faqList: {
    gap: 8,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  faqText: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  faqArrow: {
    fontSize: 20,
    color: '#4F46E5',
  },
  // Contact Support
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 24,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 16,
    color: '#111827',
    marginTop: 12,
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  liveChatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 8,
  },
  liveChatText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  emailButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  emailText: {
    fontSize: 14,
    color: '#4F46E5',
  },
  // Additional Resources
  resourcesList: {
    gap: 12,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  resourceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resourceTextContainer: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  resourceSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  arrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
});
