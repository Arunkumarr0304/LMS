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
import BackIcon from '../assets/images/back.svg';
import PlayIcon from '../assets/images/play.svg';
import GreenTickIcon from '../assets/images/green-tick.svg';
import ForwardIcon from '../assets/images/forward.svg';

export default function LessonDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    lessonId: string;
    lessonTitle: string;
    duration: string;
    courseId: string;
  }>();

  const {
    lessonId = '1-2',
    lessonTitle = 'Design Thinking Process',
    duration = '12:30',
    courseId = '1',
  } = params;

  // Current lesson info
  const currentLesson = {
    id: lessonId,
    title: lessonTitle,
    duration: duration,
    module: 'Module 1',
    lessonNumber: 'Lesson 2',
    description: 'Learn the five stages of design thinking: Empathize, Define, Ideate, Prototype, and Test. This methodology will transform how you approach design challenges.',
    progress: 65,
  };

  // All lessons in this module
  const allLessons = [
    { id: '1-1', title: 'Introduction to UI/UX', duration: '12:30', completed: true, isCurrent: false },
    { id: '1-2', title: 'Design Thinking Process', duration: '12:30', completed: false, isCurrent: true },
    { id: '1-3', title: 'User Research Methods', duration: '12:30', completed: false, isCurrent: false },
  ];

  const handleBackPress = () => {
    router.back();
  };

  const handleMarkComplete = () => {
    console.log('Marking lesson as complete:', lessonId);
  };

  const handleNextLesson = () => {
    console.log('Going to next lesson');
  };

  const handleLessonPress = (lesson: typeof allLessons[0]) => {
    if (lesson.isCurrent) return;
    router.push({
      pathname: '/lesson-details',
      params: {
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        duration: lesson.duration,
        courseId: courseId,
      },
    });
  };

  const getLessonIcon = (lesson: typeof allLessons[0]) => {
    if (lesson.completed) {
      return (
        <View style={[styles.lessonIcon, styles.lessonIconCompleted]}>
          <GreenTickIcon width={16} height={16} />
        </View>
      );
    }
    return (
      <View style={[styles.lessonIcon, lesson.isCurrent && styles.lessonIconCurrent]}>
        <PlayIcon width={12} height={12} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Video Player Section */}
      <View style={styles.videoContainer}>
        <Image
          source={require('../assets/images/details_bg.png')}
          style={styles.videoThumbnail}
          resizeMode="cover"
        />
        <View style={styles.videoOverlay}>
          <SafeAreaView style={styles.backButtonContainer} edges={['top']}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <BackIcon width={24} height={24} />
            </TouchableOpacity>
          </SafeAreaView>
          
          <TouchableOpacity style={styles.playButton}>
            <View style={styles.playButtonCircle}>
              <PlayIcon width={24} height={24} fill="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Progress Bar */}
        <View style={styles.videoProgressContainer}>
          <View style={[styles.videoProgressBar, { width: `${currentLesson.progress}%` }]} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Lesson Info */}
        <View style={styles.lessonInfo}>
          <ThemedText style={styles.moduleLessonText} weight="regular">
            {currentLesson.module} · {currentLesson.lessonNumber}
          </ThemedText>
          <ThemedText style={styles.lessonTitle} weight="semiBold">
            {currentLesson.title}
          </ThemedText>
          <ThemedText style={styles.lessonDescription} weight="regular">
            {currentLesson.description}
          </ThemedText>
        </View>

        {/* Lesson Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <ThemedText style={styles.progressLabel} weight="medium">
              Lesson Progress
            </ThemedText>
            <ThemedText style={styles.progressPercent} weight="semiBold">
              {currentLesson.progress}%
            </ThemedText>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${currentLesson.progress}%` }]} />
          </View>
        </View>

        {/* Mark Complete Button */}
        <TouchableOpacity style={styles.markCompleteButton} onPress={handleMarkComplete}>
          <GreenTickIcon width={20} height={20} />
          <ThemedText style={styles.markCompleteText} weight="semiBold">
            Mark Complete
          </ThemedText>
        </TouchableOpacity>

        {/* Next Lesson Button */}
        <TouchableOpacity style={styles.nextLessonButton} onPress={handleNextLesson}>
          <ForwardIcon width={20} height={20} />
          <ThemedText style={styles.nextLessonText} weight="semiBold">
            Next Lesson
          </ThemedText>
        </TouchableOpacity>

        {/* All Lessons Section */}
        <View style={styles.allLessonsSection}>
          <ThemedText style={styles.allLessonsTitle} weight="semiBold">
            All Lessons
          </ThemedText>
          <View style={styles.lessonsList}>
            {allLessons.map((lesson) => (
              <TouchableOpacity
                key={lesson.id}
                style={[styles.lessonItem, lesson.isCurrent && styles.lessonItemCurrent]}
                onPress={() => handleLessonPress(lesson)}
                activeOpacity={lesson.isCurrent ? 1 : 0.7}
              >
                {getLessonIcon(lesson)}
                <View style={styles.lessonTextContainer}>
                  <ThemedText 
                    style={[styles.lessonItemTitle, lesson.isCurrent && styles.lessonItemTitleCurrent]} 
                    weight="medium"
                  >
                    {lesson.title}
                  </ThemedText>
                  <ThemedText style={styles.lessonItemDuration} weight="regular">
                    {lesson.duration}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    padding: 20,
    paddingBottom: 40,
  },
  // Video Section
  videoContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#1F2937',
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoProgressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  videoProgressBar: {
    height: '100%',
    backgroundColor: '#4F46E5',
  },
  // Lesson Info
  lessonInfo: {
    marginBottom: 24,
  },
  moduleLessonText: {
    fontSize: 13,
    color: '#4F46E5',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 20,
    color: '#111827',
    marginBottom: 12,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  // Progress Section
  progressSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#111827',
  },
  progressPercent: {
    fontSize: 14,
    color: '#4F46E5',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 3,
  },
  // Buttons
  markCompleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  markCompleteText: {
    fontSize: 16,
    color: '#111827',
  },
  nextLessonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 24,
  },
  nextLessonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  // All Lessons Section
  allLessonsSection: {
    marginTop: 8,
  },
  allLessonsTitle: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  lessonsList: {
    gap: 8,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
  },
  lessonItemCurrent: {
    borderColor: '#4F46E5',
    backgroundColor: '#F5F3FF',
  },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonIconCompleted: {
    backgroundColor: '#DCFCE7',
  },
  lessonIconCurrent: {
    backgroundColor: '#EDE9FE',
  },
  lessonTextContainer: {
    flex: 1,
  },
  lessonItemTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  lessonItemTitleCurrent: {
    color: '#111827',
  },
  lessonItemDuration: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
