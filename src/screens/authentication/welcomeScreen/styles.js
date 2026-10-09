import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 8,
    paddingBottom: 28,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    zIndex: 2,
  },
  skipButton: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.SKIP_BG,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  skipText: {
    fontWeight: '600',
  },
  brandTitleContainer: {
    marginBottom: 8,
  },
  brandTitle: {
    fontWeight: '800',
  },
  brandTaglineContainer: {
    paddingHorizontal: 24,
  },
  brandTagline: {
    fontWeight: '700',
  },
  accentBar: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.ACCENT,
    alignSelf: 'center',
    marginTop: 14,
  },
  marqueeSection: {
    marginTop: -18,
    paddingTop: 28,
    backgroundColor: COLORS.BACKGROUND,
  },
  fadeOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
  },
  fadeStop: {
    flex: 1,
  },
  formSection: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 8,
    paddingBottom: 16,
    justifyContent: 'flex-start',
  },
  formTitleContainer: {
    marginBottom: 20,
  },
  formTitle: {
    fontWeight: '800',
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 16,
  },
  countryCodeContainer: {
    marginRight: 10,
  },
  countryCode: {
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 22,
    backgroundColor: COLORS.BORDER,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    color: COLORS.BLACK,
    fontSize: 16,
    paddingVertical: 0,
  },
  whatsappRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: COLORS.PRIMARY,
  },
  whatsappLabel: {
    fontWeight: '600',
  },
  continueButton: {
    marginBottom: 16,
  },
  footerLink: {
    textDecorationLine: 'underline',
    color: COLORS.GRAY_LIGHT,
  },
});
