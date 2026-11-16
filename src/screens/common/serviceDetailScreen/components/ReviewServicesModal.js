import React, {useCallback, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import {stepCartItemDuration} from '../../../../redux/cart/cart.actions';
import {selectCartItems} from '../../../../redux/cart/cart.reducer';
import {errorToast} from '../../../../utils/alerts';
import CartBar from './CartBar';
import styles from '../styles';

const ReviewServicesModal = ({visible, onClose, onGoToCart}) => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = items.length;
  const [busyItemId, setBusyItemId] = useState(null);

  const handleDecrement = useCallback(
    async item => {
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
            direction: 'decrement',
          }),
        );
      } catch (error) {
        if (!error?.response?.data?.message) {
          errorToast(error?.message || 'Unable to update cart');
        }
      } finally {
        setBusyItemId(null);
      }
    },
    [busyItemId, dispatch],
  );

  const handleIncrement = useCallback(
    async item => {
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
            direction: 'increment',
          }),
        );
      } catch (error) {
        if (!error?.response?.data?.message) {
          errorToast(error?.message || 'Unable to update cart');
        }
      } finally {
        setBusyItemId(null);
      }
    },
    [busyItemId, dispatch],
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.reviewRoot}>
        <Pressable style={styles.reviewBackdrop} onPress={onClose} />

        <View style={styles.reviewSheet}>
          <View style={styles.reviewHeader}>
            <StyledText
              color={COLORS.BLACK}
              size={20}
              textStyle={styles.reviewTitle}>
              Review Services
            </StyledText>
            <Pressable
              style={styles.reviewClose}
              onPress={onClose}
              hitSlop={8}>
              <Icon name="close" size={18} color={COLORS.GRAY} />
            </Pressable>
          </View>

          <View style={styles.reviewCard}>
            <View style={styles.reviewCardHeader}>
              <StyledText
                color={COLORS.BLACK}
                size={16}
                textStyle={styles.reviewCardTitle}>
                Scheduled booking
              </StyledText>
              <StyledText color={COLORS.GRAY} size={13}>
                {count} services
              </StyledText>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.reviewList}>
              {items.map(item => (
                <View key={item.id || item.serviceId} style={styles.reviewItem}>
                  {item.imageUrl ? (
                    <Image
                      source={{uri: item.imageUrl}}
                      style={styles.reviewThumb}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={[styles.reviewThumb, styles.cartThumbFallback]}>
                      <Icon
                        name="cleaning-services"
                        size={18}
                        color={COLORS.PRIMARY}
                      />
                    </View>
                  )}

                  <View style={styles.reviewItemInfo}>
                    <StyledText
                      color={COLORS.BLACK}
                      size={14}
                      numberOfLines={1}
                      textStyle={styles.reviewItemName}>
                      {item.name}
                    </StyledText>
                    <View style={styles.reviewPriceRow}>
                      {item.originalPrice ? (
                        <StyledText
                          color={COLORS.GRAY_LIGHT}
                          size={12}
                          textStyle={styles.reviewOriginalPrice}>
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
                      onPress={() => handleDecrement(item)}
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
                      onPress={() => handleIncrement(item)}
                      hitSlop={6}>
                      <Icon name="add" size={16} color={COLORS.PRIMARY} />
                    </Pressable>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {count > 0 ? (
          <CartBar
            count={count}
            imageUrl={items[0]?.imageUrl}
            expanded
            onPressSummary={onClose}
            onGoToCart={onGoToCart}
          />
        ) : null}
      </View>
    </Modal>
  );
};

export default React.memo(ReviewServicesModal);
