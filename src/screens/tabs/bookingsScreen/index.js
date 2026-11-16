import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Icon, StyledText} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import {makeGetBookingsRequest} from '../../../api/bookings';
import {NavigationService} from '../../../services';
import {errorToast} from '../../../utils/alerts';
import styles from './styles';

const TABS = {
  UPCOMING: 'upcoming',
  PREVIOUS: 'previous',
};

const BookingsScreen = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(TABS.UPCOMING);
  const [bookings, setBookings] = useState([]);
  const [emptyTitle, setEmptyTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadBookings = useCallback(async tab => {
    setIsLoading(true);
    try {
      const response = await makeGetBookingsRequest({tab});
      const data = response?.data || {};
      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      setEmptyTitle(data.emptyState?.title || null);
    } catch (error) {
      setBookings([]);
      if (!error?.response?.data?.message) {
        errorToast('Unable to load bookings');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBookings(activeTab);
    }, [activeTab, loadBookings]),
  );

  const handleHelp = useCallback(() => {
    // Help flow will be wired later
  }, []);

  const handleTabChange = useCallback(tab => {
    setActiveTab(tab);
  }, []);

  const handleOpenBooking = useCallback(bookingId => {
    NavigationService.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.BOOKING_DETAIL_SCREEN,
      params: {bookingId},
    });
  }, []);

  const renderBooking = useCallback(
    ({item}) => (
      <Pressable
        style={styles.bookingCard}
        onPress={() => handleOpenBooking(item.id)}>
        {item.imageUrl ? (
          <Image
            source={{uri: item.imageUrl}}
            style={styles.bookingThumb}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.bookingThumb, styles.bookingThumbFallback]}>
            <Icon name="person" size={20} color={COLORS.PRIMARY} />
          </View>
        )}

        <View style={styles.bookingInfo}>
          <StyledText
            color={COLORS.BLACK}
            size={15}
            numberOfLines={1}
            textStyle={styles.bookingTitle}>
            {item.receiverName || 'Guest'}
          </StyledText>
          <StyledText color={COLORS.GRAY} size={12} numberOfLines={1}>
            {item.bookingNumber}
          </StyledText>
          {item.scheduledFor ? (
            <StyledText
              color={COLORS.GRAY}
              size={13}
              numberOfLines={1}
              textStyle={styles.bookingSchedule}>
              {item.scheduledFor}
            </StyledText>
          ) : null}
          <View style={styles.bookingMetaRow}>
            <StyledText color={COLORS.GRAY} size={12}>
              {item.serviceCountLabel}
            </StyledText>
            <StyledText
              color={COLORS.BLACK}
              size={13}
              textStyle={styles.bookingAmount}>
              {item.toPayLabel || `₹${Number(item.toPay || 0).toFixed(2)}`}
            </StyledText>
          </View>
        </View>

        <Icon
          name="chevron-right"
          size={20}
          color={COLORS.GRAY_LIGHT}
          style={styles.bookingChevron}
        />
      </Pressable>
    ),
    [handleOpenBooking],
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />

      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <StyledText color={COLORS.BLACK} size={28} textStyle={styles.title}>
          {t('BOOKINGS_SCREEN.TITLE')}
        </StyledText>

        <Pressable style={styles.helpButton} onPress={handleHelp} hitSlop={8}>
          <Icon name="support-agent" size={18} color={COLORS.BLACK} />
          <StyledText
            color={COLORS.BLACK}
            size={14}
            textStyle={styles.helpLabel}>
            {t('BOOKINGS_SCREEN.HELP')}
          </StyledText>
        </Pressable>
      </View>

      <View style={styles.divider} />

      <View style={styles.segmentWrap}>
        <View style={styles.segment}>
          <Pressable
            style={[
              styles.segmentItem,
              activeTab === TABS.UPCOMING && styles.segmentItemActive,
            ]}
            onPress={() => handleTabChange(TABS.UPCOMING)}>
            <StyledText
              color={
                activeTab === TABS.UPCOMING ? COLORS.WHITE : COLORS.BLACK
              }
              size={15}
              textStyle={styles.segmentLabel}>
              {t('BOOKINGS_SCREEN.UPCOMING')}
            </StyledText>
          </Pressable>

          <Pressable
            style={[
              styles.segmentItem,
              activeTab === TABS.PREVIOUS && styles.segmentItemActive,
            ]}
            onPress={() => handleTabChange(TABS.PREVIOUS)}>
            <StyledText
              color={
                activeTab === TABS.PREVIOUS ? COLORS.WHITE : COLORS.BLACK
              }
              size={15}
              textStyle={styles.segmentLabel}>
              {t('BOOKINGS_SCREEN.PREVIOUS')}
            </StyledText>
          </Pressable>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.content}>
          <ActivityIndicator size="small" color={COLORS.PRIMARY} />
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.content}>
          <View style={styles.emptyIllustration}>
            <View style={styles.calendarBinders}>
              <View style={styles.binder} />
              <View style={styles.binder} />
              <View style={styles.binder} />
            </View>
            <View style={styles.calendarBody}>
              <View style={styles.calendarPage}>
                <View style={styles.calendarGrid}>
                  {Array.from({length: 12}).map((_, index) => (
                    <View key={`dot-${index}`} style={styles.calendarDot} />
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.checkBadge}>
              <Icon name="check" size={16} color={COLORS.BLACK} />
            </View>
          </View>

          <StyledText
            color={COLORS.GRAY_LIGHT}
            size={16}
            textAlign="center"
            textStyle={styles.emptyText}>
            {emptyTitle || t('BOOKINGS_SCREEN.EMPTY')}
          </StyledText>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={item => String(item.id)}
          renderItem={renderBooking}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default BookingsScreen;
