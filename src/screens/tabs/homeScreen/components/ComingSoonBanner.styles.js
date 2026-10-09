import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../../constants';

export default StyleSheet.create({
  banner: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 28,
    paddingBottom: 24,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.BORDER,
  },
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  description: {
    textAlign: 'center',
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  notifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 28,
    height: 48,
    borderRadius: 12,
    marginBottom: 14,
    minWidth: 180,
  },
  notifyLabel: {
    fontWeight: '700',
    marginLeft: 8,
  },
  changeLocation: {
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
});
