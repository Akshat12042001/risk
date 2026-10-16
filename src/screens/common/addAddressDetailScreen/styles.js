import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F6FB',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 18,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 14,
  },
  saveAsLabel: {
    fontWeight: '500',
    marginBottom: 10,
  },
  typeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeChip: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeChipSelected: {
    borderColor: COLORS.PRIMARY_DARK,
    backgroundColor: '#CCFBF1',
  },
  typeChipSpacing: {
    marginRight: 12,
  },
  typeChipLabel: {
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  halfInput: {
    flex: 1,
  },
  halfInputSpacing: {
    marginRight: 12,
  },
  input: {
    marginBottom: 14,
  },
  inputLast: {
    marginBottom: 0,
  },
  areaCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  areaContent: {
    flex: 1,
    marginRight: 12,
  },
  areaLabel: {
    fontWeight: '500',
    marginBottom: 8,
  },
  areaAddress: {
    fontWeight: '700',
    lineHeight: 22,
  },
  changeButton: {
    backgroundColor: '#CCFBF1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  changeLabel: {
    fontWeight: '700',
  },
  receiverSubtitle: {
    marginBottom: 18,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: '#F4F6FB',
  },
  saveButton: {
    backgroundColor: COLORS.PRIMARY_DARK,
  },
});
