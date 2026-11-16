import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Header,
  Icon,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {makeGetBookingRequest} from '../../../api/bookings';
import {errorToast} from '../../../utils/alerts';
import styles from './styles';

const formatPhone = phone => {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) {
    return '';
  }
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return `+91 ${local}`;
};

const formatMoney = amount => {
  const value = Number(amount || 0);
  const abs = Math.abs(value);
  const formatted = Number.isInteger(abs) ? String(abs) : abs.toFixed(2);
  return `${value < 0 ? '-' : ''}₹${formatted}`;
};

const BookingDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const bookingId = route.params?.bookingId;

  const [isLoading, setIsLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  const loadBooking = useCallback(async () => {
    if (!bookingId) {
      errorToast('Booking not found');
      navigation.goBack();
      return;
    }

    setIsLoading(true);
    try {
      const response = await makeGetBookingRequest(bookingId);
      setBooking(response?.data?.booking || null);
    } catch (error) {
      if (!error?.response?.data?.message) {
        errorToast('Unable to load booking');
      }
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  }, [bookingId, navigation]);

  useEffect(() => {
    loadBooking();
  }, [loadBooking]);

  const details = booking?.booking || {};
  const bill = booking?.bill || {};
  const items = Array.isArray(booking?.items) ? booking.items : [];
  const contact = details?.contact || {};
  const location = details?.location || {};
  const appliedCoupon = booking?.appliedCoupon;

  const billLines = useMemo(() => {
    if (Array.isArray(bill.lines) && bill.lines.length) {
      return bill.lines.filter(
        line => !(line.key === 'slotCharge' && !line.amount),
      );
    }
    return [];
  }, [bill.lines]);

  const receiverName = contact?.name || 'Guest';
  const receiverPhone = formatPhone(contact?.phone);
  const statusLabel = booking?.status || 'confirmed';
  const paymentLabel = booking?.paymentStatus || 'paid';

  return (
    <ScreenContainer noPaddingBottom noPaddingTop>
      <View style={styles.root}>
        <Header
          title="Booking details"
          onBack={() => navigation.goBack()}
        />

        {isLoading || !booking ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="small" color={COLORS.PRIMARY} />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.heroCard}>
              <View style={styles.statusRow}>
                <View style={styles.statusBadge}>
                  <StyledText
                    color={COLORS.PRIMARY_DARK}
                    size={12}
                    textStyle={styles.statusText}>
                    {statusLabel}
                  </StyledText>
                </View>
                <View style={[styles.statusBadge, styles.statusBadgePaid]}>
                  <StyledText
                    color="#047857"
                    size={12}
                    textStyle={styles.statusText}>
                    {paymentLabel}
                  </StyledText>
                </View>
              </View>

              <StyledText
                color={COLORS.GRAY}
                size={12}
                textStyle={styles.bookingNumber}>
                {booking.bookingNumber}
              </StyledText>
              <StyledText
                color={COLORS.BLACK}
                size={22}
                textStyle={styles.receiverName}>
                {receiverName}
              </StyledText>
              {details.scheduledFor ? (
                <StyledText
                  color={COLORS.GRAY}
                  size={14}
                  textStyle={styles.scheduleText}>
                  {details.scheduledFor}
                </StyledText>
              ) : null}
              <StyledText color={COLORS.GRAY} size={13} textStyle={styles.scheduleText}>
                {booking.serviceCountLabel}
              </StyledText>
            </View>

            <StyledText
              color={COLORS.BLACK}
              size={16}
              textStyle={styles.sectionTitle}>
              Services
            </StyledText>
            <View style={styles.card}>
              {items.map((item, index) => (
                <View
                  key={`${item.serviceId}-${item.durationId}-${index}`}
                  style={[
                    styles.serviceRow,
                    index > 0 && styles.serviceRowBorder,
                  ]}>
                  {item.imageUrl ? (
                    <Image
                      source={{uri: item.imageUrl}}
                      style={styles.serviceThumb}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={[
                        styles.serviceThumb,
                        styles.serviceThumbFallback,
                      ]}>
                      <Icon
                        name="cleaning-services"
                        size={18}
                        color={COLORS.PRIMARY}
                      />
                    </View>
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
                  <View style={styles.durationBadge}>
                    <StyledText
                      color={COLORS.PRIMARY}
                      size={12}
                      textStyle={styles.durationText}>
                      {item.durationLabel || `${item.minutes} Minutes`}
                    </StyledText>
                  </View>
                </View>
              ))}
            </View>

            <StyledText
              color={COLORS.BLACK}
              size={16}
              textStyle={styles.sectionTitle}>
              Booking details
            </StyledText>
            <View style={styles.card}>
              {details.scheduledFor ? (
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
                      {details.scheduledFor}
                    </StyledText>
                  </View>
                </View>
              ) : null}

              {location.displayAddress ? (
                <View
                  style={[
                    styles.detailRow,
                    details.scheduledFor && styles.detailRowBorder,
                  ]}>
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
                      {location.label || 'Location'}
                    </StyledText>
                    <StyledText
                      color={COLORS.GRAY}
                      size={13}
                      textStyle={styles.detailSub}>
                      {location.displayAddress}
                    </StyledText>
                  </View>
                </View>
              ) : null}

              <View
                style={[
                  styles.detailRow,
                  (details.scheduledFor || location.displayAddress) &&
                    styles.detailRowBorder,
                ]}>
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
                    {receiverName}
                  </StyledText>
                  {receiverPhone ? (
                    <StyledText color={COLORS.GRAY} size={13}>
                      {receiverPhone}
                    </StyledText>
                  ) : null}
                </View>
              </View>
            </View>

            {appliedCoupon?.code ? (
              <>
                <StyledText
                  color={COLORS.BLACK}
                  size={16}
                  textStyle={styles.sectionTitle}>
                  Coupon
                </StyledText>
                <View style={styles.card}>
                  <View style={styles.couponRow}>
                    <View style={styles.couponBadge}>
                      <StyledText
                        color={COLORS.PRIMARY}
                        size={13}
                        textStyle={styles.couponCode}>
                        {appliedCoupon.code}
                      </StyledText>
                    </View>
                    <StyledText color={COLORS.BLACK} size={14}>
                      {appliedCoupon.title || 'Coupon applied'}
                    </StyledText>
                  </View>
                </View>
              </>
            ) : null}

            <StyledText
              color={COLORS.BLACK}
              size={16}
              textStyle={styles.sectionTitle}>
              Bill details
            </StyledText>
            <View style={styles.card}>
              <View style={styles.billHeader}>
                <View>
                  <StyledText
                    color={COLORS.BLACK}
                    size={16}
                    textStyle={styles.billAmount}>
                    {bill.toPayLabel || `To pay ${formatMoney(bill.toPay)}`}
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
              </View>

              {billLines.map((line, index) => (
                <React.Fragment key={line.key || line.label}>
                  {index > 0 ? <View style={styles.billDashed} /> : null}
                  <View style={styles.billLine}>
                    <StyledText color={COLORS.BLACK} size={14}>
                      {line.label}
                    </StyledText>
                    <StyledText
                      color={
                        Number(line.amount) < 0
                          ? COLORS.PRIMARY
                          : COLORS.BLACK
                      }
                      size={14}>
                      {formatMoney(line.amount)}
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
                  {formatMoney(bill.toPay)}
                </StyledText>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </ScreenContainer>
  );
};

export default BookingDetailScreen;
