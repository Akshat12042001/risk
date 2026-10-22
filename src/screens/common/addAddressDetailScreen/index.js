import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import {NavigationService} from '../../../services';
import {errorToast} from '../../../utils/alerts';
import {
  makeAddAddressRequest,
  makeEditAddressRequest,
  makeSelectAddressRequest,
} from '../../../api/common';
import styles from './styles';

const ADDRESS_TYPES = {
  HOME: 'home',
  OTHER: 'other',
};

const toLocalPhone = phone => {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length > 10) {
    return digits.slice(-10);
  }
  return digits;
};

const getChangedFields = (original, current) => {
  return Object.keys(current).reduce((changes, key) => {
    if (String(current[key] ?? '') !== String(original[key] ?? '')) {
      changes[key] = current[key];
    }
    return changes;
  }, {});
};

const AddAddressDetailScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const editingAddress = route.params?.editingAddress;

  const initialArea =
    editingAddress?.area ||
    (typeof route.params?.address === 'string' ? route.params.address : '') ||
    route.params?.area ||
    '';

  const [addressType, setAddressType] = useState(
    editingAddress?.saveAs || ADDRESS_TYPES.HOME,
  );
  const [flatNo, setFlatNo] = useState(editingAddress?.flatOrHouseNo || '');
  const [floor, setFloor] = useState(editingAddress?.floor || '');
  const [buildingName, setBuildingName] = useState(
    editingAddress?.building || '',
  );
  const [landmark, setLandmark] = useState(editingAddress?.landmark || '');
  const [area, setArea] = useState(initialArea);
  const [receiverPhone, setReceiverPhone] = useState(
    toLocalPhone(editingAddress?.receiverPhone),
  );
  const [receiverName, setReceiverName] = useState(
    editingAddress?.receiverName || '',
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const nextArea =
      route.params?.area ||
      (typeof route.params?.address === 'string' ? route.params.address : '');
    if (nextArea) {
      setArea(nextArea);
    }
  }, [route.params?.address, route.params?.area]);

  const isFormValid = useMemo(() => {
    return (
      !!flatNo.trim() &&
      !!buildingName.trim() &&
      !!receiverPhone.trim() &&
      !!receiverName.trim()
    );
  }, [buildingName, flatNo, receiverName, receiverPhone]);

  const handleChangeLocation = useCallback(() => {
    navigation.navigate(NAVIGATION.COMMON.CONFIRM_LOCATION_SCREEN, {
      editingAddress,
    });
  }, [editingAddress, navigation]);

  const handleSaveAddress = useCallback(async () => {
    if (!isFormValid || isLoading) {
      return;
    }

    const currentAddress = {
      saveAs: addressType,
      flatOrHouseNo: flatNo.trim(),
      floor: floor.trim(),
      building: buildingName.trim(),
      landmark: landmark.trim(),
      area,
      receiverPhone: receiverPhone.trim(),
      receiverName: receiverName.trim(),
    };

    try {
      setIsLoading(true);

      if (editingAddress?.id) {
        const changes = getChangedFields(
          {
            saveAs: editingAddress.saveAs,
            flatOrHouseNo: editingAddress.flatOrHouseNo || '',
            floor: editingAddress.floor || '',
            building: editingAddress.building || '',
            landmark: editingAddress.landmark || '',
            area: editingAddress.area || '',
            receiverPhone: toLocalPhone(editingAddress.receiverPhone),
            receiverName: editingAddress.receiverName || '',
          },
          currentAddress,
        );

        if (Object.keys(changes).length > 0) {
          await makeEditAddressRequest(editingAddress.id, changes);
        }

        if (!editingAddress.isSelected) {
          await makeSelectAddressRequest(editingAddress.id);
        }
      } else {
        const response = await makeAddAddressRequest(currentAddress);
        const createdAddress = response?.data?.address || response?.data;
        if (createdAddress?.id) {
          await makeSelectAddressRequest(createdAddress.id);
        }
      }

      NavigationService.reset({
        index: 0,
        routes: [{name: NAVIGATION.STACKS.TABS}],
      });
    } catch (error) {
      errorToast(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }, [
    addressType,
    area,
    buildingName,
    editingAddress,
    flatNo,
    floor,
    isFormValid,
    isLoading,
    landmark,
    receiverName,
    receiverPhone,
  ]);

  return (
    <ScreenContainer noPaddingBottom noPaddingTop>
      <View style={styles.root}>
        <Header
          title={t(
            editingAddress
              ? 'ADD_ADDRESS_DETAIL_SCREEN.EDIT_TITLE'
              : 'ADD_ADDRESS_DETAIL_SCREEN.TITLE',
          )}
        />

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
                {area}
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
