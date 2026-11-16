import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 12,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER,
    padding: 16,
    marginBottom: 14,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: '#CCFBF1',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusBadgePaid: {
    backgroundColor: '#ECFDF5',
  },
  statusText: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  bookingNumber: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  receiverName: {
    fontWeight: '800',
    marginBottom: 4,
  },
  scheduleText: {
    marginTop: 2,
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceRowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.BORDER,
    marginTop: 12,
    paddingTop: 12,
  },
  serviceThumb: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#F0FDFA',
  },
  serviceThumbFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceInfo: {
    flex: 1,
    marginRight: 10,
  },
  serviceName: {
    fontWeight: '700',
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    marginRight: 6,
    textDecorationLine: 'line-through',
  },
  price: {
    fontWeight: '700',
  },
  durationBadge: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F0FDFA',
  },
  durationText: {
    fontWeight: '700',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  detailRowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.BORDER,
  },
  detailIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontWeight: '700',
    marginBottom: 2,
  },
  detailSub: {
    lineHeight: 18,
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponBadge: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F0FDFA',
    marginRight: 10,
  },
  couponCode: {
    fontWeight: '800',
  },
  billHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  billAmount: {
    fontWeight: '800',
  },
  billSaved: {
    fontWeight: '600',
    marginTop: 4,
  },
  billLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  billDashed: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderStyle: 'dashed',
    borderColor: COLORS.BORDER,
  },
  billTotalLine: {
    paddingTop: 10,
  },
  billTotalLabel: {
    fontWeight: '800',
  },
});
