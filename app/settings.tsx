import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import AccountIcon1 from '../assets/images/account-icon1.svg';
import AccountIcon2 from '../assets/images/account-icon2.svg';
import NotificationIcon from '../assets/images/notification.svg';
import NotificationIcon2 from '../assets/images/notification-icon2.svg';
import NotificationIcon3 from '../assets/images/notification-icon3.svg';
import PreferenceIcon1 from '../assets/images/preference-icon1.svg';
import PreferenceIcon2 from '../assets/images/preference-icon2.svg';
import DownloadIcon1 from '../assets/images/download-icon1.svg';
import DownloadIcon2 from '../assets/images/download-icon2.svg';
import OtherIcon1 from '../assets/images/other-icon1.svg';
import OtherIcon2 from '../assets/images/other-icon2.svg';
import OtherIcon3 from '../assets/images/other-icon3.svg';

export default function SettingsScreen() {
  // Notification toggles
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);

  // Preferences toggles
  const [darkMode, setDarkMode] = useState(false);

  // Download settings toggles
  const [autoDownload, setAutoDownload] = useState(false);
  const [wifiOnly, setWifiOnly] = useState(false);

  const renderSectionTitle = (title: string) => (
    <ThemedText style={styles.sectionTitle} weight="semiBold">
      {title}
    </ThemedText>
  );

  const renderLinkItem = (
    icon: React.FC<{ width: number; height: number }>,
    title: string,
    subtitle: string,
    onPress?: () => void
  ) => {
    const IconComponent = icon;
    return (
      <TouchableOpacity style={styles.linkItem} onPress={onPress}>
        <View style={styles.itemLeft}>
          <IconComponent width={20} height={20} />
          <View style={styles.itemTextContainer}>
            <ThemedText style={[styles.itemTitle, !subtitle && styles.itemTitleNoMargin]} weight="regular">
              {title}
            </ThemedText>
            {subtitle ? (
              <ThemedText style={styles.itemSubtitle} weight="regular">
                {subtitle}
              </ThemedText>
            ) : null}
          </View>
        </View>
        <ThemedText style={styles.arrow} weight="regular">›</ThemedText>
      </TouchableOpacity>
    );
  };

  const renderToggleItem = (
    icon: React.FC<{ width: number; height: number }>,
    title: string,
    subtitle: string,
    value: boolean,
    onValueChange: (value: boolean) => void
  ) => {
    const IconComponent = icon;
    return (
      <View style={styles.toggleItem}>
        <View style={styles.itemLeft}>
          <IconComponent width={20} height={20} />
          <View style={styles.itemTextContainer}>
            <ThemedText style={styles.itemTitle} weight="regular">
              {title}
            </ThemedText>
            <ThemedText style={styles.itemSubtitle} weight="regular">
              {subtitle}
            </ThemedText>
          </View>
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#E5E7EB"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Account Section */}
        <View style={styles.section}>
          {renderSectionTitle('Account')}
          <View style={styles.card}>
            {renderLinkItem(AccountIcon1, 'Edit Profile', 'johnsmith@gmail.com')}
            <View style={styles.divider} />
            {renderLinkItem(AccountIcon2, 'Change Password', 'Update your Password')}
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          {renderSectionTitle('Notifications')}
          <View style={styles.card}>
            {renderToggleItem(
              NotificationIcon,
              'Push Notifications',
              'Receive push notifications',
              pushNotifications,
              setPushNotifications
            )}
            <View style={styles.divider} />
            {renderToggleItem(
              NotificationIcon2,
              'Email Notifications',
              'Receive email updates',
              emailNotifications,
              setEmailNotifications
            )}
            <View style={styles.divider} />
            {renderToggleItem(
              NotificationIcon3,
              'Course Updates',
              'New lessons and announcements',
              courseUpdates,
              setCourseUpdates
            )}
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          {renderSectionTitle('Preferences')}
          <View style={styles.card}>
            {renderToggleItem(
              PreferenceIcon1,
              'Dark Mode',
              'Enable dark theme',
              darkMode,
              setDarkMode
            )}
            <View style={styles.divider} />
            {renderLinkItem(PreferenceIcon2, 'Language', 'English')}
          </View>
        </View>

        {/* Download Settings Section */}
        <View style={styles.section}>
          {renderSectionTitle('Download Settings')}
          <View style={styles.card}>
            {renderToggleItem(
              DownloadIcon1,
              'Auto Download',
              'Download new lessons automatically',
              autoDownload,
              setAutoDownload
            )}
            <View style={styles.divider} />
            {renderToggleItem(
              DownloadIcon2,
              'Download on WiFi Only',
              'Save mobile data',
              wifiOnly,
              setWifiOnly
            )}
          </View>
        </View>

        {/* Other Section */}
        <View style={styles.section}>
          {renderSectionTitle('Other')}
          <View style={styles.card}>
            {renderLinkItem(OtherIcon1, 'Privacy Policy', '')}
            <View style={styles.divider} />
            {renderLinkItem(OtherIcon2, 'Terms of Service', '')}
            <View style={styles.divider} />
            {renderLinkItem(OtherIcon3, 'Clear Cache', '')}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText} weight="regular">
            Learner v1.0.0
          </ThemedText>
          <ThemedText style={styles.footerCopyright} weight="regular">
            © 2025 Learner. All rights reserved.
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  // Section
  section: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  // Link Item
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  // Toggle Item
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  // Common Item Styles
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 0,
  },
  itemTitleNoMargin: {
    marginBottom: 0,
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 48,
  },
  // Footer
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
  },
  footerCopyright: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
