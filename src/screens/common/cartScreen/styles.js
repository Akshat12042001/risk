import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 12,
    paddingBottom: 120,
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
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reviewTitle: {
    fontWeight: '800',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  serviceThumb: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#F0FDFA',
  },
  serviceInfo: {
    flex: 1,
    marginRight: 10,
  },
  serviceName: {
    fontWeight: '700',
    marginBottom: 4,
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
  minutesControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 4,
    minWidth: 108,
  },
  minutesButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minutesValue: {
    flex: 1,
    alignItems: 'center',
  },
  minutesNumber: {
    fontWeight: '800',
    lineHeight: 18,
  },
  minutesUnit: {
    fontWeight: '600',
    marginTop: -1,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F3F0FF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 1,
  },
  infoText: {
    flex: 1,
    lineHeight: 18,
  },
  addMoreRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.BORDER,
    paddingTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addMoreLink: {
    fontWeight: '700',
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  couponContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  couponIcon: {
    marginRight: 10,
  },
  couponTextWrap: {
    flex: 1,
  },
  couponText: {
    fontWeight: '700',
  },
  couponRemove: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    minWidth: 56,
    alignItems: 'flex-end',
  },
  couponRemoveText: {
    fontWeight: '700',
  },
  couponDisabled: {
    opacity: 0.45,
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
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
    marginRight: 8,
  },
  detailLabel: {
    fontWeight: '700',
    marginBottom: 2,
  },
  detailSub: {
    lineHeight: 18,
  },
  changeSlot: {
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  billCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  billLeft: {
    flex: 1,
    marginRight: 12,
  },
  billAmount: {
    fontWeight: '800',
    marginBottom: 4,
  },
  billSaved: {
    fontWeight: '600',
  },
  billChevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  billExpanded: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.BORDER,
  },
  billLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  billLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  billInfoIcon: {
    marginLeft: 6,
  },
  billDashed: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginVertical: 4,
  },
  billTotalLine: {
    paddingTop: 8,
    paddingBottom: 2,
  },
  billTotalLabel: {
    fontWeight: '800',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.BORDER,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 12,
  },
  bottomButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    minHeight: 56,
  },
  bottomButtonDisabled: {
    opacity: 0.75,
  },
  bottomButtonText: {
    fontWeight: '800',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SCREEN_PADDING,
  },
  // Schedule modal
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalDismissArea: {
    flex: 1,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalSheet: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 10,
    maxHeight: SCREEN.HEIGHT * 0.78,
  },
  grabber: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginBottom: 14,
  },
  modalTitle: {
    fontWeight: '800',
    marginBottom: 16,
  },
  dateList: {
    paddingBottom: 4,
  },
  dateChip: {
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 10,
    backgroundColor: COLORS.WHITE,
  },
  dateChipSelected: {
    borderColor: COLORS.PRIMARY,
  },
  dateChipText: {
    fontWeight: '600',
  },
  dateChipTextSelected: {
    fontWeight: '800',
  },
  slotCard: {
    marginTop: 16,
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.BORDER,
    paddingTop: 14,
    paddingHorizontal: 14,
    paddingBottom: 18,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  slotLabel: {
    fontWeight: '500',
    marginBottom: 12,
  },
  periodRow: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    padding: 4,
    marginBottom: 14,
  },
  periodChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 10,
  },
  periodChipSelected: {
    backgroundColor: COLORS.PRIMARY,
  },
  periodLabel: {
    fontWeight: '700',
    marginLeft: 4,
  },
  slotList: {
    paddingBottom: 12,
    paddingTop: 2,
  },
  slotChip: {
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
    marginRight: 10,
    minWidth: 92,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    overflow: 'visible',
  },
  slotChipWithSurcharge: {
    marginBottom: 6,
  },
  slotChipSelected: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: '#F0FDFA',
  },
  slotChipDisabled: {
    opacity: 0.45,
    backgroundColor: '#F9FAFB',
  },
  slotTime: {
    fontWeight: '700',
  },
  slotSurchargeBadge: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -9,
    alignItems: 'center',
  },
  slotSurchargeBadgeSelected: {},
  slotSurcharge: {
    fontWeight: '700',
    backgroundColor: COLORS.WHITE,
    overflow: 'hidden',
    paddingHorizontal: 6,
  },
  slotSurchargeSelected: {
    backgroundColor: '#F0FDFA',
  },
  soldOutWrap: {
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  soldOutIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  soldOutTitle: {
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  soldOutText: {
    textAlign: 'center',
    lineHeight: 20,
  },
  noteText: {
    marginTop: 14,
    marginBottom: 12,
    lineHeight: 18,
  },
  confirmButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  confirmButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  confirmButtonText: {
    fontWeight: '800',
  },
  receiverSheet: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 18,
  },
  receiverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  receiverTitle: {
    fontWeight: '800',
  },
  receiverClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiverInput: {
    marginBottom: 16,
  },
  phoneField: {
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 10,
    marginBottom: 22,
  },
  phoneFloatingLabel: {
    position: 'absolute',
    top: -9,
    left: 12,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 4,
    fontWeight: '600',
    overflow: 'hidden',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneCode: {
    fontWeight: '600',
  },
  phoneDivider: {
    width: 1,
    height: 22,
    backgroundColor: COLORS.BORDER,
    marginHorizontal: 12,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.BLACK,
    paddingVertical: 4,
  },
  unserviceableRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  unserviceableIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  unserviceableText: {
    flex: 1,
  },
  unserviceableTitle: {
    fontWeight: '800',
    marginBottom: 2,
  },
  gstModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  gstModalCard: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 8,
  },
  gstModalDisclaimer: {
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 14,
  },
  gstModalDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.BORDER,
    marginBottom: 12,
  },
  gstModalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  gstModalTotal: {
    fontWeight: '800',
  },
  gstOkayButton: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  gstOkayText: {
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
