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
import NotificationIcon4 from '../assets/images/notification-icon4.svg';
import NotificationIcon5 from '../assets/images/notification-icon5.svg';
import NotificationIcon6 from '../assets/images/notification-icon6.svg';
import NotificationIcon7 from '../assets/images/notification-icon7.svg';

const notifications = [
  {
    id: '1',
    title: 'New lesson available',
    description: 'Module 3 of UI/UX Design has been unlocked',
    time: 'Mar 5, 2025',
    icon: NotificationIcon4,
    isRead: false,
  },
  {
    id: '2',
    title: 'Instructor replied',
    description: 'Sarah Johnson replied to your question',
    time: '1 hour ago',
    icon: NotificationIcon5,
    isRead: false,
  },
  {
    id: '3',
    title: 'Flash Sale!',
    description: 'Get 50% off on all programming courses',
    time: '3 hours ago',
    icon: NotificationIcon6,
    isRead: false,
  },
  {
    id: '4',
    title: 'Quiz reminder',
    description: 'Module 1 quiz is due tomorrow',
    time: 'Yesterday',
    icon: NotificationIcon7,
    isRead: false,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const renderNotificationCard = (notification: typeof notifications[0]) => {
    const IconComponent = notification.icon;
    return (
      <View key={notification.id} style={styles.notificationCard}>
        <View style={styles.iconContainer}>
          <IconComponent width={24} height={24} />
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.titleRow}>
            <ThemedText style={styles.notificationTitle} weight="semiBold">
              {notification.title}
            </ThemedText>
            {!notification.isRead && <View style={styles.unreadDot} />}
          </View>
          <ThemedText style={styles.notificationDescription} weight="regular">
            {notification.description}
          </ThemedText>
          <ThemedText style={styles.notificationTime} weight="regular">
            {notification.time}
          </ThemedText>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle} weight="semiBold">
          Notifications
        </ThemedText>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section Title */}
        <ThemedText style={styles.sectionTitle} weight="medium">
          Transaction History
        </ThemedText>

        {/* Notifications List */}
        <View style={styles.notificationsList}>
          {notifications.map(renderNotificationCard)}
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#111827',
  },
  headerRight: {
    width: 44,
  },
  // Section Title
  sectionTitle: {
    fontSize: 14,
    color: '#4D4D4D',
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  // Notifications List
  notificationsList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4F46E5',
    marginLeft: 8,
  },
  notificationDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
