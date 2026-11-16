import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Header,
  Icon,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {makeGetCouponsRequest} from '../../../api/coupons';
import {applyCoupon} from '../../../redux/cart/cart.actions';
import {selectCartData} from '../../../redux/cart/cart.reducer';
import {errorToast, successToast} from '../../../utils/alerts';
import styles from './styles';

const CouponScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartData);
  const appliedCode = cart?.appliedCoupon?.code || '';

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [applyingCode, setApplyingCode] = useState('');
  const [placeholder, setPlaceholder] = useState('Type coupon code here');
  const [applyLabel, setApplyLabel] = useState('Apply');
  const [sectionTitle, setSectionTitle] = useState('Available coupons');
  const [coupons, setCoupons] = useState([]);
  const [emptyState, setEmptyState] = useState(null);

  const canApply = code.trim().length > 0 && !isApplying;

  const loadCoupons = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await makeGetCouponsRequest();
      const data = response?.data || {};
      setPlaceholder(data.placeholder || 'Type coupon code here');
      setApplyLabel(data.applyLabel || 'Apply');
      setSectionTitle(data.sectionTitle || 'Available coupons');
      setCoupons(Array.isArray(data.coupons) ? data.coupons : []);
      setEmptyState(data.emptyState || null);
    } catch (error) {
      if (!error?.response?.data?.message) {
        errorToast('Unable to load coupons');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  const handleApplyCode = useCallback(
    async nextCode => {
      const trimmed = String(nextCode || '').trim().toUpperCase();
      if (!trimmed || isApplying) {
        return;
      }

      try {
        setIsApplying(true);
        setApplyingCode(trimmed);
        await dispatch(applyCoupon(trimmed));
        successToast('Coupon applied');
        navigation.goBack();
      } catch (error) {
        if (!error?.response?.data?.message) {
          errorToast(error?.message || 'Unable to apply coupon');
        }
      } finally {
        setIsApplying(false);
        setApplyingCode('');
      }
    },
    [dispatch, isApplying, navigation],
  );

  const handleApply = useCallback(() => {
    if (!canApply) {
      return;
    }
    handleApplyCode(code);
  }, [canApply, code, handleApplyCode]);

  return (
    <ScreenContainer noPaddingBottom noPaddingTop>
      <View style={styles.root}>
        <Header title="Apply coupon" onBack={() => navigation.goBack()} />

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.codeRow}>
            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder={placeholder}
              placeholderTextColor={COLORS.GRAY_LIGHT}
              autoCapitalize="characters"
              autoCorrect={false}
              style={styles.codeInput}
              editable={!isApplying}
            />
            <Pressable
              style={[styles.applyButton, canApply && styles.applyButtonActive]}
              disabled={!canApply}
              onPress={handleApply}>
              {isApplying && applyingCode === code.trim().toUpperCase() ? (
                <ActivityIndicator size="small" color={COLORS.WHITE} />
              ) : (
                <StyledText
                  color={COLORS.WHITE}
                  size={14}
                  textStyle={styles.applyText}>
                  {applyLabel}
                </StyledText>
              )}
            </Pressable>
          </View>

          <StyledText
            color={COLORS.BLACK}
            size={16}
            textStyle={styles.sectionTitle}>
            {sectionTitle}
          </StyledText>

          {isLoading ? (
            <View style={styles.loadingWrap}>
              <ActivityIndicator size="small" color={COLORS.PRIMARY} />
            </View>
          ) : coupons.length ? (
            coupons.map(coupon => {
              const isApplied =
                String(appliedCode).toUpperCase() ===
                String(coupon.code).toUpperCase();
              const isBusy =
                isApplying &&
                applyingCode === String(coupon.code).toUpperCase();

              return (
                <View key={coupon.id || coupon.code} style={styles.couponCard}>
                  <View style={styles.couponAccent} />
                  <View style={styles.couponBody}>
                    <View style={styles.couponHeader}>
                      <View style={styles.codeBadge}>
                        <StyledText
                          color={COLORS.PRIMARY}
                          size={13}
                          textStyle={styles.codeBadgeText}>
                          {coupon.code}
                        </StyledText>
                      </View>
                      <Pressable
                        style={[
                          styles.cardApplyButton,
                          isApplied && styles.cardApplyButtonApplied,
                        ]}
                        disabled={isApplying || isApplied}
                        onPress={() => handleApplyCode(coupon.code)}>
                        {isBusy ? (
                          <ActivityIndicator
                            size="small"
                            color={COLORS.PRIMARY}
                          />
                        ) : (
                          <StyledText
                            color={
                              isApplied ? COLORS.PRIMARY : COLORS.PRIMARY_DARK
                            }
                            size={13}
                            textStyle={styles.cardApplyText}>
                            {isApplied ? 'Applied' : applyLabel}
                          </StyledText>
                        )}
                      </Pressable>
                    </View>

                    <StyledText
                      color={COLORS.BLACK}
                      size={15}
                      textStyle={styles.couponTitle}>
                      {coupon.title}
                    </StyledText>
                    {coupon.description ? (
                      <StyledText
                        color={COLORS.GRAY}
                        size={13}
                        textStyle={styles.couponDescription}>
                        {coupon.description}
                      </StyledText>
                    ) : null}

                    {Array.isArray(coupon.terms) && coupon.terms.length ? (
                      <View style={styles.termsWrap}>
                        {coupon.terms.map(term => (
                          <StyledText
                            key={term}
                            color={COLORS.GRAY_LIGHT}
                            size={12}
                            textStyle={styles.termText}>
                            • {term}
                          </StyledText>
                        ))}
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyWrap}>
              <View style={styles.emptyIconWrap}>
                <Icon name="local-offer" size={30} color={COLORS.PRIMARY} />
              </View>
              <StyledText
                color={COLORS.BLACK}
                size={16}
                textStyle={styles.emptyTitle}>
                {emptyState?.title || 'No coupons available'}
              </StyledText>
              <StyledText
                color={COLORS.GRAY}
                size={13}
                textStyle={styles.emptySubtitle}>
                {emptyState?.message ||
                  'Currently there are no active coupons available for your order.'}
              </StyledText>
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};

export default CouponScreen;
