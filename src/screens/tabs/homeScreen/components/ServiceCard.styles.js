import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../../constants';

const GAP = 10;
const COLUMNS = 3;
export const CARD_WIDTH =
  (SCREEN.WIDTH - SCREEN_PADDING * 2 - GAP * (COLUMNS - 1)) / COLUMNS;

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
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '75%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  ratingText: {
    fontWeight: '600',
    marginLeft: 2,
  },
  newBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#E11D48',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  newText: {
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  info: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: COLORS.WHITE,
  },
  name: {
    fontWeight: '600',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  price: {
    fontWeight: '700',
  },
  originalPrice: {
    marginLeft: 4,
    textDecorationLine: 'line-through',
  },
});
