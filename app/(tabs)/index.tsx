import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import SearchIcon from '../../assets/images/search.svg';
import NotificationIcon from '../../assets/images/notification.svg';
import StarIcon from '../../assets/images/star.svg';
import SavedIcon from '../../assets/images/saved.svg';
import UnsavedIcon from '../../assets/images/unsaved.svg';
import SeeArrowIcon from '../../assets/images/see-arrow.svg';

const categories = ['All', 'Design', 'Programming', 'Marketing'];

const continueLearningCourses = [
  {
    id: '1',
    title: 'Python for Data Science',
    instructor: 'Dr. Mike Ross',
    rating: 4.8,
    duration: '28h',
    progress: 65,
    image: require('../../assets/images/categories-img1.png'),
    isSaved: true,
  },
  {
    id: '2',
    title: 'React Native -',
    subtitle: 'John Doe',
    rating: 4.9,
    duration: '20h',
    progress: 45,
    image: require('../../assets/images/categories-img2.png'),
    isSaved: false,
  },
];

const popularCourses = [
  {
    id: '1',
    title: 'Complete UI/UX Design Course',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    duration: '12h 30m',
    students: 15420,
    price: 49.99,
    image: require('../../assets/images/popular-course1.png'),
    isSaved: true,
  },
  {
    id: '2',
    title: 'React Native - Build Mobile Apps',
    instructor: 'John Doe',
    rating: 4.9,
    duration: '18h 45m',
    students: 22300,
    price: 59.99,
    image: require('../../assets/images/popular-course2.png'),
    isSaved: false,
  },
  {
    id: '3',
    title: 'Digital Marketing Masterclass',
    instructor: 'Emily Chen',
    rating: 4.7,
    duration: '10h 20m',
    students: 18920,
    price: 39.99,
    image: require('../../assets/images/popular-course3.png'),
    isSaved: false,
  },
  {
    id: '4',
    title: 'Business Strategy Fundamentals',
    instructor: 'Michael Brown',
    rating: 4.6,
    duration: '8h 15m',
    students: 12500,
    price: 44.99,
    image: require('../../assets/images/popular-course4.png'),
    isSaved: false,
  },
  {
    id: '5',
    title: 'Advanced Python Programming',
    instructor: 'David Miller',
    rating: 4.9,
    duration: '15h 00m',
    students: 18500,
    price: 49.99,
    image: require('../../assets/images/popular-course5.png'),
    isSaved: false,
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push('/notifications');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <ThemedText style={styles.avatarText} weight="semiBold">JD</ThemedText>
        </View>
        <View>
          <ThemedText style={styles.greeting} weight="regular">Good morning</ThemedText>
          <ThemedText style={styles.userName} weight="bold">John Doe</ThemedText>
        </View>
      </View>
      <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
        <NotificationIcon width={24} height={24} />
        <View style={styles.notificationDot} />
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <SearchIcon width={20} height={20} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search courses, skills..."
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );

  const renderCategories = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle} weight="semiBold">Categories</ThemedText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <ThemedText
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
              weight={selectedCategory === category ? 'semiBold' : 'medium'}
            >
              {category}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const handleCoursePress = (course: typeof popularCourses[0]) => {
    router.push(`/course-details?id=${course.id}&title=${encodeURIComponent(course.title)}&instructor=${encodeURIComponent(course.instructor)}&rating=${course.rating}&students=${course.students}&duration=${encodeURIComponent(course.duration)}&price=${course.price}` as any);
  };

  const handleContinueLearningPress = (course: typeof continueLearningCourses[0]) => {
    router.push(`/course-details?id=${course.id}&title=${encodeURIComponent(course.title)}&instructor=${encodeURIComponent(course.instructor || 'Unknown')}&rating=${course.rating}&students=12000&duration=${encodeURIComponent(course.duration)}&price=49.99` as any);
  };

  const renderContinueLearning = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle} weight="semiBold">Continue Learning</ThemedText>
        <TouchableOpacity style={styles.seeAllButton}>
          <ThemedText style={styles.seeAllText} weight="medium">See all</ThemedText>
          <SeeArrowIcon width={12} height={7} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.continueLearningScroll}
      >
        {continueLearningCourses.map((course) => (
          <TouchableOpacity 
            key={course.id} 
            style={styles.continueCard}
            onPress={() => handleContinueLearningPress(course)}
            activeOpacity={0.8}
          >
            <View style={styles.continueImageContainer}>
              <Image source={course.image} style={styles.continueImage} />
              <TouchableOpacity style={styles.saveButton}>
                {course.isSaved ? (
                  <SavedIcon width={16} height={16} />
                ) : (
                  <UnsavedIcon width={16} height={16} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.continueContent}>
              <ThemedText style={styles.continueTitle} weight="semiBold" numberOfLines={1}>
                {course.title}
              </ThemedText>
              {course.subtitle && (
                <ThemedText style={styles.continueSubtitle} weight="regular">
                  {course.subtitle}
                </ThemedText>
              )}
              <ThemedText style={styles.continueInstructor} weight="regular">
                {course.instructor}
              </ThemedText>
              <View style={styles.ratingContainer}>
                <StarIcon width={12} height={12} />
                <ThemedText style={styles.ratingText} weight="medium">
                  {course.rating} · {course.duration}
                </ThemedText>
              </View>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
              </View>
              <ThemedText style={styles.progressText} weight="medium">
                {course.progress}%
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderPopularCourses = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle} weight="semiBold">Popular Courses</ThemedText>
        <TouchableOpacity style={styles.seeAllButton}>
          <ThemedText style={styles.seeAllText} weight="medium">See all</ThemedText>
          <SeeArrowIcon width={12} height={7} />
        </TouchableOpacity>
      </View>
      <View style={styles.popularList}>
        {popularCourses.map((course, index) => (
          <TouchableOpacity
            key={course.id}
            style={[
              styles.popularCard,
              index === popularCourses.length - 1 && styles.lastCard,
            ]}
            onPress={() => handleCoursePress(course)}
            activeOpacity={0.8}
          >
            <Image source={course.image} style={styles.popularImage} />
            <View style={styles.popularContent}>
              <ThemedText style={styles.popularTitle} weight="semiBold" numberOfLines={1}>
                {course.title}
              </ThemedText>
              <ThemedText style={styles.popularInstructor} weight="regular">
                {course.instructor}
              </ThemedText>
              <View style={styles.popularMeta}>
                <View style={styles.ratingRow}>
                  <StarIcon width={12} height={12} />
                  <ThemedText style={styles.popularRating} weight="medium">
                    {course.rating}
                  </ThemedText>
                  <ThemedText style={styles.metaDot} weight="regular">·</ThemedText>
                  <ThemedText style={styles.metaText} weight="regular">
                    {course.duration}
                  </ThemedText>
                  <ThemedText style={styles.metaDot} weight="regular">·</ThemedText>
                  <ThemedText style={styles.metaText} weight="regular">
                    {course.students.toLocaleString()} students
                  </ThemedText>
                </View>
              </View>
              <View style={styles.priceRow}>
                <ThemedText style={styles.price} weight="bold">
                  ${course.price}
                </ThemedText>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    // Handle save toggle
                  }}
                >
                  {course.isSaved ? (
                    <SavedIcon width={20} height={20} />
                  ) : (
                    <UnsavedIcon width={20} height={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
        {renderSearchBar()}
        {renderCategories()}
        {renderContinueLearning()}
        {renderPopularCourses()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 0,
  },
  scrollContent: {
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  greeting: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  userName: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 22,
  },
  notificationButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Manrope_400Regular',
  },
  // Sections
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111827',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#4F46E5',
  },
  arrow: {
    fontSize: 14,
    color: '#4F46E5',
  },
  // Categories
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  categoryChipActive: {
    backgroundColor: '#4F46E5',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  // Continue Learning
  continueLearningScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  continueCard: {
    width: 200,
    justifyContent: 'space-between',
  },
  continueImageContainer: {
    position: 'relative',
    width: 200,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  continueImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  saveButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueContent: {
    flex: 1,
  },
  continueTitle: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  continueSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  continueInstructor: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 'auto',
    paddingTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
  },
  // Popular Courses
  popularList: {
    paddingHorizontal: 20,
  },
  popularCard: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastCard: {
    borderBottomWidth: 0,
  },
  popularImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  popularContent: {
    flex: 1,
    justifyContent: 'center',
  },
  popularTitle: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  popularInstructor: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  popularMeta: {
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  popularRating: {
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 2,
  },
  metaDot: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    color: '#4F46E5',
  },
});
