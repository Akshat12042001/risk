import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants';
import {CARD_WIDTH} from './ServiceCard.styles';

const GAP = 10;

export default StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.WHITE,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: GAP,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER,
  },
  imageArea: {
    height: CARD_WIDTH * 0.95,
    backgroundColor: '#E5E7EB',
  },
  info: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: COLORS.WHITE,
  },
  nameLine: {
    height: 12,
    width: '78%',
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  priceLine: {
    height: 11,
    width: '48%',
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
});
