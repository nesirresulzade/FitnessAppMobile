import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  heroContainer: {
    height: height * 0.4,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  apiBadge: {
    marginLeft: 8,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  apiBadgeText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 4,
  },
  exerciseCard: {
    width: (width - 16 * 2 - 12) / 2,
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  exerciseImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#fff',
  },
  exerciseName: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#555',
    fontSize: 12,
    textTransform: 'lowercase',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#E6425E',
    textAlign: 'center',
    fontWeight: '600',
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  // Bottom Sheet Styles
  bottomSheetContent: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  exerciseDetailImageContainer: {
    height: 200,
    marginBottom: 20,
  },
  exerciseDetailImage: {
    width: '100%',
    height: '100%',
  },
  exerciseInfoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  exerciseDetailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
  },
  exerciseDetails: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
    marginRight: 8,
    fontWeight: '500',
    minWidth: 80,
  },
  detailValue: {
    fontSize: 16,
    color: '#ff6b35',
    fontWeight: 'bold',
    flex: 1,
  },
})

export default styles
