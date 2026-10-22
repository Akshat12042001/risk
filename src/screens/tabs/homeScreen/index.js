import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Icon, StyledText} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import {makeGetAddressesRequest} from '../../../api/common';
import {NavigationService} from '../../../services';
import ComingSoonBanner from './components/ComingSoonBanner';
import ServiceCard from './components/ServiceCard';
import {LOCATION, SERVICES} from './data';
import styles from './styles';

const HomeScreen = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const isServiceable = LOCATION.isServiceable;
  const [selectedAddress, setSelectedAddress] = useState(null);

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

      return () => {
        isActive = false;
      };
    }, []),
  );

  const handleNotify = useCallback(() => {
    // Notify via WhatsApp will be wired later
  }, []);

  const handleChangeLocation = useCallback(() => {
    // Location picker will be wired later
  }, []);

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
        {!isServiceable ? (
          <ComingSoonBanner
            onNotify={handleNotify}
            onChangeLocation={handleChangeLocation}
          />
        ) : null}

        <View style={styles.servicesSection}>
          {!isServiceable ? (
            <StyledText
              color={COLORS.BLACK}
              size={20}
              textStyle={styles.sectionTitle}>
              {t('HOME_SCREEN.SERVICES_TITLE')}
            </StyledText>
          ) : null}

          <View style={styles.grid}>
            {SERVICES.map(item => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
