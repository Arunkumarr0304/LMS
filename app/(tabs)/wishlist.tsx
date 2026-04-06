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
import BackIcon from '../../assets/images/back.svg';
import StarIcon from '../../assets/images/star.svg';
import SavedIcon from '../../assets/images/saved.svg';

const wishlistCourses = [
  {
    id: '1',
    title: 'Advanced JavaScript Patterns',
    instructor: 'Tom Hardy',
    rating: 4.8,
    duration: '28h',
    price: 49.99,
    image: require('../../assets/images/wishlist-image1.png'),
    isSaved: true,
  },
  {
    id: '2',
    title: 'Product Management 101',
    instructor: 'Jane Cooper',
    rating: 4.8,
    duration: '28h',
    price: 29.99,
    image: require('../../assets/images/wishlist-image2.png'),
    isSaved: true,
  },
];

export default function WishlistScreen() {
  const router = useRouter();
  const [courses, setCourses] = useState(wishlistCourses);

  const handleEnroll = (course: typeof wishlistCourses[0]) => {
    router.push(`/course-details?id=${course.id}&title=${encodeURIComponent(course.title)}&instructor=${encodeURIComponent(course.instructor)}&rating=${course.rating}&students=12000&duration=${encodeURIComponent(course.duration)}&price=${course.price}` as any);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <BackIcon width={20} height={20} />
      </TouchableOpacity>
      <ThemedText style={styles.title} weight="bold">
        My Wishlist
      </ThemedText>
      <View style={styles.placeholder} />
    </View>
  );

  const renderCourseCard = (course: typeof wishlistCourses[0], index: number) => (
    <View
      key={course.id}
      style={[
        styles.courseCard,
        index === courses.length - 1 && styles.lastCard,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={course.image} style={styles.courseImage} />
        <TouchableOpacity style={styles.saveButton}>
          <SavedIcon width={16} height={16} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.courseContent}>
        <ThemedText style={styles.courseTitle} weight="semiBold" numberOfLines={1}>
          {course.title}
        </ThemedText>
        <ThemedText style={styles.courseInstructor} weight="regular">
          {course.instructor}
        </ThemedText>
        
        <View style={styles.ratingPriceRow}>
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
          <ThemedText style={styles.price} weight="bold">
            ${course.price}
          </ThemedText>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.enrollButton}
        onPress={() => handleEnroll(course)}
      >
        <ThemedText style={styles.enrollButtonText} weight="semiBold">
          Enroll Now
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
        <View style={styles.coursesContainer}>
          {courses.map((course, index) => renderCourseCard(course, index))}
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
  // Courses
  coursesContainer: {
    paddingHorizontal: 20,
  },
  courseCard: {
    marginBottom: 20,
  },
  lastCard: {
    marginBottom: 0,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  courseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  saveButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseContent: {
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  ratingPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#4F46E5',
  },
  enrollButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  enrollButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
