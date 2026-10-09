import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.BORDER,
    paddingTop: 20,
    paddingHorizontal: SCREEN_PADDING,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabHit: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 34,
    width: SCREEN.WIDTH / 2 - 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabPillActive: {
    backgroundColor: COLORS.TAB_ACTIVE_BG,
  },
  tabLabel: {
    fontWeight: '600',
    marginLeft: 8,
  },
});
