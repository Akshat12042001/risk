import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../../constants';

const styles = StyleSheet.create({
  customToast: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginTop: 12,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  successToast: {
    backgroundColor: COLORS.TOAST_SUCCESS_BACKGROUND,
    borderColor: COLORS.TOAST_SUCCESS_BORDER,
  },
  errorToast: {
    backgroundColor: COLORS.TOAST_ERROR_BACKGROUND,
    borderColor: COLORS.TOAST_ERROR_BORDER,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successBadge: {
    backgroundColor: COLORS.TOAST_SUCCESS_ICON,
  },
  errorBadge: {
    backgroundColor: COLORS.TOAST_ERROR_ICON,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 4,
  },
  customTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  successTitle: {
    color: COLORS.TOAST_SUCCESS_TEXT,
  },
  errorTitle: {
    color: COLORS.TOAST_ERROR_TEXT,
  },
  customMessage: {
    color: COLORS.TEXT_SECONDARY,
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
});

export default styles;
