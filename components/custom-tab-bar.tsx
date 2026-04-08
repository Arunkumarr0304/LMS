import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './themed-text';

import HomeIcon from '../assets/images/home.svg';
import ExploreIcon from '../assets/images/explore.svg';
import LearningIcon from '../assets/images/learning.svg';
import WishlistIcon from '../assets/images/wishlist.svg';
import ProfileIcon from '../assets/images/profile.svg';

import ActiveHomeIcon from '../assets/images/active_home.svg';
import ActiveExploreIcon from '../assets/images/active_explore.svg';
import ActiveLearningIcon from '../assets/images/active_learning.svg';
import ActiveWishlistIcon from '../assets/images/active_wishlist.svg';
import ActiveProfileIcon from '../assets/images/active_profile.svg';

const tabs = [
  { name: 'index', label: 'Home', Icon: HomeIcon, ActiveIcon: ActiveHomeIcon, path: '/' },
  { name: 'explore', label: 'Explore', Icon: ExploreIcon, ActiveIcon: ActiveExploreIcon, path: '/explore' },
  { name: 'learning', label: 'Learning', Icon: LearningIcon, ActiveIcon: ActiveLearningIcon, path: '/learning' },
  { name: 'wishlist', label: 'Wishlist', Icon: WishlistIcon, ActiveIcon: ActiveWishlistIcon, path: '/wishlist' },
  { name: 'profile', label: 'Profile', Icon: ProfileIcon, ActiveIcon: ActiveProfileIcon, path: '/profile' },
];

export function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          const IconComponent = active && tab.ActiveIcon ? tab.ActiveIcon : tab.Icon;
          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tab, active && styles.activeTab]}
              onPress={() => router.push(tab.path as any)}
              activeOpacity={0.7}
            >
              <IconComponent
                width={24}
                height={24}
              />
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
    paddingTop: 6,
    paddingBottom: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 11,
    color: '#999',
    marginTop: 3,
  },
  activeLabel: {
    color: '#5856D6',
  },
});
