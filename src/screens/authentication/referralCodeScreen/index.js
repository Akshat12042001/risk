import React, {useCallback, useState} from 'react';
import {BackHandler, StatusBar, View} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {makeUpdateProfileRequest} from '../../../api/auth';

const ReferralCodeScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [referralCode, setReferralCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useRoute().params;

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

  const handleContinue = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      await makeUpdateProfileRequest(token, {
        referralCode: referralCode,
      });
      navigation.navigate(NAVIGATION.AUTH.USER_DETAIL_SCREEN, {
        token,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (isLoading) {
      return;
    }
    navigation.navigate(NAVIGATION.AUTH.USER_DETAIL_SCREEN, {
      token,
    });
  };

  return (
    <ScreenContainer noPaddingBottom noPaddingTop>
      <View style={[styles.root, {paddingTop: insets.top}]}>
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

          <StyledText color={COLORS.BLACK} size={28} textStyle={styles.title}>
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
            loading={isLoading}
          />
          <Button
            title={t('REFERRAL_CODE_SCREEN.SKIP')}
            onPress={handleSkip}
            textColor={COLORS.PRIMARY}
            style={styles.skipButton}
            textStyle={styles.skipLabel}
            disabled={isLoading}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ReferralCodeScreen;
