import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';

export const INPUT_HEIGHT = 56;
export const LABEL_LEFT = 14;
export const LABEL_FLOAT_TOP = -9;
export const LABEL_REST_TOP = 17;
export const LABEL_REST_SIZE = 16;
export const LABEL_FLOAT_SIZE = 12;

export default StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.WHITE,
    height: INPUT_HEIGHT,
    justifyContent: 'center',
  },
  containerFocused: {
    borderColor: COLORS.PRIMARY,
  },
  containerError: {
    borderColor: COLORS.TOAST_ERROR_ICON,
  },
  input: {
    height: INPUT_HEIGHT,
    paddingHorizontal: 16,
    paddingTop: 8,
    fontSize: 16,
    color: COLORS.BLACK,
  },
  label: {
    position: 'absolute',
    left: LABEL_LEFT,
    paddingHorizontal: 4,
    backgroundColor: COLORS.WHITE,
    zIndex: 1,
  },
  errorText: {
    marginTop: 6,
    marginLeft: 4,
  },
});
