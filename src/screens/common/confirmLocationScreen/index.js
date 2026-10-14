import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Pressable,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Config from 'react-native-config';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import {
  Button,
  Header,
  Icon,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {errorToast} from '../../../utils/alerts';
import {getAddressFromCoords} from '../../../utils/location';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DEFAULT_COORDINATE = {
  latitude: 30.7046,
  longitude: 76.7179,
};

const DEFAULT_LOCATION = {
  title: 'D-224',
  address: 'Sector 91, Sahibzada Ajit Singh Nagar, Punjab, India, 140307',
  ...DEFAULT_COORDINATE,
};

const REGION_DELTA = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const ConfirmLocationScreen = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const mapRef = useRef(null);
  const skipGeocodeRef = useRef(false);
  const geocodeRequestId = useRef(0);

  const apiKey =
    Config.GOOGLE_MAPS_API_KEY || 'AIzaSyBteSXgeCh5tcLGtCGTAH762pkqvdnaDzk';

  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [mapSize, setMapSize] = useState(null);
  const [isMapMoving, setIsMapMoving] = useState(false);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);

  const handleMapLayout = useCallback(event => {
    const {width, height} = event.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setMapSize({width, height});
    }
  }, []);

  const animateTo = useCallback((latitude, longitude, {skipGeocode = true} = {}) => {
    skipGeocodeRef.current = skipGeocode;
    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        ...REGION_DELTA,
      },
      400,
    );
  }, []);

  const reverseGeocode = useCallback(
    async (latitude, longitude) => {
      const requestId = ++geocodeRequestId.current;

      setSelectedLocation(prev => ({
        ...prev,
        latitude,
        longitude,
      }));
      setIsFetchingAddress(true);

      try {
        const result = await getAddressFromCoords(latitude, longitude, apiKey);
        if (requestId !== geocodeRequestId.current) {
          return;
        }

        if (!result) {
          setSelectedLocation(prev => ({
            ...prev,
            title: t('CONFIRM_LOCATION_SCREEN.SELECTED_LOCATION'),
            address: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
            latitude,
            longitude,
          }));
          return;
        }

        setSelectedLocation({
          title:
            result.title || t('CONFIRM_LOCATION_SCREEN.SELECTED_LOCATION'),
          address: result.address,
          latitude,
          longitude,
        });
      } catch (error) {
        if (requestId !== geocodeRequestId.current) {
          return;
        }
        setSelectedLocation(prev => ({
          ...prev,
          title: t('CONFIRM_LOCATION_SCREEN.SELECTED_LOCATION'),
          address: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          latitude,
          longitude,
        }));
      } finally {
        if (requestId === geocodeRequestId.current) {
          setIsFetchingAddress(false);
        }
      }
    },
    [apiKey, t],
  );

  const handleRegionChange = useCallback(() => {
    setIsMapMoving(true);
  }, []);

  const handleRegionChangeComplete = useCallback(
    region => {
      setIsMapMoving(false);

      if (skipGeocodeRef.current) {
        skipGeocodeRef.current = false;
        return;
      }

      reverseGeocode(region.latitude, region.longitude);
    },
    [reverseGeocode],
  );

  const handleMapPress = useCallback(
    event => {
      const {latitude, longitude} = event.nativeEvent.coordinate;
      Keyboard.dismiss();
      animateTo(latitude, longitude, {skipGeocode: true});
      reverseGeocode(latitude, longitude);
    },
    [animateTo, reverseGeocode],
  );

  const handlePlaceSelect = useCallback(
    (data, details = null) => {
      Keyboard.dismiss();
      const location = details?.geometry?.location;
      if (!location) {
        return;
      }

      const latitude = location.lat;
      const longitude = location.lng;
      const title =
        data?.structured_formatting?.main_text ||
        data?.description?.split(',')[0] ||
        t('CONFIRM_LOCATION_SCREEN.SELECTED_LOCATION');

      setSelectedLocation({
        title,
        address: details?.formatted_address || data?.description || '',
        latitude,
        longitude,
      });
      animateTo(latitude, longitude, {skipGeocode: true});
    },
    [animateTo, t],
  );

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS !== 'android') {
      return true;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }, []);

  const handleGoToCurrentLocation = useCallback(async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      errorToast(t('CONFIRM_LOCATION_SCREEN.LOCATION_ERROR'));
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        animateTo(latitude, longitude, {skipGeocode: true});
        reverseGeocode(latitude, longitude);
      },
      () => {
        errorToast(t('CONFIRM_LOCATION_SCREEN.LOCATION_ERROR'));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, [animateTo, requestLocationPermission, reverseGeocode, t]);

  const handleConfirm = useCallback(() => {
    // Confirm location will be wired later
  }, []);

  return (
    <ScreenContainer noPaddingBottom noPaddingTop>
      <View style={styles.root}>
        <Header title={t('CONFIRM_LOCATION_SCREEN.TITLE')} />

        <View
          style={styles.mapArea}
          collapsable={false}
          onLayout={handleMapLayout}>
          {mapSize ? (
            <MapView
              ref={mapRef}
              style={{width: mapSize.width, height: mapSize.height}}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                ...DEFAULT_COORDINATE,
                ...REGION_DELTA,
              }}
              showsUserLocation
              showsMyLocationButton={false}
              userInterfaceStyle="light"
              loadingEnabled
              loadingIndicatorColor={COLORS.PRIMARY}
              loadingBackgroundColor="#E5E7EB"
              moveOnMarkerPress={false}
              onPress={handleMapPress}
              onRegionChange={handleRegionChange}
              onRegionChangeComplete={handleRegionChangeComplete}
            />
          ) : null}

          <View pointerEvents="none" style={styles.centerPinWrap}>
            <View
              style={[
                styles.callout,
                isMapMoving && styles.calloutHidden,
              ]}>
              <StyledText
                color={COLORS.WHITE}
                size={12}
                textStyle={styles.calloutTitle}>
                {t('CONFIRM_LOCATION_SCREEN.SET_AS_LOCATION')}
              </StyledText>
              <StyledText
                color={COLORS.WHITE}
                size={14}
                textStyle={styles.calloutSubtitle}
                numberOfLines={1}>
                {isFetchingAddress
                  ? t('CONFIRM_LOCATION_SCREEN.FETCHING_ADDRESS')
                  : selectedLocation.title}
              </StyledText>
            </View>
            <View
              style={[
                styles.centerPin,
                isMapMoving && styles.centerPinRaised,
              ]}>
              <Icon name="place" size={44} color={COLORS.PRIMARY} />
            </View>
            <View style={styles.centerPinShadow} />
          </View>

          <View style={styles.searchWrap} pointerEvents="box-none">
            <Icon
              name="search"
              size={22}
              color={COLORS.PRIMARY}
              style={styles.searchIcon}
            />
            <GooglePlacesAutocomplete
              placeholder={t('CONFIRM_LOCATION_SCREEN.SEARCH_PLACEHOLDER')}
              fetchDetails
              enablePoweredByContainer={false}
              debounce={300}
              keyboardShouldPersistTaps="handled"
              onPress={handlePlaceSelect}
              query={{
                key: apiKey,
                language: 'en',
                components: 'country:in',
              }}
              textInputProps={{
                placeholderTextColor: COLORS.GRAY_LIGHT,
                returnKeyType: 'search',
              }}
              styles={{
                container: styles.placesContainer,
                textInput: styles.placesInput,
                listView: styles.placesList,
                row: styles.placesRow,
                description: styles.placesDescription,
              }}
            />
          </View>

          <Pressable
            style={styles.currentLocationButton}
            onPress={handleGoToCurrentLocation}>
            <Icon name="my-location" size={18} color={COLORS.PRIMARY} />
            <StyledText
              color={COLORS.PRIMARY}
              size={14}
              textStyle={styles.currentLocationLabel}>
              {t('CONFIRM_LOCATION_SCREEN.GO_TO_CURRENT')}
            </StyledText>
          </Pressable>
        </View>

        <View style={styles.bottomCard}>
          <View style={styles.addressRow}>
            <Icon name="place" size={24} color={COLORS.PRIMARY} />
            <View style={styles.addressTextWrap}>
              {isFetchingAddress ? (
                <View style={styles.fetchingRow}>
                  <ActivityIndicator size="small" color={COLORS.PRIMARY} />
                  <StyledText
                    color={COLORS.GRAY}
                    size={14}
                    textStyle={styles.fetchingLabel}>
                    {t('CONFIRM_LOCATION_SCREEN.FETCHING_ADDRESS')}
                  </StyledText>
                </View>
              ) : (
                <>
                  <StyledText
                    color={COLORS.BLACK}
                    size={18}
                    textStyle={styles.addressTitle}>
                    {selectedLocation.title}
                  </StyledText>
                  <StyledText color={COLORS.GRAY} size={13} lineHeight={18}>
                    {selectedLocation.address}
                  </StyledText>
                </>
              )}
            </View>
          </View>

          <Button
            title={t('CONFIRM_LOCATION_SCREEN.CONFIRM')}
            onPress={handleConfirm}
            style={styles.confirmButton}
            disabled={isFetchingAddress || isMapMoving}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ConfirmLocationScreen;
