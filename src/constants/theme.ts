import {Dimensions} from 'react-native';

export enum FONTS {
  regular = 'System',
  semiBold = 'System',
}

const {height, width} = Dimensions.get('window');

export const COLORS = {
  PRIMARY: '#0D9488',
  PRIMARY_DARK: '#0F766E',
  ACCENT: '#F59E0B',
  LIGHT: '#FAFAF9',
  BACKGROUND: '#FAFAF9',
  WHITE: '#FFFFFF',
  BLACK: '#1C1917',
  GRAY: '#78716C',
  GRAY_LIGHT: '#A8A29E',
  BORDER: '#E7E5E4',
  SKIP_BG: 'rgba(0, 0, 0, 0.22)',
  TEXT_SECONDARY: '#78716C',
  TOAST_SUCCESS_BACKGROUND: '#F0FDFA',
  TOAST_SUCCESS_BORDER: '#99F6E4',
  TOAST_SUCCESS_TEXT: '#0F766E',
  TOAST_SUCCESS_ICON: '#0D9488',
  TOAST_ERROR_BACKGROUND: '#FFF1F2',
  TOAST_ERROR_BORDER: '#FECDD3',
  TOAST_ERROR_TEXT: '#BE123C',
  TOAST_ERROR_ICON: '#E11D48',
  TAB_ACTIVE_BG: '#CCFBF1',
  TAB_ACTIVE: '#0D9488',
  TAB_INACTIVE: '#57534E',
};

export const FONT_SIZE = {
  SM: 12,
  MD: 16,
  LG: 20,
};

export const SCREEN_PADDING = 20;

export const SCREEN = {
  HEIGHT: height,
  WIDTH: width,
};
