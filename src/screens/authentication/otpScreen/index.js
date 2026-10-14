import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, StatusBar, TextInput, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  Icon,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeOTPRequest, verifyOTPRequest } from '../../../api/auth';
import { errorToast, successToast } from '../../../utils/alerts';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/auth/auth.reducer';
const OTP_LENGTH = 6;
const RESEND_SECONDS = 40;

const formatPhone = phone => {
  if (!phone) {
    return '+91';
  }
  const digits = String(phone).replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return `+91 ${digits}`;
};

const OtpScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
const dispatch = useDispatch();

  const inputRef = useRef(null);
  const insets = useSafeAreaInsets();
  const phone = route.params?.phone || '';
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isOtpComplete = otp.length === OTP_LENGTH;
  const canResend = secondsLeft === 0;

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const handleOtpChange = useCallback(value => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, OTP_LENGTH);
    setOtp(digitsOnly);
  }, []);

  const handleResend = useCallback(async () => {
    if (!canResend) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await makeOTPRequest(phone);
      successToast(response.message);
      setOtp('');
      setSecondsLeft(RESEND_SECONDS);
      inputRef.current?.focus();
    } catch (error) {
      errorToast(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, [canResend]);

  const handleDone = useCallback(async () => {
    if (!isOtpComplete) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await verifyOTPRequest(phone, otp);
      successToast(response.message);
      if(response?.data?.user?.isNewUser){
        navigation.navigate(NAVIGATION.AUTH.REFERRAL_CODE_SCREEN);
      } else {
        dispatch(setUser(response.data));
      }
    } catch (error) {
      errorToast(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
    // OTP submit will be wired to API later
  }, [isOtpComplete]);

  const focusedIndex = Math.min(otp.length, OTP_LENGTH - 1);

  return (
    <ScreenContainer noPaddingBottom noPaddingTop>
      <View style={styles.root}>
        <View style={[styles.header, {paddingTop: insets.top}]}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={8}>
            <Icon name="arrow-back" size={24} color={COLORS.BLACK} />
          </Pressable>
          <StyledText
            color={COLORS.BLACK}
            size={18}
            textStyle={styles.headerTitle}>
            {t('OTP_SCREEN.TITLE')}
          </StyledText>
        </View>

        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <StyledText
            color={COLORS.BLACK}
            size={26}
            textAlign="center"
            lineHeight={34}
            textStyle={styles.instruction}>
            {t('OTP_SCREEN.ENTER_OTP', {phone: formatPhone(phone)})}
          </StyledText>

          <Pressable
            style={styles.otpRow}
            onPress={() => inputRef.current?.focus()}>
            {Array.from({length: OTP_LENGTH}).map((_, index) => {
              const digit = otp[index] || '';
              const isBoxFocused =
                isFocused && index === focusedIndex && otp.length < OTP_LENGTH;
              const isFilled = !!digit;

              return (
                <View
                  key={`otp-${index}`}
                  style={[
                    styles.otpBox,
                    isFilled && styles.otpBoxFilled,
                    isBoxFocused && styles.otpBoxFocused,
                  ]}>
                  <StyledText
                    color={COLORS.BLACK}
                    size={22}
                    textAlign="center"
                    textStyle={styles.otpDigit}>
                    {digit}
                  </StyledText>
                </View>
              );
            })}
          </Pressable>

          <TextInput
            ref={inputRef}
            value={otp}
            onChangeText={handleOtpChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            maxLength={OTP_LENGTH}
            caretHidden
            style={styles.hiddenInput}
          />

          {canResend ? (
            <Pressable onPress={handleResend}>
              <StyledText
                color={COLORS.PRIMARY}
                size={14}
                textAlign="center"
                textStyle={styles.resendActive}>
                {t('OTP_SCREEN.RESEND_SMS')}
              </StyledText>
            </Pressable>
          ) : (
            <StyledText
              color={COLORS.GRAY_LIGHT}
              size={14}
              textAlign="center"
              textStyle={styles.resendText}>
              {t('OTP_SCREEN.RESEND_SMS_IN', {seconds: secondsLeft})}
            </StyledText>
          )}
        </KeyboardAwareScrollView>

        <View style={styles.footer}>
          <Button
            title={t('OTP_SCREEN.DONE')}
            onPress={handleDone}
            disabled={!isOtpComplete}
            textSize={16}
            loading={isLoading}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default OtpScreen;
