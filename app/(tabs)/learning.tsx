import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import BackIcon from '../../assets/images/back.svg';
import SearchIcon from '../../assets/images/search.svg';
import FilterIcon from '../../assets/images/filter-icon.svg';
import StarIcon from '../../assets/images/star.svg';
import SavedIcon from '../../assets/images/saved.svg';
import SeeArrowIcon from '../../assets/images/see-arrow.svg';

const categories = ['All', 'Design', 'Programming', 'Marketing'];

const myLearningCourses = [
  {
    id: '1',
    title: 'Python for Data Science',
    instructor: 'Dr. Mike Ross',
    rating: 4.8,
    duration: '28h',
    image: require('../../assets/images/categories-img1.png'),
    isSaved: true,
    progress: 65,
    lessonsCompleted: 18,
    totalLessons: 28,
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    duration: '28h',
    image: require('../../assets/images/categories-img2.png'),
    isSaved: true,
    progress: 79,
    lessonsCompleted: 19,
    totalLessons: 24,
  },
  {
    id: '3',
    title: 'React & TypeScript Pro',
    instructor: 'Alex Chen',
    rating: 4.8,
    duration: '28h',
    image: require('../../assets/images/categories-img3.png'),
    isSaved: false,
    progress: 65,
    lessonsCompleted: 5,
    totalLessons: 32,
  },
  {
    id: '4',
    title: 'Machine Learning Fundamentals',
    instructor: 'Lisa Anderson',
    rating: 4.8,
    duration: '21,5h',
    image: require('../../assets/images/categories-img4.png'),
    isSaved: false,
    progress: 54,
    lessonsCompleted: 10,
    totalLessons: 24,
  },
];

export default function LearningScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCoursePress = (course: typeof myLearningCourses[0]) => {
    router.push(`/course-details?id=${course.id}&title=${encodeURIComponent(course.title)}&instructor=${encodeURIComponent(course.instructor)}&rating=${course.rating}&students=12000&duration=${encodeURIComponent(course.duration)}&price=49.99` as any);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <BackIcon width={20} height={20} />
      </TouchableOpacity>
      <ThemedText style={styles.title} weight="bold">
        My Learning
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

  const renderMyLearning = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle} weight="semiBold">My Learning</ThemedText>
        <TouchableOpacity style={styles.seeAllButton}>
          <ThemedText style={styles.seeAllText} weight="medium">See all</ThemedText>
          <SeeArrowIcon width={12} height={7} />
        </TouchableOpacity>
      </View>
      <View style={styles.coursesList}>
        {myLearningCourses.map((course, index) => (
          <View
            key={course.id}
            style={[
              styles.courseCard,
              index === myLearningCourses.length - 1 && styles.lastCard,
            ]}
          >
            {/* Course Image with Save Button */}
            <View style={styles.courseImageContainer}>
              <Image source={course.image} style={styles.courseImage} />
              <TouchableOpacity style={styles.savedButton}>
                {course.isSaved ? (
                  <SavedIcon width={20} height={20} />
                ) : (
                  <View style={styles.unsavedButton} />
                )}
              </TouchableOpacity>
            </View>

            {/* Course Info */}
            <View style={styles.courseInfo}>
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
              </View>

              {/* Progress Section */}
              <View style={styles.progressContainer}>
                <ThemedText style={styles.lessonsText} weight="regular">
                  {course.lessonsCompleted}/{course.totalLessons} lessons
                </ThemedText>
                <ThemedText style={styles.progressText} weight="semiBold">
                  {course.progress}%
                </ThemedText>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${course.progress}%` }]} />
              </View>

              {/* Continue Learning Button */}
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => handleCoursePress(course)}
              >
                <ThemedText style={styles.continueButtonText} weight="semiBold">
                  Continue Learning
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
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
        {renderMyLearning()}
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
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
    gap: 16,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  lastCard: {
    marginBottom: 0,
  },
  courseImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
  },
  courseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  savedButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unsavedButton: {
    width: 20,
    height: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
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
  // Progress
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  lessonsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressText: {
    fontSize: 12,
    color: '#4F46E5',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },
  // Continue Button
  continueButton: {
    backgroundColor: '#EDE9FE',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 14,
    color: '#4F46E5',
  },
});
