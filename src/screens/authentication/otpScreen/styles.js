import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

const OTP_BOX_SIZE = Math.min(48, (SCREEN.WIDTH - SCREEN_PADDING * 2 - 40) / 6);

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 12,
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
  content: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 28,
  },
  instruction: {
    fontWeight: '700',
    marginBottom: 28,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: OTP_BOX_SIZE,
    height: OTP_BOX_SIZE + 4,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  otpBoxFocused: {
    borderColor: COLORS.PRIMARY,
  },
  otpBoxFilled: {
    borderColor: COLORS.PRIMARY_DARK,
  },
  otpDigit: {
    fontWeight: '700',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 1,
    width: 1,
  },
  resendText: {
    fontWeight: '500',
  },
  resendActive: {
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 12,
  },
  doneButton: {
    minWidth: 108,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 28,
  },
  doneButtonDisabled: {
    backgroundColor: COLORS.GRAY_LIGHT,
    opacity: 1,
  },
  doneButtonActive: {
    backgroundColor: COLORS.BLACK,
    opacity: 1,
  },
});
