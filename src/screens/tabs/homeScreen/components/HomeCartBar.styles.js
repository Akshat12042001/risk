import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../../constants';

export default StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: SCREEN_PADDING,
    right: SCREEN_PADDING,
    bottom: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
  },
  summary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#F0FDFA',
  },
  thumbFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontWeight: '700',
    marginRight: 2,
  },
  serviceName: {
    marginTop: 1,
  },
  cta: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  ctaText: {
    fontWeight: '700',
  },
});
