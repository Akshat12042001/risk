import React, {useCallback, useState} from 'react';
import {BackHandler, StatusBar, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  Icon,
  Input,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import styles from './styles';

const ReferralCodeScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [referralCode, setReferralCode] = useState('');

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => subscription.remove();
    }, []),
  );

  const handleContinue = () => {
    // Continue with referral code will be wired later
    navigation.navigate(NAVIGATION.COMMON.USER_DETAIL_SCREEN);
  };

  const handleSkip = () => {
    // Skip flow will be wired later
    navigation.navigate(NAVIGATION.COMMON.USER_DETAIL_SCREEN);
  };

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />

      <View style={styles.root}>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.illustrationWrap}>
            <View style={styles.illustrationCircle}>
              <Icon name="handshake" size={64} color={COLORS.PRIMARY} />
            </View>
            <Icon
              name="star"
              size={18}
              color={COLORS.PRIMARY}
              style={styles.sparkTopRight}
            />
            <Icon
              name="star"
              size={14}
              color={COLORS.ACCENT}
              style={styles.sparkBottomLeft}
            />
            <Icon
              name="star"
              size={12}
              color={COLORS.PRIMARY_DARK}
              style={styles.sparkTopLeft}
            />
          </View>

          <StyledText
            color={COLORS.BLACK}
            size={28}
            textStyle={styles.title}>
            {t('REFERRAL_CODE_SCREEN.TITLE')}
          </StyledText>

          <StyledText
            color={COLORS.GRAY_LIGHT}
            size={15}
            textStyle={styles.subtitle}>
            {t('REFERRAL_CODE_SCREEN.SUBTITLE')}
          </StyledText>

          <Input
            label={t('REFERRAL_CODE_SCREEN.PLACEHOLDER')}
            value={referralCode}
            onChangeText={setReferralCode}
            autoCapitalize="characters"
            autoCorrect={false}
            style={styles.input}
          />
        </KeyboardAwareScrollView>

        <View style={styles.footer}>
          <Button
            title={t('REFERRAL_CODE_SCREEN.CONTINUE')}
            onPress={handleContinue}
            style={styles.continueButton}
          />
          <Button
            title={t('REFERRAL_CODE_SCREEN.SKIP')}
            onPress={handleSkip}
            textColor={COLORS.PRIMARY}
            style={styles.skipButton}
            textStyle={styles.skipLabel}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ReferralCodeScreen;
