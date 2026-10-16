import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Config from 'react-native-config';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  Button,
  Header,
  Icon,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import {errorToast} from '../../../utils/alerts';
import {
  getAddressFromCoords,
  getPlaceDetails,
  searchPlaces,
} from '../../../utils/location';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

  const apiKey =
    Config.GOOGLE_MAPS_API_KEY || 'AIzaSyBteSXgeCh5tcLGtCGTAH762pkqvdnaDzk';

  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [pinCoordinate, setPinCoordinate] = useState(DEFAULT_COORDINATE);
  const [mapSize, setMapSize] = useState(null);
  const [isMapMoving, setIsMapMoving] = useState(false);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [isSearchingPlaces, setIsSearchingPlaces] = useState(false);
  const searchRequestId = useRef(0);
  const skipSearchRef = useRef(false);

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

  const handleRegionChange = useCallback(region => {
    setIsMapMoving(true);
    setPinCoordinate({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  }, []);

  const handleRegionChangeComplete = useCallback(
    region => {
      setIsMapMoving(false);
      setPinCoordinate({
        latitude: region.latitude,
        longitude: region.longitude,
      });

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
      setPinCoordinate({latitude, longitude});
      animateTo(latitude, longitude, {skipGeocode: true});
      reverseGeocode(latitude, longitude);
    },
    [animateTo, reverseGeocode],
  );

  useEffect(() => {
    if (skipSearchRef.current) {
      skipSearchRef.current = false;
      setPlaceSuggestions([]);
      setIsSearchingPlaces(false);
      return;
    }

    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length < 2) {
      setPlaceSuggestions([]);
      setIsSearchingPlaces(false);
      return;
    }

    const requestId = ++searchRequestId.current;
    const timer = setTimeout(async () => {
      try {
        setIsSearchingPlaces(true);
        const results = await searchPlaces(trimmedQuery, apiKey);
        if (requestId !== searchRequestId.current) {
          return;
        }
        setPlaceSuggestions(results);
      } catch (error) {
        if (requestId !== searchRequestId.current) {
          return;
        }
        setPlaceSuggestions([]);
        errorToast(error.message || t('CONFIRM_LOCATION_SCREEN.LOCATION_ERROR'));
      } finally {
        if (requestId === searchRequestId.current) {
          setIsSearchingPlaces(false);
        }
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [apiKey, searchQuery, t]);

  const handlePlaceSelect = useCallback(
    async place => {
      Keyboard.dismiss();
      skipSearchRef.current = true;
      searchRequestId.current += 1;
      setPlaceSuggestions([]);
      setIsSearchingPlaces(false);
      setSearchQuery(place.mainText || place.description);

      try {
        const details = await getPlaceDetails(place.placeId, apiKey);
        if (!details?.latitude || !details?.longitude) {
          return;
        }

        setSelectedLocation({
          title:
            details.title ||
            place.mainText ||
            t('CONFIRM_LOCATION_SCREEN.SELECTED_LOCATION'),
          address: details.address || place.description || '',
          latitude: details.latitude,
          longitude: details.longitude,
        });
        setPinCoordinate({
          latitude: details.latitude,
          longitude: details.longitude,
        });
        animateTo(details.latitude, details.longitude, {skipGeocode: true});
      } catch (error) {
        errorToast(error.message || t('CONFIRM_LOCATION_SCREEN.LOCATION_ERROR'));
      }
    },
    [animateTo, apiKey, t],
  );

  const renderPlaceSuggestion = useCallback(
    ({item}) => (
      <Pressable
        style={styles.placesRow}
        onPress={() => handlePlaceSelect(item)}>
        <StyledText color={COLORS.BLACK} size={14} numberOfLines={2}>
          {item.description}
        </StyledText>
      </Pressable>
    ),
    [handlePlaceSelect],
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
        setPinCoordinate({latitude, longitude});
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

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setPlaceSuggestions([]);
    setIsSearchingPlaces(false);
  }, []);

  const handleConfirm = useCallback(() => {
    navigation.navigate(NAVIGATION.COMMON.ADD_ADDRESS_DETAIL_SCREEN, {
      address: selectedLocation.address,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
  }, [navigation, selectedLocation]);

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
              onRegionChangeComplete={handleRegionChangeComplete}>
              <Marker
                coordinate={pinCoordinate}
                pinColor={COLORS.PRIMARY}
                tracksViewChanges={false}
              />
            </MapView>
          ) : null}

          <View style={styles.searchWrap} pointerEvents="box-none">
            <Icon
              name="search"
              size={22}
              color={COLORS.PRIMARY}
              style={styles.searchIcon}
            />
            <View style={styles.placesContainer}>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={t('CONFIRM_LOCATION_SCREEN.SEARCH_PLACEHOLDER')}
                placeholderTextColor={COLORS.GRAY_LIGHT}
                returnKeyType="search"
                style={styles.placesInput}
              />
              {isSearchingPlaces ? (
                <View style={styles.placesLoading}>
                  <ActivityIndicator size="small" color={COLORS.PRIMARY} />
                </View>
              ) : searchQuery.length > 0 ? (
                <Pressable
                  style={styles.clearButton}
                  onPress={handleClearSearch}
                  hitSlop={8}>
                  <Icon name="close" size={20} color={COLORS.GRAY} />
                </Pressable>
              ) : null}
              {placeSuggestions.length > 0 ? (
                <FlatList
                  data={placeSuggestions}
                  keyExtractor={item => item.placeId}
                  renderItem={renderPlaceSuggestion}
                  keyboardShouldPersistTaps="handled"
                  style={styles.placesList}
                />
              ) : null}
            </View>
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
