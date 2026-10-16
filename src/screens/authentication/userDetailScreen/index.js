import React, {useCallback, useState} from 'react';
import {BackHandler, StatusBar, Text, View} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  Input,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {makeUpdateProfileRequest} from '../../../api/auth';
import {useDispatch, useSelector} from 'react-redux';
import { setUser } from '../../../redux/auth/auth.reducer';

const UserDetailScreen = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useRoute().params;
  const dispatch = useDispatch();

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
      const response = await makeUpdateProfileRequest(token, {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      dispatch(
        setUser({
          token,
          user: response?.data.user,
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer noPaddingBottom noPaddingTop>
      <View style={[styles.root, {paddingTop: insets.top}]}>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <StyledText
            color={COLORS.BLACK}
            size={32}
            containerStyle={styles.titleRow}
            textStyle={styles.titleText}>
            {t('USER_DETAIL_SCREEN.TITLE_PREFIX')}{' '}
            <Text style={styles.titleHighlight}>
              {t('USER_DETAIL_SCREEN.TITLE_HIGHLIGHT')}
            </Text>{' '}
            {t('USER_DETAIL_SCREEN.TITLE_SUFFIX')}
          </StyledText>

          <Input
            label={t('USER_DETAIL_SCREEN.FIRST_NAME')}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            autoCorrect={false}
            style={styles.input}
          />

          <Input
            label={t('USER_DETAIL_SCREEN.LAST_NAME')}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            autoCorrect={false}
            style={styles.input}
          />

          <Input
            label={t('USER_DETAIL_SCREEN.EMAIL')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
        </KeyboardAwareScrollView>

        <View style={styles.footer}>
          <Button
            title={t('USER_DETAIL_SCREEN.CONTINUE')}
            onPress={handleContinue}
            disabled={!firstName.trim()}
            loading={isLoading}
            style={styles.continueButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default UserDetailScreen;
