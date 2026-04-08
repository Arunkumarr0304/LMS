import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import BackIcon from '../../assets/images/back.svg';
import EditIcon from '../../assets/images/edit-icon.svg';
import MyCourseIcon from '../../assets/images/my-course.svg';
import CertificateIcon from '../../assets/images/certificate.svg';
import PaymentIcon from '../../assets/images/payment.svg';
import HelpIcon from '../../assets/images/help.svg';
import SettingsIcon from '../../assets/images/settings.svg';
import LogoutIcon from '../../assets/images/logout.svg';

const stats = [
  { value: '12', label: 'Courses', color: '#4F46E5' },
  { value: '5', label: 'Certificates', color: '#22C55E' },
  { value: '48h', label: 'Learning', color: '#F59E0B' },
];

  const menuItems = [
  { id: '1', label: 'My Courses', icon: MyCourseIcon, route: '/my-courses' },
  { id: '2', label: 'Certificates', icon: CertificateIcon, route: '/certificates' },
  { id: '3', label: 'Payment History', icon: PaymentIcon, route: '/payment-history' },
  { id: '4', label: 'Help Center', icon: HelpIcon, route: '/help-center' },
  { id: '5', label: 'Settings', icon: SettingsIcon, route: '/settings' },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  const handleMenuPress = (route: string | null) => {
    if (route) {
      router.push(route as any);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <BackIcon width={20} height={20} />
      </TouchableOpacity>
      <ThemedText style={styles.title} weight="bold">
        Profile
      </ThemedText>
      <View style={styles.placeholder} />
    </View>
  );

  const renderProfileCard = () => (
    <View style={styles.profileCard}>
      <Image
        source={require('../../assets/images/profile-image.png')}
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <ThemedText style={styles.profileName} weight="bold">
          Martin James
        </ThemedText>
        <ThemedText style={styles.profileEmail} weight="regular">
          martinjames12@outlook.com
        </ThemedText>
        <ThemedText style={styles.profileId} weight="regular">
          ID: 1234567890
        </ThemedText>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <EditIcon width={20} height={20} />
      </TouchableOpacity>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      {stats.map((stat, index) => (
        <View
          key={stat.label}
          style={[
            styles.statItem,
            index !== stats.length - 1 && styles.statItemBorder,
          ]}
        >
          <ThemedText style={[styles.statValue, { color: stat.color }]} weight="semiBold">
            {stat.value}
          </ThemedText>
          <ThemedText style={styles.statLabel} weight="regular">
            {stat.label}
          </ThemedText>
        </View>
      ))}
    </View>
  );

  const renderMenuItem = (item: typeof menuItems[0], index: number) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.menuItem,
          index === menuItems.length - 1 && styles.lastMenuItem,
        ]}
        onPress={() => handleMenuPress(item.route)}
      >
        <View style={styles.menuItemLeft}>
          <IconComponent width={20} height={20} />
          <ThemedText style={styles.menuItemText} weight="regular">
            {item.label}
          </ThemedText>
        </View>
        <ThemedText style={styles.arrow} weight="regular">›</ThemedText>
      </TouchableOpacity>
    );
  };

  const renderMenu = () => (
    <View style={styles.menuContainer}>
      {menuItems.map((item, index) => renderMenuItem(item, index))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderProfileCard()}
        {renderStats()}
        {renderMenu()}
        
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogoutIcon width={20} height={20} />
          <ThemedText style={styles.logoutText} weight="semiBold">
            Logout
          </ThemedText>
        </TouchableOpacity>
        
        <ThemedText style={styles.version} weight="regular">
          Version 1.0.0
        </ThemedText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 20,
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
  // Profile Card
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4F46E5',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  profileId: {
    fontSize: 12,
    color: '#6B7280',
  },
  editButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statItemBorder: {
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 20,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  // Menu
  menuContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: '#111827',
  },
  arrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 14,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
  },
  // Version
  version: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
