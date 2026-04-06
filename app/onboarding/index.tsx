import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    image: require('@/assets/images/Onboarding-Screen-1.png'),
    mainTitle: 'Explore',
    subTitle: 'Thousands',
    mainTitle2: 'of Courses',
    description: 'Find courses from experts across multiple industries.',
  },
  {
    id: 2,
    image: require('@/assets/images/Onboarding-Screen-2.png'),
    mainTitle: 'Learn at',
    subTitle: 'Your Own',
    subTitle2: 'Pace',
    description: 'Access lessons anytime and track your progress.',
  },
  {
    id: 3,
    image: require('@/assets/images/Onboarding-Screen-3.png'),
    mainTitle: 'Earn',
    subTitle: 'Certificates',
    description: 'Complete courses and receive verified certificates.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSkip = useCallback(() => {
    router.replace('/(tabs)');
  }, [router]);

  const handleGetStarted = useCallback(async () => {
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    router.replace('/(auth)/login');
  }, [router]);

  const goToNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex]);

  const currentSlide = slides[currentIndex];

  return (
    <View style={styles.wrapper}>
      <Image source={currentSlide.image} style={styles.backgroundImage} resizeMode="cover" />
      <View style={styles.overlay}>
        {/* Pagination at Top */}
        <View style={styles.paginationContainer}>
          <View style={styles.pagination}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.paginationBar,
                  i === currentIndex && styles.activeBar,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <ThemedText style={styles.mainTitle}>{currentSlide.mainTitle}</ThemedText>
            <ThemedText style={styles.subTitle}>{currentSlide.subTitle}</ThemedText>
            {currentSlide.mainTitle2 && (
              <ThemedText style={styles.mainTitle}>{currentSlide.mainTitle2}</ThemedText>
            )}
            {currentSlide.subTitle2 && (
              <ThemedText style={styles.subTitle}>{currentSlide.subTitle2}</ThemedText>
            )}
            <ThemedText style={styles.description}>{currentSlide.description}</ThemedText>
          </View>
        </View>

        <View style={styles.footer}>
          {currentIndex < slides.length - 1 ? (
            <>
              <TouchableOpacity onPress={handleSkip}>
                <ThemedText style={styles.skipText}>Skip</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowButton} onPress={goToNext}>
                <Ionicons name="chevron-forward" size={28} color="#fff" />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
              <ThemedText style={styles.getStartedText}>Get Started</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
  },
  paginationContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },
  paginationBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  activeBar: {
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 44,
  },
  subTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6B7EFF',
    lineHeight: 44,
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 20,
    color: '#fff',
    marginTop: 16,
    opacity: 0.9,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  arrowButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6B7EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  getStartedButton: {
    backgroundColor: '#6B7EFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
