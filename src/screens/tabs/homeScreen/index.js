import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Icon, StyledText} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import {makeGetAddressesRequest} from '../../../api/common';
import {useGetHomeQuery} from '../../../redux/api/homeApi';
import {NavigationService} from '../../../services';
import ServiceCard from './components/ServiceCard';
import ServiceCardSkeleton from './components/ServiceCardSkeleton';
import styles from './styles';

const SKELETON_COUNT = 6;

const HomeScreen = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const {
    data: services = [],
    isLoading: isHomeLoading,
    refetch: refetchHome,
  } = useGetHomeQuery();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadSelectedAddress = async () => {
        try {
          const response = await makeGetAddressesRequest();
          const addresses = response?.data?.addresses || [];
          const current = addresses.find(address => address.isSelected) || null;
          if (isActive) {
            setSelectedAddress(current);
          }
        } catch (error) {
          if (isActive) {
            setSelectedAddress(null);
          }
        }
      };

      loadSelectedAddress();
      refetchHome();

      return () => {
        isActive = false;
      };
    }, [refetchHome]),
  );

  const handleProfilePress = useCallback(() => {
    NavigationService.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.PROFILE_SCREEN,
    });
  }, []);

  const handleLocationPress = useCallback(() => {
    if (!selectedAddress) {
      NavigationService.navigate(NAVIGATION.STACKS.COMMON, {
        screen: NAVIGATION.COMMON.CONFIRM_LOCATION_SCREEN,
        initial: false,
      });
      return;
    }

    NavigationService.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.ADD_ADDRESS_DETAIL_SCREEN,
      params: {editingAddress: selectedAddress},
      initial: false,
    });
  }, [selectedAddress]);

  const handleServicePress = useCallback(serviceId => {
    NavigationService.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.SERVICE_DETAIL_SCREEN,
      params: {serviceId},
    });
  }, []);

  return (
    <View style={styles.root}>
      <View style={[styles.header, {paddingTop: insets.top + 10}]}>
        <Pressable
          style={styles.locationBlock}
          onPress={handleLocationPress}
          hitSlop={4}>
          <View style={styles.locationTitleRow}>
            <StyledText
              color={COLORS.WHITE}
              size={20}
              textStyle={styles.locationTitle}>
              {selectedAddress
                ? selectedAddress.flatOrHouseNo || selectedAddress.label
                : t('HOME_SCREEN.ADD_LOCATION')}
            </StyledText>
            {selectedAddress ? (
              <Icon name="keyboard-arrow-down" size={22} color={COLORS.WHITE} />
            ) : null}
          </View>
          {selectedAddress ? (
            <StyledText
              color={COLORS.WHITE}
              size={12}
              numberOfLines={1}
              textStyle={styles.locationAddress}>
              {selectedAddress.displayAddress || selectedAddress.area}
            </StyledText>
          ) : null}
        </Pressable>

        <Pressable
          style={styles.profileButton}
          onPress={handleProfilePress}
          hitSlop={8}>
          <Icon name="person" size={24} color={COLORS.BLACK} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}>
        <View style={styles.servicesSection}>
          <View style={styles.grid}>
            {isHomeLoading
              ? Array.from({length: SKELETON_COUNT}).map((_, index) => (
                  <ServiceCardSkeleton key={`skeleton-${index}`} />
                ))
              : services.map(item => (
                  <ServiceCard
                    key={item.id}
                    item={item}
                    onPress={() => handleServicePress(item.id)}
                  />
                ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
