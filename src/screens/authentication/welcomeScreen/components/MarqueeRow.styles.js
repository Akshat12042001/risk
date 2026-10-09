import {StyleSheet} from 'react-native';

export const IMAGE_WIDTH = 112;
export const IMAGE_HEIGHT = 88;
export const GAP = 12;

export default StyleSheet.create({
  row: {
    overflow: 'hidden',
    marginBottom: GAP,
  },
  track: {
    flexDirection: 'row',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 16,
    marginRight: GAP,
    backgroundColor: '#CCFBF1',
  },
});
