import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F6FB',
  },
  header: {
    backgroundColor: COLORS.PRIMARY_DARK,
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 28,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  headerTitle: {
    fontWeight: '700',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#DDD6FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: '800',
    marginBottom: 4,
  },
  userPhone: {
    marginBottom: 8,
    opacity: 0.85,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editLabel: {
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 16,
    paddingBottom: 32,
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  quickCard: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 18,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  quickLabel: {
    fontWeight: '700',
    marginTop: 16,
  },
  listCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  listRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  listRowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  listIcon: {
    marginRight: 14,
  },
  listLabel: {
    fontWeight: '500',
  },
  listLabelContainer: {
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.BORDER,
    marginLeft: 54,
  },
  version: {
    textAlign: 'center',
    marginTop: 12,
    letterSpacing: 0.6,
    fontWeight: '500',
  },
});
