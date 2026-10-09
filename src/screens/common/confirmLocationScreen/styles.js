import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  mapArea: {
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchWrap: {
    position: 'absolute',
    top: 12,
    left: SCREEN_PADDING,
    right: SCREEN_PADDING,
    zIndex: 20,
  },
  placesContainer: {
    flex: 0,
  },
  placesInput: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.WHITE,
    paddingLeft: 44,
    paddingRight: 16,
    fontSize: 15,
    color: COLORS.BLACK,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  placesList: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    maxHeight: 220,
  },
  placesRow: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  placesDescription: {
    color: COLORS.BLACK,
    fontSize: 14,
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    top: 13,
    zIndex: 21,
  },
  centerPinWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  callout: {
    backgroundColor: COLORS.BLACK,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 140,
    maxWidth: 220,
    marginBottom: 6,
    opacity: 1,
  },
  calloutHidden: {
    opacity: 0,
  },
  calloutTitle: {
    fontWeight: '400',
  },
  calloutSubtitle: {
    fontWeight: '700',
    marginTop: 2,
  },
  centerPin: {
    marginBottom: -18,
    transform: [{translateY: -22}],
  },
  centerPinRaised: {
    transform: [{translateY: -34}],
  },
  centerPinShadow: {
    width: 10,
    height: 4,
    borderRadius: 5,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    transform: [{translateY: -18}],
  },
  fetchingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  fetchingLabel: {
    marginLeft: 10,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  currentLocationLabel: {
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomCard: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 16,
    paddingBottom: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  addressTextWrap: {
    flex: 1,
    marginLeft: 10,
  },
  addressTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  confirmButton: {
    backgroundColor: COLORS.PRIMARY,
  },
});
