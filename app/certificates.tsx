import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import TrophyIcon from '../assets/images/trophy.svg';
import EmptyStarIcon from '../assets/images/empty-star.svg';
import CalendarIcon from '../assets/images/calendar.svg';
import StarIcon from '../assets/images/star.svg';
import DownloadIcon from '../assets/images/download.svg';
import ShareIcon from '../assets/images/share.svg';

const certificates = [
  {
    id: '1',
    title: 'Complete UI/UX Design Course',
    instructor: 'Sarah Johnson',
    date: 'Feb 15, 2025',
    grade: 'A',
    score: 100,
    certificateId: 'CERT-2025-UXUI-001',
    image: require('../assets/images/certificate-image1.png'),
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    instructor: 'Emily Chen',
    date: 'Jan 28, 2025',
    grade: 'A+',
    score: 100,
    certificateId: 'CERT-2025-UXUI-001',
    image: require('../assets/images/certificate-image2.png'),
  },
];

export default function CertificatesScreen() {
  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statBox}>
        <TrophyIcon width={32} height={32} />
        <ThemedText style={styles.statNumber} weight="bold">2</ThemedText>
        <ThemedText style={styles.statLabel} weight="regular">Certificates Earned</ThemedText>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statBox}>
        <EmptyStarIcon width={32} height={32} />
        <ThemedText style={styles.statNumber} weight="bold">2</ThemedText>
        <ThemedText style={styles.statLabel} weight="regular">Certificates Earned</ThemedText>
      </View>
    </View>
  );

  const renderCertificateCard = (certificate: typeof certificates[0]) => (
    <View key={certificate.id} style={styles.certificateCard}>
      {/* Certificate Image with Checkmark */}
      <View style={styles.imageContainer}>
        <Image source={certificate.image} style={styles.certificateImage} />
        <View style={styles.checkmarkOverlay}>
          <View style={styles.checkmarkCircle}>
            <ThemedText style={styles.checkmark}>✓</ThemedText>
          </View>
        </View>
      </View>

      {/* Certificate Info */}
      <View style={styles.certificateInfo}>
        <ThemedText style={styles.courseTitle} weight="semiBold">
          {certificate.title}
        </ThemedText>
        <ThemedText style={styles.instructor} weight="regular">
          Instructor: {certificate.instructor}
        </ThemedText>

        {/* Date and Grade */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <CalendarIcon width={14} height={14} />
            <ThemedText style={styles.metaText} weight="regular">
              {certificate.date}
            </ThemedText>
          </View>
          <View style={styles.metaItem}>
            <StarIcon width={14} height={14} />
            <ThemedText style={styles.metaText} weight="regular">
              Grade: {certificate.grade}
            </ThemedText>
          </View>
        </View>

        {/* Score Progress */}
        <View style={styles.scoreRow}>
          <ThemedText style={styles.scoreLabel} weight="regular">Score:</ThemedText>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${certificate.score}%` }]} />
          </View>
          <ThemedText style={styles.scoreValue} weight="semiBold">
            {certificate.score}%
          </ThemedText>
        </View>

        {/* Certificate ID */}
        <ThemedText style={styles.certificateId} weight="regular">
          ID: {certificate.certificateId}
        </ThemedText>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.downloadButton}>
            <DownloadIcon width={18} height={18} />
            <ThemedText style={styles.downloadButtonText} weight="semiBold">
              Download
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <ShareIcon width={18} height={18} />
            <ThemedText style={styles.shareButtonText} weight="semiBold">
              Share
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderStats()}
        <View style={styles.certificatesList}>
          {certificates.map(renderCertificateCard)}
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
  // Stats
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  statNumber: {
    fontSize: 24,
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  // Certificate Card
  certificatesList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  certificateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
  },
  certificateImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  checkmarkOverlay: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  certificateInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 3,
  },
  scoreValue: {
    fontSize: 12,
    color: '#4F46E5',
    minWidth: 35,
    textAlign: 'right',
  },
  certificateId: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 8,
  },
  downloadButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  shareButtonText: {
    fontSize: 14,
    color: '#4F46E5',
  },
});
