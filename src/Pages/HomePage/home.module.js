import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const H_PADDING = 16
const GRID_GAP = 14
// 2 sütun: sol padding + sağ padding + aradakı bir boşluq
const CARD_WIDTH = (width - H_PADDING * 2 - GRID_GAP) / 2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTextBlock: {
    gap: 2,
  },
  headerTitleGrey: {
    color: '#333',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerTitleRed: {
    color: '#E6425E',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameLabel: {
    color: '#333',
    fontSize: 14,
    fontWeight: '700'
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ddd',
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bellDot: {
    fontSize: 16,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  bannerWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    color: '#333',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#111',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: GRID_GAP,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  cardLabelOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  cardLabel: {
    color: '#fff',
    textTransform: 'capitalize',
    fontWeight: '700',
  },
})

export default styles

