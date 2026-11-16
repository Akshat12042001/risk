import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 16,
    paddingBottom: 32,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER,
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 8,
    marginBottom: 28,
  },
  codeInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.BLACK,
    paddingVertical: 10,
    paddingRight: 10,
  },
  applyButton: {
    backgroundColor: '#9CA3AF',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    minWidth: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  applyText: {
    fontWeight: '700',
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: 14,
  },
  loadingWrap: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  couponCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER,
  },
  couponAccent: {
    width: 5,
    backgroundColor: COLORS.PRIMARY,
  },
  couponBody: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  codeBadge: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F0FDFA',
  },
  codeBadgeText: {
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  cardApplyButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 64,
    alignItems: 'center',
  },
  cardApplyButtonApplied: {
    opacity: 0.85,
  },
  cardApplyText: {
    fontWeight: '800',
  },
  couponTitle: {
    fontWeight: '800',
    marginBottom: 4,
  },
  couponDescription: {
    lineHeight: 19,
  },
  termsWrap: {
    marginTop: 10,
    gap: 4,
  },
  termText: {
    lineHeight: 17,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  emptyIconWrap: {
    width: 88,
    height: 64,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    backgroundColor: '#F0FDFA',
  },
  emptyTitle: {
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
