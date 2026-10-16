import React, {useCallback, useMemo, useState} from 'react';
import {Pressable, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  Header,
  Input,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import styles from './styles';

const ADDRESS_TYPES = {
  HOME: 'home',
  OTHER: 'other',
};

const AddAddressDetailScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();

  const routeAddress =
    route.params?.address || route.params?.selectedLocation?.address || '';

  const [addressType, setAddressType] = useState(ADDRESS_TYPES.HOME);
  const [flatNo, setFlatNo] = useState('');
  const [floor, setFloor] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [landmark, setLandmark] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      !!flatNo.trim() &&
      !!buildingName.trim() &&
      !!receiverPhone.trim() &&
      !!receiverName.trim()
    );
  }, [buildingName, flatNo, receiverName, receiverPhone]);

  const handleChangeLocation = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate(NAVIGATION.COMMON.CONFIRM_LOCATION_SCREEN);
  }, [navigation]);

  const handleSaveAddress = useCallback(async () => {
    if (!isFormValid || isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      // Save address API will be wired later
    } finally {
      setIsLoading(false);
    }
  }, [isFormValid, isLoading]);

  return (
    <ScreenContainer noPaddingBottom noPaddingTop>
      <View style={styles.root}>
        <Header title={t('ADD_ADDRESS_DETAIL_SCREEN.TITLE')} />

        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <StyledText
              color={COLORS.BLACK}
              size={18}
              textStyle={styles.sectionTitle}>
              {t('ADD_ADDRESS_DETAIL_SCREEN.ADDRESS_DETAILS')}
            </StyledText>

            <StyledText
              color={COLORS.GRAY}
              size={13}
              textStyle={styles.saveAsLabel}>
              {t('ADD_ADDRESS_DETAIL_SCREEN.SAVE_AS')}
            </StyledText>

            <View style={styles.typeRow}>
              <Pressable
                style={[
                  styles.typeChip,
                  styles.typeChipSpacing,
                  addressType === ADDRESS_TYPES.HOME && styles.typeChipSelected,
                ]}
                onPress={() => setAddressType(ADDRESS_TYPES.HOME)}>
                <StyledText
                  color={
                    addressType === ADDRESS_TYPES.HOME
                      ? COLORS.PRIMARY_DARK
                      : COLORS.BLACK
                  }
                  size={15}
                  textStyle={styles.typeChipLabel}>
                  {t('ADD_ADDRESS_DETAIL_SCREEN.HOME')}
                </StyledText>
              </Pressable>

              <Pressable
                style={[
                  styles.typeChip,
                  addressType === ADDRESS_TYPES.OTHER &&
                    styles.typeChipSelected,
                ]}
                onPress={() => setAddressType(ADDRESS_TYPES.OTHER)}>
                <StyledText
                  color={
                    addressType === ADDRESS_TYPES.OTHER
                      ? COLORS.PRIMARY_DARK
                      : COLORS.BLACK
                  }
                  size={15}
                  textStyle={styles.typeChipLabel}>
                  {t('ADD_ADDRESS_DETAIL_SCREEN.OTHER')}
                </StyledText>
              </Pressable>
            </View>

            <View style={styles.row}>
              <Input
                label={t('ADD_ADDRESS_DETAIL_SCREEN.FLAT_NO')}
                value={flatNo}
                onChangeText={setFlatNo}
                style={[styles.halfInput, styles.halfInputSpacing]}
                autoCapitalize="words"
              />
              <Input
                label={t('ADD_ADDRESS_DETAIL_SCREEN.FLOOR')}
                value={floor}
                onChangeText={setFloor}
                style={styles.halfInput}
                autoCapitalize="words"
              />
            </View>

            <Input
              label={t('ADD_ADDRESS_DETAIL_SCREEN.BUILDING')}
              value={buildingName}
              onChangeText={setBuildingName}
              style={styles.input}
              autoCapitalize="words"
            />

            <Input
              label={t('ADD_ADDRESS_DETAIL_SCREEN.LANDMARK')}
              value={landmark}
              onChangeText={setLandmark}
              style={[styles.input, styles.inputLast]}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.areaCard}>
            <View style={styles.areaContent}>
              <StyledText
                color={COLORS.GRAY_LIGHT}
                size={12}
                textStyle={styles.areaLabel}>
                {t('ADD_ADDRESS_DETAIL_SCREEN.AREA_LABEL')}
              </StyledText>
              <StyledText
                color={COLORS.BLACK}
                size={15}
                textStyle={styles.areaAddress}>
                {routeAddress}
              </StyledText>
            </View>

            <Pressable
              style={styles.changeButton}
              onPress={handleChangeLocation}
              hitSlop={8}>
              <StyledText
                color={COLORS.PRIMARY_DARK}
                size={13}
                textStyle={styles.changeLabel}>
                {t('ADD_ADDRESS_DETAIL_SCREEN.CHANGE')}
              </StyledText>
            </Pressable>
          </View>

          <View style={styles.card}>
            <StyledText
              color={COLORS.BLACK}
              size={18}
              textStyle={styles.sectionTitle}>
              {t('ADD_ADDRESS_DETAIL_SCREEN.RECEIVER_DETAILS')}
            </StyledText>

            <StyledText
              color={COLORS.GRAY}
              size={13}
              textStyle={styles.receiverSubtitle}>
              {t('ADD_ADDRESS_DETAIL_SCREEN.RECEIVER_SUBTITLE')}
            </StyledText>

            <Input
              label={t('ADD_ADDRESS_DETAIL_SCREEN.RECEIVER_PHONE')}
              value={receiverPhone}
              maxLength={10}
              onChangeText={setReceiverPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />

            <Input
              label={t('ADD_ADDRESS_DETAIL_SCREEN.RECEIVER_NAME')}
              value={receiverName}
              onChangeText={setReceiverName}
              autoCapitalize="words"
              style={[styles.input, styles.inputLast]}
            />
          </View>
        </KeyboardAwareScrollView>

        <View style={styles.footer}>
          <Button
            title={t('ADD_ADDRESS_DETAIL_SCREEN.SAVE')}
            onPress={handleSaveAddress}
            disabled={!isFormValid}
            loading={isLoading}
            style={styles.saveButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default AddAddressDetailScreen;
