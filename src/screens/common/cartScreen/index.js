import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  Header,
  Icon,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import {
  makeEditAddressRequest,
  makeGetAddressesRequest,
} from '../../../api/common';
import {
  fetchCart,
  placeBooking,
  removeCoupon,
  stepCartItemDuration,
  updateCartBooking,
} from '../../../redux/cart/cart.actions';
import {
  selectCartCount,
  selectCartData,
  selectCartItems,
} from '../../../redux/cart/cart.reducer';
import {errorToast, successToast} from '../../../utils/alerts';
import EditReceiverModal from './components/EditReceiverModal';
import GstInfoModal from './components/GstInfoModal';
import ScheduleSlotModal from './components/ScheduleSlotModal';
import styles from './styles';

const formatReceiverPhone = phone => {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) {
    return '';
  }
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return `+91 ${local}`;
};

const CartScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartData);
  const items = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);

  const [isLoading, setIsLoading] = useState(true);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isReceiverOpen, setIsReceiverOpen] = useState(false);
  const [isGstInfoOpen, setIsGstInfoOpen] = useState(false);
  const [isSavingReceiver, setIsSavingReceiver] = useState(false);
  const [isBillExpanded, setIsBillExpanded] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [busyItemId, setBusyItemId] = useState(null);
  const [isRemovingCoupon, setIsRemovingCoupon] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const booking = cart?.booking || {};
  const bill = cart?.bill || {};
  const appliedCoupon = cart?.appliedCoupon || null;
  const hasLocation = Boolean(booking?.location?.displayAddress);
  const hasSlot = Boolean(booking?.scheduledFor || booking?.slot?.id);
  const locationText = booking?.location?.displayAddress || '';
  const receiverName =
    booking?.contact?.name || selectedAddress?.receiverName || '';
  const receiverPhoneDisplay = formatReceiverPhone(
    booking?.contact?.phone || selectedAddress?.receiverPhone,
  );

  const professionalFee = bill.professionalServiceFee ?? 5;
  const itemTotal = bill.itemTotal ?? 0;
  const surcharge = bill.slotCharge ?? 0;
  const gstOnItemTotal = Math.round(itemTotal * 0.05 * 100) / 100;
  const gstOnProfessionalFee = Math.round(professionalFee * 0.05 * 100) / 100;
  const gstOnSlotCharge = Math.round(surcharge * 0.05 * 100) / 100;
  const gst = bill.taxesAndFee ?? 0;
  const toPay = bill.toPay ?? 0;

  const billLines = useMemo(() => {
    if (Array.isArray(bill.lines) && bill.lines.length) {
      return bill.lines.filter(
        line => !(line.key === 'slotCharge' && !line.amount),
      );
    }
    return [];
  }, [bill.lines]);

  const loadCartScreen = useCallback(async () => {
    setIsLoading(true);
    try {
      const [cartData, addressResponse] = await Promise.all([
        dispatch(fetchCart()),
        makeGetAddressesRequest().catch(() => null),
      ]);

      const addresses = addressResponse?.data?.addresses || [];
      const current = addresses.find(address => address.isSelected) || null;
      setSelectedAddress(current);

      if (current?.id && !cartData?.booking?.location?.id) {
        await dispatch(updateCartBooking({addressId: current.id}));
      }
    } catch (error) {
      errorToast(error?.response?.data?.message || 'Unable to load cart');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      loadCartScreen();
    }, [loadCartScreen]),
  );

  const handleStepDuration = useCallback(
    async (item, direction) => {
      if (busyItemId) {
        return;
      }
      try {
        setBusyItemId(item.id);
        await dispatch(
          stepCartItemDuration({
            item: {
              id: item.id,
              serviceId: item.serviceId,
              durationId: item.durationId,
              minutes: item.minutes,
            },
            direction,
          }),
        );
      } catch (error) {
        // API client already toasts response messages
        if (!error?.response?.data?.message) {
          errorToast(error?.message || 'Unable to update cart');
        }
      } finally {
        setBusyItemId(null);
      }
    },
    [busyItemId, dispatch],
  );

  const handleAddMore = useCallback(() => {
    navigation.navigate(NAVIGATION.STACKS.TABS, {
      screen: NAVIGATION.TABS.HOME_SCREEN,
    });
  }, [navigation]);

  const handleOpenSchedule = useCallback(() => {
    if (!hasLocation) {
      return;
    }
    setIsScheduleOpen(true);
  }, [hasLocation]);

  const handleConfirmSlot = useCallback(
    async slot => {
      try {
        const payload = {
          slotDate: slot.dateId,
          slotId: slot.slotId,
        };
        if (selectedAddress?.id || booking?.location?.id) {
          payload.addressId = selectedAddress?.id || booking.location.id;
        }
        await dispatch(updateCartBooking(payload));
        setIsScheduleOpen(false);
      } catch (error) {
        errorToast(error?.response?.data?.message || 'Unable to save slot');
      }
    },
    [booking?.location?.id, dispatch, selectedAddress?.id],
  );

  const handleCoupons = useCallback(() => {
    if (!hasSlot || !hasLocation) {
      return;
    }
    navigation.navigate(NAVIGATION.COMMON.COUPON_SCREEN);
  }, [hasLocation, hasSlot, navigation]);

  const handleRemoveCoupon = useCallback(async () => {
    if (isRemovingCoupon) {
      return;
    }
    try {
      setIsRemovingCoupon(true);
      await dispatch(removeCoupon());
      successToast('Coupon removed');
    } catch (error) {
      if (!error?.response?.data?.message) {
        errorToast(error?.message || 'Unable to remove coupon');
      }
    } finally {
      setIsRemovingCoupon(false);
    }
  }, [dispatch, isRemovingCoupon]);

  const handlePay = useCallback(async () => {
    if (!hasLocation) {
      navigation.navigate(NAVIGATION.COMMON.MY_ADDRESSES_SCREEN);
      return;
    }
    if (!hasSlot) {
      setIsScheduleOpen(true);
      return;
    }
    if (isPlacingOrder) {
      return;
    }

    try {
      setIsPlacingOrder(true);
      const booking = await dispatch(placeBooking());
      successToast(
        booking?.bookingNumber
          ? `Booking confirmed · ${booking.bookingNumber}`
          : 'Booking confirmed',
      );
      navigation.navigate(NAVIGATION.STACKS.TABS, {
        screen: NAVIGATION.TABS.BOOKINGS_SCREEN,
      });
    } catch (error) {
      if (!error?.response?.data?.message) {
        errorToast(error?.message || 'Unable to place booking');
      }
    } finally {
      setIsPlacingOrder(false);
    }
  }, [dispatch, hasLocation, hasSlot, isPlacingOrder, navigation]);

  const handleLocation = useCallback(() => {
    navigation.navigate(NAVIGATION.COMMON.MY_ADDRESSES_SCREEN);
  }, [navigation]);

  const handleOpenReceiver = useCallback(() => {
    const addressId = booking?.location?.id || selectedAddress?.id;
    if (!addressId) {
      navigation.navigate(NAVIGATION.COMMON.MY_ADDRESSES_SCREEN);
      return;
    }
    setIsReceiverOpen(true);
  }, [booking?.location?.id, navigation, selectedAddress?.id]);

  const handleSaveReceiver = useCallback(
    async nextContact => {
      const addressId = booking?.location?.id || selectedAddress?.id;
      if (!addressId || isSavingReceiver) {
        return;
      }

      const nextPhone = String(nextContact.phone || '')
        .replace(/\D/g, '')
        .slice(-10);

      try {
        setIsSavingReceiver(true);
        await makeEditAddressRequest(addressId, {
          receiverName: nextContact.name.trim(),
          receiverPhone: nextPhone,
        });
        await dispatch(fetchCart());
        setSelectedAddress(prev =>
          prev
            ? {
                ...prev,
                receiverName: nextContact.name.trim(),
                receiverPhone: nextPhone,
              }
            : prev,
        );
        setIsReceiverOpen(false);
      } catch (error) {
        errorToast(
          error?.response?.data?.message || 'Unable to update receiver',
        );
      } finally {
        setIsSavingReceiver(false);
      }
    },
    [booking?.location?.id, dispatch, isSavingReceiver, selectedAddress?.id],
  );

  if (isLoading && !cart) {
    return (
      <ScreenContainer noPaddingBottom noPaddingTop>
        <View style={styles.root}>
          <Header title="My Cart" />
          <View style={styles.emptyWrap}>
            <ActivityIndicator color={COLORS.PRIMARY} />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  if (!cartCount) {
    return (
      <ScreenContainer noPaddingBottom noPaddingTop>
        <View style={styles.root}>
          <Header title="My Cart" />
          <View style={styles.emptyWrap}>
            <StyledText color={COLORS.GRAY} size={15}>
              Your cart is empty
            </StyledText>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer noPaddingBottom noPaddingTop>
      <View style={styles.root}>
        <Header title="My Cart" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <View style={styles.reviewHeader}>
              <StyledText
                color={COLORS.BLACK}
                size={16}
                textStyle={styles.reviewTitle}>
                Review booking
              </StyledText>
              <StyledText color={COLORS.GRAY} size={13}>
                {cart?.serviceCountLabel || `${cartCount} services`}
              </StyledText>
            </View>

            {items.map(item => (
              <View key={item.id || item.serviceId} style={styles.serviceRow}>
                {item.imageUrl ? (
                  <Image
                    source={{uri: item.imageUrl}}
                    style={styles.serviceThumb}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.serviceThumb} />
                )}
                <View style={styles.serviceInfo}>
                  <StyledText
                    color={COLORS.BLACK}
                    size={14}
                    numberOfLines={1}
                    textStyle={styles.serviceName}>
                    {item.name}
                  </StyledText>
                  <View style={styles.priceRow}>
                    {item.originalPrice ? (
                      <StyledText
                        color={COLORS.GRAY_LIGHT}
                        size={12}
                        textStyle={styles.originalPrice}>
                        ₹{item.originalPrice}
                      </StyledText>
                    ) : null}
                    <StyledText
                      color={COLORS.BLACK}
                      size={14}
                      textStyle={styles.price}>
                      ₹{item.price}
                    </StyledText>
                  </View>
                </View>

                <View style={styles.minutesControl}>
                  <Pressable
                    style={styles.minutesButton}
                    onPress={() => handleStepDuration(item, 'decrement')}
                    hitSlop={6}>
                    <Icon name="remove" size={16} color={COLORS.PRIMARY} />
                  </Pressable>
                  <View style={styles.minutesValue}>
                    <StyledText
                      color={COLORS.PRIMARY}
                      size={15}
                      textStyle={styles.minutesNumber}>
                      {item.minutes}
                    </StyledText>
                    <StyledText
                      color={COLORS.PRIMARY}
                      size={10}
                      textStyle={styles.minutesUnit}>
                      {item.unit || 'Minutes'}
                    </StyledText>
                  </View>
                  <Pressable
                    style={styles.minutesButton}
                    onPress={() => handleStepDuration(item, 'increment')}
                    hitSlop={6}>
                    <Icon name="add" size={16} color={COLORS.PRIMARY} />
                  </Pressable>
                </View>
              </View>
            ))}

            {cart?.availabilityNote ? (
              <View style={styles.infoBox}>
                <Icon
                  name="info-outline"
                  size={16}
                  color={COLORS.GRAY}
                  style={styles.infoIcon}
                />
                <StyledText
                  color={COLORS.GRAY}
                  size={12}
                  textStyle={styles.infoText}>
                  {cart.availabilityNote}
                </StyledText>
              </View>
            ) : null}

            <Pressable style={styles.addMoreRow} onPress={handleAddMore}>
              <StyledText color={COLORS.GRAY} size={13}>
                Missed something?{' '}
              </StyledText>
              <StyledText
                color={COLORS.PRIMARY}
                size={13}
                textStyle={styles.addMoreLink}>
                Add more services.
              </StyledText>
            </Pressable>
          </View>

          <Pressable
            style={[
              styles.card,
              styles.couponRow,
              (!hasSlot || !hasLocation) && styles.couponDisabled,
            ]}
            disabled={!hasSlot || !hasLocation}
            onPress={handleCoupons}>
            <View style={styles.couponContent}>
              <Icon
                name="local-offer"
                size={18}
                color={
                  hasSlot && hasLocation ? COLORS.PRIMARY : COLORS.GRAY_LIGHT
                }
                style={styles.couponIcon}
              />
              <View style={styles.couponTextWrap}>
                <StyledText
                  color={
                    hasSlot && hasLocation ? COLORS.BLACK : COLORS.GRAY_LIGHT
                  }
                  size={15}
                  textStyle={styles.couponText}>
                  {appliedCoupon?.code
                    ? appliedCoupon.code
                    : cart?.couponsLabel || 'View all coupons'}
                </StyledText>
                {appliedCoupon?.title ? (
                  <StyledText color={COLORS.PRIMARY} size={12}>
                    {appliedCoupon.title}
                  </StyledText>
                ) : null}
              </View>
            </View>
            {appliedCoupon ? (
              <Pressable
                onPress={event => {
                  event?.stopPropagation?.();
                  handleRemoveCoupon();
                }}
                hitSlop={8}
                disabled={isRemovingCoupon}
                style={styles.couponRemove}>
                {isRemovingCoupon ? (
                  <ActivityIndicator size="small" color={COLORS.PRIMARY} />
                ) : (
                  <StyledText
                    color={COLORS.PRIMARY}
                    size={13}
                    textStyle={styles.couponRemoveText}>
                    Remove
                  </StyledText>
                )}
              </Pressable>
            ) : (
              <Icon
                name="chevron-right"
                size={22}
                color={
                  hasSlot && hasLocation ? COLORS.GRAY : COLORS.GRAY_LIGHT
                }
              />
            )}
          </Pressable>

          <StyledText
            color={COLORS.BLACK}
            size={16}
            textStyle={styles.sectionTitle}>
            Booking details
          </StyledText>

          <View style={styles.card}>
            {hasSlot ? (
              <View style={styles.detailRow}>
                <Icon
                  name="event"
                  size={20}
                  color={COLORS.GRAY}
                  style={styles.detailIcon}
                />
                <View style={styles.detailContent}>
                  <StyledText color={COLORS.GRAY} size={12}>
                    Scheduled for
                  </StyledText>
                  <StyledText
                    color={COLORS.BLACK}
                    size={14}
                    textStyle={styles.detailLabel}>
                    {booking.scheduledFor}
                  </StyledText>
                  <Pressable onPress={handleOpenSchedule}>
                    <StyledText
                      color={COLORS.PRIMARY}
                      size={13}
                      textStyle={styles.changeSlot}>
                      Change slot
                    </StyledText>
                  </Pressable>
                </View>
              </View>
            ) : null}

            <Pressable
              style={[styles.detailRow, hasSlot && styles.detailRowBorder]}
              onPress={handleLocation}>
              <Icon
                name="location-on"
                size={20}
                color={COLORS.GRAY}
                style={styles.detailIcon}
              />
              <View style={styles.detailContent}>
                <StyledText
                  color={COLORS.BLACK}
                  size={14}
                  textStyle={styles.detailLabel}>
                  {booking?.location?.label || 'Location'}
                </StyledText>
                {hasLocation ? (
                  <StyledText
                    color={COLORS.GRAY}
                    size={13}
                    numberOfLines={2}
                    textStyle={styles.detailSub}>
                    {locationText}
                  </StyledText>
                ) : null}
              </View>
              <Icon name="chevron-right" size={22} color={COLORS.GRAY_LIGHT} />
            </Pressable>

            <Pressable
              style={[styles.detailRow, styles.detailRowBorder]}
              onPress={handleOpenReceiver}>
              <Icon
                name="phone"
                size={20}
                color={COLORS.GRAY}
                style={styles.detailIcon}
              />
              <View style={styles.detailContent}>
                <StyledText
                  color={COLORS.BLACK}
                  size={14}
                  textStyle={styles.detailLabel}>
                  {receiverName || 'Add receiver'}
                </StyledText>
                {receiverPhoneDisplay ? (
                  <StyledText color={COLORS.GRAY} size={13}>
                    {receiverPhoneDisplay}
                  </StyledText>
                ) : null}
              </View>
              <Icon name="chevron-right" size={22} color={COLORS.GRAY_LIGHT} />
            </Pressable>
          </View>

          <StyledText
            color={COLORS.BLACK}
            size={16}
            textStyle={styles.sectionTitle}>
            Bill details
          </StyledText>

          <Pressable
            style={styles.card}
            onPress={() => setIsBillExpanded(prev => !prev)}>
            <View style={styles.billCard}>
              <View style={styles.billLeft}>
                <StyledText
                  color={COLORS.BLACK}
                  size={16}
                  textStyle={styles.billAmount}>
                  {bill.toPayLabel || `To pay ₹${toPay.toFixed(2)}`}
                </StyledText>
                {bill.savedLabel ? (
                  <StyledText
                    color="#2563EB"
                    size={13}
                    textStyle={styles.billSaved}>
                    {bill.savedLabel}
                  </StyledText>
                ) : null}
              </View>
              <View style={styles.billChevron}>
                <Icon
                  name={
                    isBillExpanded
                      ? 'keyboard-arrow-up'
                      : 'keyboard-arrow-down'
                  }
                  size={20}
                  color={COLORS.GRAY}
                />
              </View>
            </View>

            {isBillExpanded ? (
              <View style={styles.billExpanded}>
                {billLines.map((line, index) => (
                  <React.Fragment key={line.key || line.label}>
                    {index > 0 ? <View style={styles.billDashed} /> : null}
                    <View style={styles.billLine}>
                      <View style={styles.billLabelRow}>
                        <StyledText color={COLORS.BLACK} size={14}>
                          {line.label}
                        </StyledText>
                        {line.key === 'taxesAndFee' ? (
                          <Pressable
                            onPress={event => {
                              event?.stopPropagation?.();
                              setIsGstInfoOpen(true);
                            }}
                            hitSlop={8}
                            style={styles.billInfoIcon}>
                            <Icon
                              name="info-outline"
                              size={14}
                              color={COLORS.GRAY}
                            />
                          </Pressable>
                        ) : null}
                      </View>
                      <StyledText
                        color={
                          Number(line.amount) < 0
                            ? COLORS.PRIMARY
                            : COLORS.BLACK
                        }
                        size={14}>
                        {Number(line.amount) < 0 ? '-' : ''}₹
                        {Number.isInteger(Math.abs(Number(line.amount)))
                          ? Math.abs(Number(line.amount))
                          : Math.abs(Number(line.amount)).toFixed(2)}
                      </StyledText>
                    </View>
                  </React.Fragment>
                ))}

                <View style={styles.billDashed} />

                <View style={[styles.billLine, styles.billTotalLine]}>
                  <StyledText
                    color={COLORS.BLACK}
                    size={15}
                    textStyle={styles.billTotalLabel}>
                    To pay
                  </StyledText>
                  <StyledText
                    color={COLORS.BLACK}
                    size={15}
                    textStyle={styles.billTotalLabel}>
                    ₹{Number(toPay).toFixed(2)}
                  </StyledText>
                </View>
              </View>
            ) : null}
          </Pressable>
        </ScrollView>

        <View
          style={[
            styles.bottomBar,
            {paddingBottom: Math.max(insets.bottom, 12)},
          ]}>
          {!hasLocation ? (
            <View style={styles.unserviceableRow}>
              <View style={styles.unserviceableIcon}>
                <Icon name="error" size={18} color="#EF4444" />
              </View>
              <View style={styles.unserviceableText}>
                <StyledText
                  color={COLORS.BLACK}
                  size={14}
                  textStyle={styles.unserviceableTitle}>
                  Not serviceable at your location
                </StyledText>
                <StyledText color={COLORS.GRAY} size={12}>
                  The location is out of our serviceable area
                </StyledText>
              </View>
            </View>
          ) : null}

          <Pressable
            style={[
              styles.bottomButton,
              isPlacingOrder && styles.bottomButtonDisabled,
            ]}
            disabled={isPlacingOrder}
            onPress={handlePay}>
            {isPlacingOrder ? (
              <ActivityIndicator size="small" color={COLORS.WHITE} />
            ) : (
              <StyledText
                color={COLORS.WHITE}
                size={16}
                textStyle={styles.bottomButtonText}>
                {!hasLocation
                  ? 'Change location'
                  : hasSlot
                    ? bill.payNowLabel ||
                      `Pay now | ₹${Number(toPay).toFixed(2)}`
                    : 'Select time slot'}
              </StyledText>
            )}
          </Pressable>
        </View>

        <ScheduleSlotModal
          visible={isScheduleOpen}
          initialSelection={
            booking?.slot
              ? {
                  dateId: booking.slotDate,
                  periodId: booking.slot.period,
                  slotId: booking.slot.id,
                }
              : null
          }
          onClose={() => setIsScheduleOpen(false)}
          onConfirm={handleConfirmSlot}
        />

        <EditReceiverModal
          visible={isReceiverOpen}
          initialName={receiverName}
          initialPhone={
            booking?.contact?.phone || selectedAddress?.receiverPhone || ''
          }
          loading={isSavingReceiver}
          onClose={() => setIsReceiverOpen(false)}
          onSave={handleSaveReceiver}
        />

        <GstInfoModal
          visible={isGstInfoOpen}
          gstOnItemTotal={gstOnItemTotal}
          gstOnProfessionalFee={gstOnProfessionalFee}
          gstOnSlotCharge={gstOnSlotCharge}
          totalGst={gst}
          onClose={() => setIsGstInfoOpen(false)}
        />
      </View>
    </ScreenContainer>
  );
};

export default CartScreen;
