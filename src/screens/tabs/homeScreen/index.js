import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, StyledText} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import {makeGetAddressesRequest} from '../../../api/common';
import {useGetHomeQuery} from '../../../redux/api/homeApi';
import {fetchCart} from '../../../redux/cart/cart.actions';
import {
  selectCartCount,
  selectCartData,
  selectCartItems,
} from '../../../redux/cart/cart.reducer';
import {NavigationService} from '../../../services';
import ReviewServicesModal from '../../common/serviceDetailScreen/components/ReviewServicesModal';
import HomeCartBar from './components/HomeCartBar';
import ServiceCard from './components/ServiceCard';
import ServiceCardSkeleton from './components/ServiceCardSkeleton';
import styles from './styles';

const SKELETON_COUNT = 6;

const HomeScreen = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartData);
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const {
    data: services = [],
    isLoading: isHomeLoading,
    refetch: refetchHome,
  } = useGetHomeQuery();

  const firstCartItem = cartItems[0];
  const cartServiceName =
    cartCount === 1
      ? firstCartItem?.name || ''
      : cartCount > 1
        ? `${firstCartItem?.name || 'Service'} +${cartCount - 1}`
        : '';

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
      dispatch(fetchCart()).catch(() => {});
      refetchHome();

      return () => {
        isActive = false;
      };
    }, [dispatch, refetchHome]),
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

  const handleOpenReview = useCallback(() => {
    setIsReviewOpen(true);
  }, []);

  const handleCloseReview = useCallback(() => {
    setIsReviewOpen(false);
  }, []);

  const handleGoToCart = useCallback(() => {
    setIsReviewOpen(false);
    NavigationService.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.CART_SCREEN,
    });
  }, []);

  useEffect(() => {
    if (cartCount === 0 && isReviewOpen) {
      setIsReviewOpen(false);
    }
  }, [cartCount, isReviewOpen]);

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
        contentContainerStyle={[
          styles.listContent,
          cartCount > 0 && styles.listContentWithCart,
        ]}>
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

      {cartCount > 0 && !isReviewOpen ? (
        <HomeCartBar
          count={cartCount}
          countLabel={cart?.serviceCountLabel}
          serviceName={cartServiceName}
          imageUrl={firstCartItem?.imageUrl}
          onPressSummary={handleOpenReview}
          onGoToCart={handleGoToCart}
        />
      ) : null}

      <ReviewServicesModal
        visible={isReviewOpen && cartCount > 0}
        onClose={handleCloseReview}
        onGoToCart={handleGoToCart}
      />
    </View>
  );
};

export default HomeScreen;
