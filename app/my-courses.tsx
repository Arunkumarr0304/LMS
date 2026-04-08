import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import StarIcon from '../assets/images/star.svg';
import SavedIcon from '../assets/images/saved.svg';

const tabs = ['All (3)', 'In Progress (2)', 'Completed (1)'];

const myCourses = [
  {
    id: '1',
    title: 'Python for Data Science',
    instructor: 'Dr. Mike Ross',
    rating: 4.8,
    duration: '28h',
    image: require('../assets/images/popular-course1.png'),
    isSaved: false,
    progress: 65,
    lessonsCompleted: 18,
    totalLessons: 28,
    status: 'in-progress',
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    duration: '28h',
    image: require('../assets/images/popular-course2.png'),
    isSaved: false,
    progress: 30,
    lessonsCompleted: 10,
    totalLessons: 24,
    status: 'in-progress',
  },
  {
    id: '3',
    title: 'React & TypeScript Pro',
    instructor: 'Alex Chen',
    rating: 4.8,
    duration: '28h',
    image: require('../assets/images/popular-course3.png'),
    isSaved: false,
    progress: 65,
    lessonsCompleted: 5,
    totalLessons: 32,
    status: 'in-progress',
  },
  {
    id: '4',
    title: 'Machine Learning Fundamentals',
    instructor: 'Lisa Anderson',
    rating: 4.8,
    duration: '21.5h',
    image: require('../assets/images/popular-course4.png'),
    isSaved: false,
    progress: 54,
    lessonsCompleted: 10,
    totalLessons: 24,
    status: 'completed',
  },
];

export default function MyCoursesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All (3)');
  const [courses, setCourses] = useState(myCourses);

  const toggleSaveCourse = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId ? { ...course, isSaved: !course.isSaved } : course
    ));
  };

  const filteredCourses = () => {
    switch (activeTab) {
      case 'All (3)':
        return courses;
      case 'In Progress (2)':
        return courses.filter(course => course.status === 'in-progress');
      case 'Completed (1)':
        return courses.filter(course => course.status === 'completed');
      default:
        return courses;
    }
  };

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.tabActive,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === tab && styles.tabTextActive,
            ]}
            weight={activeTab === tab ? 'semiBold' : 'regular'}
          >
            {tab}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCourseCard = (course: typeof myCourses[0]) => (
    <View key={course.id} style={styles.courseCard}>
      {/* Course Image with Save Button */}
      <View style={styles.courseImageContainer}>
        <Image source={course.image} style={styles.courseImage} />
        <TouchableOpacity 
          style={styles.savedButton}
          onPress={() => toggleSaveCourse(course.id)}
        >
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
        <TouchableOpacity style={styles.continueButton}>
          <ThemedText style={styles.continueButtonText} weight="semiBold">
            Continue Learning
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderTabs()}
        <View style={styles.coursesList}>
          {filteredCourses().map(renderCourseCard)}
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
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  tabActive: {
    backgroundColor: '#4F46E5',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabTextActive: {
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
    fontSize: 14,
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
