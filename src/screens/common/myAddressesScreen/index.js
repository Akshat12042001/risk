import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Header,
  Icon,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import {errorToast, showAlert} from '../../../utils/alerts';
import {
  makeDeleteAddressRequest,
  makeGetAddressesRequest,
  makeSelectAddressRequest,
} from '../../../api/common';
import styles from './styles';

const MyAddressesScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);

  const handleAddAddress = useCallback(() => {
    navigation.navigate(NAVIGATION.COMMON.CONFIRM_LOCATION_SCREEN);
  }, [navigation]);

  const handleGetAddresses = useCallback(async () => {
    try {
      const response = await makeGetAddressesRequest();
      setAddresses(response?.data?.addresses || []);
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  }, []);

  const handleEditAddress = useCallback(
    address => {
      navigation.navigate(NAVIGATION.COMMON.ADD_ADDRESS_DETAIL_SCREEN, {
        editingAddress: address,
      });
    },
    [navigation],
  );

  const handleSelectAddress = useCallback(
    async address => {
      if (address.isSelected) {
        return;
      }
      try {
        await makeSelectAddressRequest(address.id);
        handleGetAddresses();
      } catch (error) {
        errorToast(error?.response?.data?.message);
      }
    },
    [handleGetAddresses],
  );

  const handleDeleteAddress = useCallback(
    address => {
      showAlert({
        title: t('MY_ADDRESSES_SCREEN.DELETE_CONFIRMATION'),
        message: t('MY_ADDRESSES_SCREEN.DELETE_CONFIRMATION_MESSAGE'),
        isConfirmationPopup: true,
        t,
        onCancel: () => {},
        onSuccess: async () => {
          try {
            await makeDeleteAddressRequest(address.id);
            handleGetAddresses();
          } catch (error) {
            errorToast(error?.response?.data?.message);
          }
        },
      });
    },
    [handleGetAddresses, t],
  );

  useFocusEffect(
    useCallback(() => {
      handleGetAddresses();
    }, [handleGetAddresses]),
  );

  return (
    <ScreenContainer noPaddingBottom noPaddingTop>
      <View style={styles.root}>
        <Header title={t('MY_ADDRESSES_SCREEN.TITLE')} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          <Pressable style={styles.addCard} onPress={handleAddAddress}>
            <View style={styles.addLeft}>
              <Icon name="add" size={22} color={COLORS.PRIMARY} />
              <StyledText
                color={COLORS.PRIMARY}
                size={16}
                textStyle={styles.addLabel}>
                {t('MY_ADDRESSES_SCREEN.ADD')}
              </StyledText>
            </View>
            <Icon name="chevron-right" size={22} color={COLORS.GRAY} />
          </Pressable>

          <StyledText
            color={COLORS.GRAY_LIGHT}
            size={12}
            textStyle={styles.sectionLabel}>
            {t('MY_ADDRESSES_SCREEN.SAVED')}
          </StyledText>

          {addresses.map(address => (
            <Pressable
              key={address.id}
              style={styles.addressCard}
              onPress={() => handleSelectAddress(address)}>
              <View style={styles.addressTop}>
                <View style={styles.pinBox}>
                  <Icon name="place" size={22} color={COLORS.GRAY} />
                </View>

                <View style={styles.addressInfo}>
                  <View style={styles.titleRow}>
                    <StyledText
                      color={COLORS.BLACK}
                      size={16}
                      textStyle={styles.addressTitle}>
                      {address.label}
                    </StyledText>
                    {address.isSelected ? (
                      <View style={styles.selectedBadge}>
                        <StyledText
                          color={COLORS.PRIMARY_DARK}
                          size={11}
                          textStyle={styles.selectedBadgeText}>
                          {t('MY_ADDRESSES_SCREEN.CURRENTLY_SELECTED')}
                        </StyledText>
                      </View>
                    ) : null}
                  </View>

                  <StyledText
                    color={COLORS.GRAY}
                    size={13}
                    textStyle={styles.addressText}>
                    {address.displayAddress}
                  </StyledText>

                  <View style={styles.actionsRow}>
                    <Pressable
                      style={styles.actionButton}
                      onPress={() => handleEditAddress(address)}
                      hitSlop={8}>
                      <StyledText
                        color={COLORS.PRIMARY}
                        size={13}
                        textStyle={styles.editLabel}>
                        {t('MY_ADDRESSES_SCREEN.EDIT')}
                      </StyledText>
                    </Pressable>

                    {!address.isSelected ? (
                      <Pressable
                        style={styles.actionButton}
                        onPress={() => handleSelectAddress(address)}
                        hitSlop={8}>
                        <StyledText
                          color={COLORS.PRIMARY}
                          size={13}
                          textStyle={styles.editLabel}>
                          {t('MY_ADDRESSES_SCREEN.MARK_AS_CURRENT')}
                        </StyledText>
                      </Pressable>
                    ) : null}

                    <Pressable
                      style={styles.actionButton}
                      onPress={() => handleDeleteAddress(address)}
                      hitSlop={8}>
                      <StyledText
                        color={COLORS.TOAST_ERROR_ICON}
                        size={13}
                        textStyle={styles.deleteLabel}>
                        {t('MY_ADDRESSES_SCREEN.DELETE')}
                      </StyledText>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};

export default MyAddressesScreen;
