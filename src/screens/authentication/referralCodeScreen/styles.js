import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 24,
  },
  illustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 36,
    height: 180,
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkTopRight: {
    position: 'absolute',
    top: 18,
    right: 48,
  },
  sparkBottomLeft: {
    position: 'absolute',
    bottom: 28,
    left: 52,
  },
  sparkTopLeft: {
    position: 'absolute',
    top: 40,
    left: 40,
  },
  title: {
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontWeight: '400',
    marginBottom: 28,
  },
  input: {
    marginTop: 8,
  },
  footer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: COLORS.WHITE,
  },
  continueButton: {
    backgroundColor: COLORS.PRIMARY,
    marginBottom: 8,
  },
  skipButton: {
    backgroundColor: 'transparent',
    height: 48,
  },
  skipLabel: {
    fontWeight: '700',
  },
});
