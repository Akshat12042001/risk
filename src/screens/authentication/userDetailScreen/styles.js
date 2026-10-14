import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 28,
  },
  titleRow: {
    marginBottom: 32,
  },
  titleText: {
    fontWeight: '800',
  },
  titleHighlight: {
    color: COLORS.PRIMARY,
    fontWeight: '800',
  },
  input: {
    marginBottom: 20,
  },
  footer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 24,
    paddingTop: 12,
  },
  continueButton: {
    backgroundColor: COLORS.PRIMARY,
  },
});
