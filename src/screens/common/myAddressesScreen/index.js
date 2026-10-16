import React, {useCallback, useEffect } from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  Header,
  Icon,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import { makeGetAddressesRequest } from '../../../api/common';

const SAVED_ADDRESSES = [
  {
    id: '1',
    label: 'Home',
    isSelected: true,
    lines: [
      '2411 , Home, 2912, Sector 42C, Sector 18,',
      'Chandigarh, Chandigarh, India, 160022,',
      'Mobile:8219840664',
    ],
  },
];

const MyAddressesScreen = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const handleAddAddress = useCallback(() => {
    navigation.navigate(NAVIGATION.COMMON.CONFIRM_LOCATION_SCREEN);
  }, [navigation]);

  const handleEditAddress = useCallback(() => {
    // Edit address flow will be wired later
  }, []);

  const handleGetAddresses = useCallback(async () => {
    try {
      const response = await makeGetAddressesRequest();
      console.log(response);
    } catch (error) {
      console.log(error); 
    }
  }, []);

  useEffect(() => {
    handleGetAddresses();
  }, [handleGetAddresses]);

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

          {SAVED_ADDRESSES.map(address => (
            <Pressable key={address.id} style={styles.addressCard}>
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
                    {address.lines.join('\n')}
                  </StyledText>

                  <Pressable onPress={handleEditAddress} hitSlop={8}>
                    <StyledText
                      color={COLORS.PRIMARY}
                      size={13}
                      textStyle={styles.editLabel}>
                      {t('MY_ADDRESSES_SCREEN.EDIT')}
                    </StyledText>
                  </Pressable>
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
