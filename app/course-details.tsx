import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import BackIcon from '../assets/images/back.svg';
import StarIcon from '../assets/images/star.svg';
import EmptyStarIcon from '../assets/images/empty-star.svg';
import UsersIcon from '../assets/images/users.svg';
import ClockIcon from '../assets/images/clock.svg';
import BookIcon from '../assets/images/book.svg';
import GreenTickIcon from '../assets/images/green-tick.svg';
import PlayIcon from '../assets/images/play.svg';
import NextArrowIcon from '../assets/images/next-arrow.svg';
import RightArcIcon from '../assets/images/right-arc.svg';

type TabType = 'Overview' | 'Curriculum' | 'Reviews';

const tabs: TabType[] = ['Overview', 'Curriculum', 'Reviews'];

const whatYouWillLearn = [
  'Design thinking & user research',
  'Wireframing & prototyping',
  'Visual design principles',
  'Usability testing',
  'Design systems & components',
];

const courseDetailsData: Record<string, {
  description: string;
  lessons: number;
}> = {
  '1': {
    description: 'Master the complete UI/UX design process from research to prototyping. Learn industry-standard tools and methodologies used by top designers at companies like Google, Apple, and Spotify.',
    lessons: 42,
  },
  '2': {
    description: 'Build professional mobile applications using React Native. Learn to create cross-platform apps with a single codebase while maintaining native performance and feel.',
    lessons: 38,
  },
  '3': {
    description: 'Comprehensive digital marketing course covering SEO, social media marketing, email campaigns, and analytics. Learn strategies that drive real business results.',
    lessons: 35,
  },
  '4': {
    description: 'Master business fundamentals including strategy, operations, finance, and leadership. Essential knowledge for entrepreneurs and business professionals.',
    lessons: 28,
  },
  '5': {
    description: 'Advanced Python programming concepts including data structures, algorithms, object-oriented programming, and best practices for production code.',
    lessons: 45,
  },
};

const curriculumData = [
  {
    id: '1',
    title: 'Getting Started',
    lessons: 3,
    expanded: true,
    items: [
      { id: '1-1', title: 'Introduction to UI/UX', duration: '12:30', completed: true },
      { id: '1-2', title: 'Design Thinking Process', duration: '12:30', completed: true },
      { id: '1-3', title: 'User Research Methods', duration: '12:30', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Design Fundamentals',
    lessons: 3,
    expanded: false,
    items: [
      { id: '2-1', title: 'Color Theory', duration: '15:00', completed: false },
      { id: '2-2', title: 'Typography Basics', duration: '12:30', completed: false },
      { id: '2-3', title: 'Layout Principles', duration: '14:00', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Prototyping',
    lessons: 2,
    expanded: false,
    items: [
      { id: '3-1', title: 'Low-Fidelity Wireframes', duration: '18:30', completed: false },
      { id: '3-2', title: 'High-Fidelity Mockups', duration: '22:00', completed: false },
    ],
  },
];

const reviewsData = [
  {
    id: '1',
    name: 'Alice M.',
    avatar: 'A',
    date: '2 weeks ago',
    rating: 5,
    review: 'Excellent course! Very well structured and the instructor explains everything clearly.',
  },
  {
    id: '2',
    name: 'Bob K.',
    avatar: 'A',
    date: '1 month ago',
    rating: 4,
    review: 'Great content, learned a lot about modern UI design practices.',
  },
];

export default function CourseDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    instructor: string;
    rating: string;
    students: string;
    duration: string;
    price: string;
  }>();

  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['1']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          star <= rating ? (
            <StarIcon key={star} width={16} height={16} />
          ) : (
            <EmptyStarIcon key={star} width={16} height={16} />
          )
        ))}
      </View>
    );
  };

  const renderCurriculum = () => (
    <View style={styles.tabContent}>
      {curriculumData.map((section) => (
        <View key={section.id} style={styles.curriculumSection}>
          <TouchableOpacity 
            style={styles.curriculumHeader}
            onPress={() => toggleSection(section.id)}
          >
            <View>
              <ThemedText style={styles.curriculumTitle} weight="semiBold">
                {section.title}
              </ThemedText>
              <ThemedText style={styles.curriculumLessons} weight="regular">
                {section.lessons} lessons
              </ThemedText>
            </View>
            <RightArcIcon 
              width={16} 
              height={16} 
              style={expandedSections.includes(section.id) ? { transform: [{ rotate: '90deg' }] } : undefined}
            />
          </TouchableOpacity>
          
          {expandedSections.includes(section.id) && (
            <View style={styles.curriculumItems}>
              {section.items.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.curriculumItem}
                  onPress={() => router.push({
                    pathname: '/lesson-details',
                    params: {
                      lessonId: item.id,
                      lessonTitle: item.title,
                      duration: item.duration,
                      courseId: id,
                    },
                  })}
                >
                  <View style={[styles.lessonIcon, item.completed && styles.lessonIconCompleted]}>
                    {item.completed ? (
                      <GreenTickIcon width={16} height={16} />
                    ) : (
                      <PlayIcon width={12} height={12} />
                    )}
                  </View>
                  <View style={styles.lessonInfo}>
                    <ThemedText style={styles.lessonTitle} weight="medium">
                      {item.title}
                    </ThemedText>
                    <ThemedText style={styles.lessonDuration} weight="regular">
                      {item.duration}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderReviews = () => (
    <View style={styles.tabContent}>
      {reviewsData.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <View style={styles.reviewUser}>
              <View style={styles.avatar}>
                <ThemedText style={styles.avatarText} weight="semiBold">
                  {review.avatar}
                </ThemedText>
              </View>
              <View>
                <ThemedText style={styles.reviewerName} weight="semiBold">
                  {review.name}
                </ThemedText>
                <ThemedText style={styles.reviewDate} weight="regular">
                  {review.date}
                </ThemedText>
              </View>
            </View>
            {renderStars(review.rating)}
          </View>
          <ThemedText style={styles.reviewText} weight="regular">
            {review.review}
          </ThemedText>
        </View>
      ))}
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Curriculum':
        return renderCurriculum();
      case 'Reviews':
        return renderReviews();
      case 'Overview':
      default:
        return (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle} weight="semiBold">
                About This Course
              </ThemedText>
              <ThemedText style={styles.sectionText} weight="regular">
                {details.description}
              </ThemedText>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle} weight="semiBold">
                What You'll Learn
              </ThemedText>
              <View style={styles.learnList}>
                {whatYouWillLearn.map((item, index) => (
                  <View key={index} style={styles.learnItem}>
                    <GreenTickIcon width={20} height={20} />
                    <ThemedText style={styles.learnText} weight="regular">
                      {item}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>
          </View>
        );
    }
  };

  const {
    id = '1',
    title = 'Complete UI/UX Design Masterclass',
    instructor = 'Sarah Johnson',
    rating = '4.8',
    students = '12400',
    duration = '24h 30m',
    price = '49.99',
  } = params;

  const details = courseDetailsData[id] || courseDetailsData['1'];

  const handleBackPress = () => {
    router.back();
  };

  const handleEnrollPress = () => {
    router.push({
      pathname: '/payment',
      params: {
        courseId: id,
        courseTitle: title,
        price: price,
      },
    });
  };

  const formatStudents = (num: string) => {
    const n = parseInt(num, 10);
    if (n >= 1000) {
      return `${(n / 1000).toFixed(1)}k`;
    }
    return num;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section with Back Button */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../assets/images/details_bg.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          
          {/* Back Button - Floating over hero */}
          <SafeAreaView style={styles.backButtonContainer} edges={['top']}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <BackIcon width={24} height={24} />
            </TouchableOpacity>
          </SafeAreaView>
          
          <View style={styles.heroOverlay}>
            <View style={styles.categoryChip}>
              <ThemedText style={styles.categoryText} weight="medium">
                Design
              </ThemedText>
            </View>
            <ThemedText style={styles.heroTitle} weight="bold">
              {title}
            </ThemedText>
            <ThemedText style={styles.heroInstructor} weight="regular">
              By {instructor}
            </ThemedText>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <StarIcon width={16} height={16} />
            <ThemedText style={styles.statText} weight="medium">
              {rating}
            </ThemedText>
          </View>
          <View style={styles.statItem}>
            <UsersIcon width={16} height={16} />
            <ThemedText style={styles.statText} weight="medium">
              {formatStudents(students)} students
            </ThemedText>
          </View>
          <View style={styles.statItem}>
            <ClockIcon width={16} height={16} />
            <ThemedText style={styles.statText} weight="medium">
              {duration}
            </ThemedText>
          </View>
          <View style={styles.statItem}>
            <BookIcon width={16} height={16} />
            <ThemedText style={styles.statText} weight="medium">
              {details.lessons} lessons
            </ThemedText>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <ThemedText
                style={[styles.tabText, activeTab === tab && styles.tabTextActive]}
                weight={activeTab === tab ? 'semiBold' : 'medium'}
              >
                {tab}
              </ThemedText>
              {activeTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Bottom padding to account for fixed footer */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Fixed Footer */}
      <SafeAreaView style={styles.footerContainer} edges={['bottom']}>
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <ThemedText style={styles.priceLabel} weight="regular">
              Price
            </ThemedText>
            <ThemedText style={styles.priceValue} weight="bold">
              ${price}
            </ThemedText>
          </View>
          <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollPress}>
            <ThemedText style={styles.enrollButtonText} weight="semiBold">
              Enroll Now
            </ThemedText>
          </TouchableOpacity>
        </View>
        <ThemedText style={styles.guaranteeText} weight="regular">
          30-day money-back guarantee · Lifetime access
        </ThemedText>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  bottomPadding: {
    height: 140,
  },
  // Back Button
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Hero Section
  heroContainer: {
    width: '100%',
    height: 320,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 80,
    backgroundColor: 'transparent',
  },
  categoryChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  heroTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroInstructor: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Stats Row
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: '#6B7280',
  },
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  tabActive: {},
  tabText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#4F46E5',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 2,
    backgroundColor: '#4F46E5',
    borderRadius: 1,
  },
  // Overview Content
  overviewContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  learnList: {
    gap: 12,
  },
  learnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  learnText: {
    fontSize: 14,
    color: '#374151',
  },
  // Tab Content
  tabContent: {
    padding: 20,
  },
  // Curriculum
  curriculumSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  curriculumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  curriculumTitle: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  curriculumLessons: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  curriculumItems: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  curriculumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  lessonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonIconCompleted: {
    backgroundColor: '#DCFCE7',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  lessonDuration: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  // Reviews
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  reviewerName: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  // Footer
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    gap: 2,
  },
  priceLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  priceValue: {
    fontSize: 20,
    color: '#111827',
  },
  enrollButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  enrollButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  guaranteeText: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
});
