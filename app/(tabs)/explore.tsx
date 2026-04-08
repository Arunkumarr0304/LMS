import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import BackIcon from '../../assets/images/back.svg';
import SearchIcon from '../../assets/images/search.svg';
import FilterIcon from '../../assets/images/filter-icon.svg';
import StarIcon from '../../assets/images/star.svg';
import SavedIcon from '../../assets/images/saved.svg';
import UnsavedIcon from '../../assets/images/unsaved.svg';
import SeeArrowIcon from '../../assets/images/see-arrow.svg';

const categories = ['All', 'Design', 'Programming', 'Marketing'];

const recentSearchCourses = [
  {
    id: '1',
    title: 'Advanced Python Programming',
    instructor: 'David Miller',
    rating: 4.9,
    duration: '15h 00m',
    students: 18500,
    price: 49.99,
    image: require('../../assets/images/popular-course5.png'),
    isSaved: false,
  },
  {
    id: '2',
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
    title: 'Complete UI/UX Design Course',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    duration: '12h 30m',
    students: 15420,
    price: 49.99,
    image: require('../../assets/images/popular-course1.png'),
    isSaved: false,
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [courses, setCourses] = useState(recentSearchCourses);

  const toggleSaveCourse = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId ? { ...course, isSaved: !course.isSaved } : course
    ));
  };

  const handleCoursePress = (course: typeof recentSearchCourses[0]) => {
    router.push(`/course-details?id=${course.id}&title=${encodeURIComponent(course.title)}&instructor=${encodeURIComponent(course.instructor)}&rating=${course.rating}&students=${course.students}&duration=${encodeURIComponent(course.duration)}&price=${course.price}` as any);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <BackIcon width={20} height={20} />
      </TouchableOpacity>
      <ThemedText style={styles.title} weight="bold">
        Explore Courses
      </ThemedText>
      <View style={styles.placeholder} />
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <SearchIcon width={20} height={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#9CA3AF"
        />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <FilterIcon width={19} height={17} />
      </TouchableOpacity>
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

  const renderRecentSearch = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle} weight="semiBold">Recent Search</ThemedText>
      </View>
      <View style={styles.coursesList}>
        {courses.map((course, index) => (
          <TouchableOpacity
            key={course.id}
            style={[
              styles.courseCard,
              index === recentSearchCourses.length - 1 && styles.lastCard,
            ]}
            onPress={() => handleCoursePress(course)}
            activeOpacity={0.8}
          >
            <Image source={course.image} style={styles.courseImage} />
            <View style={styles.courseContent}>
              <ThemedText style={styles.courseTitle} weight="semiBold" numberOfLines={1}>
                {course.title}
              </ThemedText>
              <ThemedText style={styles.courseInstructor} weight="regular">
                {course.instructor}
              </ThemedText>
              <View style={styles.ratingRow}>
                <StarIcon width={12} height={12} />
                <ThemedText style={styles.ratingText} weight="medium">
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
              <View style={styles.priceRow}>
                <ThemedText style={styles.price} weight="bold">
                  ${course.price}
                </ThemedText>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleSaveCourse(course.id);
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
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderSearchBar()}
        {renderCategories()}
        {renderRecentSearch()}
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
  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Manrope_400Regular',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  // Courses List
  coursesList: {
    paddingHorizontal: 20,
  },
  courseCard: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastCard: {
    borderBottomWidth: 0,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  courseContent: {
    flex: 1,
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  courseInstructor: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
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
