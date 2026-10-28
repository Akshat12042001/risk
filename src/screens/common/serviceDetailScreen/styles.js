import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

const HERO_HEIGHT = Math.min(SCREEN.HEIGHT * 0.42, 360);

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  heroWrap: {
    height: HERO_HEIGHT,
    width: '100%',
    backgroundColor: COLORS.PRIMARY_DARK,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 148, 136, 0.55)',
  },
  heroTopBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 2,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    position: 'absolute',
    left: SCREEN_PADDING,
    right: SCREEN_PADDING,
    bottom: 28,
    zIndex: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 12,
  },
  badgeText: {
    fontWeight: '700',
    letterSpacing: 0.6,
    marginLeft: 6,
  },
  headline: {
    fontWeight: '800',
    lineHeight: 34,
    maxWidth: '62%',
    marginBottom: 14,
  },
  bookButton: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  bookButtonText: {
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  body: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 20,
  },
  title: {
    fontWeight: '800',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  ratingValue: {
    fontWeight: '700',
    marginRight: 4,
  },
  sectionLabel: {
    fontWeight: '500',
    marginBottom: 12,
  },
  durationList: {
    paddingRight: SCREEN_PADDING,
  },
  durationCard: {
    width: 118,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 12,
    marginRight: 10,
    backgroundColor: COLORS.WHITE,
  },
  durationLabel: {
    fontWeight: '700',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  price: {
    fontWeight: '700',
  },
  originalPrice: {
    marginLeft: 6,
    textDecorationLine: 'line-through',
  },
  addButton: {
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
  },
  addButtonText: {
    fontWeight: '700',
  },
  sectionTitle: {
    fontWeight: '800',
    marginTop: 28,
    marginBottom: 16,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  processIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  processText: {
    flex: 1,
    paddingTop: 2,
  },
  processTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  listIcon: {
    marginTop: 1,
    marginRight: 10,
  },
  listText: {
    flex: 1,
    lineHeight: 20,
  },
  faqCard: {
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: COLORS.WHITE,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  faqQuestion: {
    flex: 1,
    fontWeight: '700',
    paddingRight: 10,
  },
  faqAnswerWrap: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.BORDER,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  faqAnswer: {
    lineHeight: 20,
  },
  trustSection: {
    marginTop: 28,
    alignItems: 'center',
    paddingBottom: 8,
  },
  trustTitle: {
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 22,
    paddingHorizontal: 12,
  },
  trustStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  trustStat: {
    flex: 1,
    alignItems: 'center',
  },
  laurel: {
    width: 88,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 44,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  trustLabel: {
    fontWeight: '500',
  },
  trustValue: {
    fontWeight: '800',
    marginVertical: 2,
  },
  trustSuffix: {
    fontWeight: '500',
    textAlign: 'center',
  },
  proImageWrap: {
    width: SCREEN.WIDTH * 0.55,
    height: SCREEN.WIDTH * 0.62,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  skyline: {
    position: 'absolute',
    bottom: 0,
    left: -40,
    right: -40,
    height: 90,
    borderTopWidth: 1.5,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    opacity: 0.7,
  },
  skylineBlock: {
    position: 'absolute',
    bottom: 0,
    width: 28,
    backgroundColor: '#E5E7EB',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  proImage: {
    width: '100%',
    height: '100%',
  },
});
