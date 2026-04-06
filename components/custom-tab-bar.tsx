import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { ThemedText } from './themed-text';

import HomeIcon from '../assets/images/home.svg';
import ExploreIcon from '../assets/images/explore.svg';
import LearningIcon from '../assets/images/learning.svg';
import WishlistIcon from '../assets/images/wishlist.svg';
import ProfileIcon from '../assets/images/profile.svg';

const tabs = [
  { name: 'index', label: 'Home', Icon: HomeIcon, path: '/' },
  { name: 'explore', label: 'Explore', Icon: ExploreIcon, path: '/explore' },
  { name: 'learning', label: 'Learning', Icon: LearningIcon, path: '/learning' },
  { name: 'wishlist', label: 'Wishlist', Icon: WishlistIcon, path: '/wishlist' },
  { name: 'profile', label: 'Profile', Icon: ProfileIcon, path: '/profile' },
];

export function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Exact match for home (/) or exact match for other paths
    return pathname === path;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tab, active && styles.activeTab]}
              onPress={() => router.push(tab.path as any)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
                <tab.Icon
                  width={22}
                  height={22}
                  fill={active ? '#5856D6' : '#999999'}
                />
              </View>
              <ThemedText
                style={[styles.label, active && styles.activeLabel]}
                weight={active ? 'semiBold' : 'regular'}
              >
                {tab.label}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingBottom: 44, // Extra padding for safe area
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#F5F5FF', // Light purple background for active
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
  },
  activeIconContainer: {
    opacity: 1,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeLabel: {
    color: '#5856D6', // Purple color for active
  },
});
