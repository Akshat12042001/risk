import React, {useState} from 'react';
import {Pressable, StatusBar, Text, TextInput, View} from 'react-native';
import Config from 'react-native-config';
import {
  Button,
  Icon,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import MarqueeRow from './components/MarqueeRow';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {errorToast, successToast} from '../../../utils/alerts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {makeOTPRequest} from '../../../api/auth';

const ROW_1_IMAGES = [
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80',
  'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&q=80',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
  'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
];

const ROW_2_IMAGES = [
  'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80',
  'https://images.unsplash.com/photo-1556911220-bff31c812dce?w=400&q=80',
  'https://images.unsplash.com/photo-1603712725038-e9334ae8f39d?w=400&q=80',
  'https://images.unsplash.com/photo-1628177142898-93e36e4e92a1?w=400&q=80',
];

const ROW_3_IMAGES = [
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80',
  'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80',
  'https://images.unsplash.com/photo-1517677208171-0bc6725a75dd?w=400&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
];

const FADE_STOPS = [
  'rgba(250,250,249,0)',
  'rgba(250,250,249,0.35)',
  'rgba(250,250,249,0.7)',
  'rgba(250,250,249,1)',
];

const WelcomeScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [phone, setPhone] = useState('');
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const brandName = Config.NAME || 'Pronto';

  const handleContinue = async () => {
    if (isLoading) {
      return;
    }
    if (phone.length !== 10) {
      errorToast(t('Please enter a valid phone number'));
      return;
    }
    try {
      setIsLoading(true);
      const response = await makeOTPRequest(phone);
      successToast(response.message);
      navigation.navigate(NAVIGATION.AUTH.OTP_SCREEN, {phone});
    } catch (error) {
      errorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer noPaddingBottom noPaddingTop>
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        enableResetScrollToCoords={false}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.root}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.header, {paddingTop: insets.top}]}>
          <Pressable style={styles.skipButton} hitSlop={8}>
            <StyledText
              color={COLORS.WHITE}
              size={13}
              textStyle={styles.skipText}>
              {t('WELCOME_SCREEN.SKIP_LOGIN')}
            </StyledText>
          </Pressable>

          <StyledText
            color={COLORS.WHITE}
            size={42}
            textAlign="center"
            textStyle={styles.brandTitle}
            containerStyle={styles.brandTitleContainer}>
            {brandName}
          </StyledText>

          <StyledText
            color={COLORS.WHITE}
            size={18}
            textAlign="center"
            lineHeight={24}
            textStyle={styles.brandTagline}
            containerStyle={styles.brandTaglineContainer}>
            {t('WELCOME_SCREEN.BRAND_TAGLINE')}
          </StyledText>

          <View style={styles.accentBar} />
        </View>

        <View style={styles.marqueeSection}>
          <MarqueeRow images={ROW_1_IMAGES} direction="left-to-right" />
          <MarqueeRow images={ROW_2_IMAGES} direction="right-to-left" />
          <MarqueeRow images={ROW_3_IMAGES} direction="left-to-right" />

          <View style={styles.fadeOverlay} pointerEvents="none">
            {FADE_STOPS.map(color => (
              <View
                key={color}
                style={[styles.fadeStop, {backgroundColor: color}]}
              />
            ))}
          </View>
        </View>

        <View style={styles.formSection}>
          <StyledText
            color={COLORS.BLACK}
            size={28}
            textAlign="center"
            textStyle={styles.formTitle}
            containerStyle={styles.formTitleContainer}>
            {t('WELCOME_SCREEN.LOG_IN_OR_SIGN_UP')}
          </StyledText>

          <View style={styles.phoneInputRow}>
            <StyledText
              color={COLORS.BLACK}
              size={16}
              textStyle={styles.countryCode}
              containerStyle={styles.countryCodeContainer}>
              +91
            </StyledText>
            <View style={styles.divider} />
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              placeholder={t('WELCOME_SCREEN.PHONE_NUMBER')}
              placeholderTextColor="#B0B0B0"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <Pressable
            style={styles.whatsappRow}
            onPress={() => setWhatsappOptIn(prev => !prev)}>
            <View
              style={[
                styles.checkbox,
                whatsappOptIn && styles.checkboxChecked,
              ]}>
              {whatsappOptIn ? (
                <Icon name="check" size={16} color={COLORS.WHITE} />
              ) : null}
            </View>
            <StyledText
              color={COLORS.GRAY}
              size={15}
              textStyle={styles.whatsappLabel}>
              {t('WELCOME_SCREEN.GET_UPDATES_ON_WHATSAPP')}
            </StyledText>
          </Pressable>

          <Button
            title={t('WELCOME_SCREEN.CONTINUE')}
            style={styles.continueButton}
            onPress={handleContinue}
            loading={isLoading}
          />

          <StyledText
            color={COLORS.GRAY_LIGHT}
            size={12}
            textAlign="center"
            lineHeight={18}>
            {t('WELCOME_SCREEN.ACCENT_BAR')}{' '}
            <Text style={styles.footerLink}>
              {t('WELCOME_SCREEN.FOOTER_LINK')}
            </Text>
            {' & '}
            <Text style={styles.footerLink}>
              {t('WELCOME_SCREEN.FOOTER_LINK_2')}
            </Text>
          </StyledText>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default WelcomeScreen;
