import React, {useCallback} from 'react';
import {Pressable, ScrollView, StatusBar, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Icon, ScreenContainer, StyledText} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import styles from './styles';

const WHATSAPP_GREEN = '#25D366';
const ICON_COLOR = '#3F4A5A';
const APP_VERSION = '1.5.9 (8ab5)';

const USER = {
  name: 'Akshat Sharma',
  phone: '+91 6239270721',
};

const ProfileScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const handleMyBookings = useCallback(() => {
    navigation.navigate(NAVIGATION.STACKS.TABS, {
      screen: NAVIGATION.TABS.BOOKINGS_SCREEN,
    });
  }, [navigation]);

  const menuItems = [
    {
      key: 'addresses',
      icon: 'menu-book',
      label: t('PROFILE_SCREEN.SAVED_ADDRESSES'),
    },
    {
      key: 'about',
      icon: 'info-outline',
      label: t('PROFILE_SCREEN.ABOUT_US'),
    },
    {
      key: 'terms',
      icon: 'assignment',
      label: t('PROFILE_SCREEN.TERMS'),
    },
    {
      key: 'privacy',
      icon: 'security',
      label: t('PROFILE_SCREEN.PRIVACY'),
    },
    {
      key: 'delete',
      icon: 'person-remove',
      label: t('PROFILE_SCREEN.DELETE_ACCOUNT'),
    },
    {
      key: 'logout',
      icon: 'logout',
      label: t('PROFILE_SCREEN.LOG_OUT'),
    },
  ];

  return (
    <ScreenContainer>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.headerTop}>
          <Pressable
            style={styles.backButton}
            onPress={handleBack}
            hitSlop={8}>
            <Icon name="arrow-back" size={24} color={COLORS.WHITE} />
          </Pressable>
          <StyledText
            color={COLORS.WHITE}
            size={20}
            textStyle={styles.headerTitle}>
            {t('PROFILE_SCREEN.TITLE')}
          </StyledText>
        </View>

        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Icon name="person" size={40} color="#9CA3AF" />
          </View>

          <View style={styles.userInfo}>
            <StyledText
              color={COLORS.WHITE}
              size={24}
              textStyle={styles.userName}>
              {USER.name}
            </StyledText>
            <StyledText
              color={COLORS.WHITE}
              size={14}
              textStyle={styles.userPhone}>
              {USER.phone}
            </StyledText>
            <Pressable style={styles.editRow} hitSlop={8}>
              <StyledText
                color={COLORS.PRIMARY}
                size={14}
                textStyle={styles.editLabel}>
                {t('PROFILE_SCREEN.EDIT_PROFILE')}
              </StyledText>
              <Icon name="chevron-right" size={18} color={COLORS.PRIMARY} />
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.quickGrid}>
          <Pressable style={styles.quickCard} onPress={handleMyBookings}>
            <Icon name="assignment" size={28} color={ICON_COLOR} />
            <StyledText
              color={COLORS.BLACK}
              size={15}
              textStyle={styles.quickLabel}>
              {t('PROFILE_SCREEN.MY_BOOKINGS')}
            </StyledText>
          </Pressable>

          <Pressable style={styles.quickCard}>
            <Icon name="support-agent" size={28} color={ICON_COLOR} />
            <StyledText
              color={COLORS.BLACK}
              size={15}
              textStyle={styles.quickLabel}>
              {t('PROFILE_SCREEN.HELP_SUPPORT')}
            </StyledText>
          </Pressable>
        </View>

        <Pressable style={[styles.listCard, styles.listRow]}>
          <View style={styles.listRowLeft}>
            <Icon
              name="chat"
              size={24}
              color={WHATSAPP_GREEN}
              style={styles.listIcon}
            />
            <StyledText
              color={COLORS.BLACK}
              size={15}
              textStyle={styles.listLabel}
              containerStyle={styles.listLabelContainer}>
              {t('PROFILE_SCREEN.WHATSAPP_UPDATES')}
            </StyledText>
          </View>
          <Icon
            name="chevron-right"
            size={22}
            color={COLORS.GRAY_LIGHT}
            style={styles.chevron}
          />
        </Pressable>

        <View style={styles.listCard}>
          {menuItems.map((item, index) => (
            <View key={item.key}>
              <Pressable style={styles.listRow}>
                <View style={styles.listRowLeft}>
                  <Icon
                    name={item.icon}
                    size={22}
                    color={ICON_COLOR}
                    style={styles.listIcon}
                  />
                  <StyledText
                    color={COLORS.BLACK}
                    size={15}
                    textStyle={styles.listLabel}
                    containerStyle={styles.listLabelContainer}>
                    {item.label}
                  </StyledText>
                </View>
                <Icon
                  name="chevron-right"
                  size={22}
                  color={COLORS.GRAY_LIGHT}
                  style={styles.chevron}
                />
              </Pressable>
              {index < menuItems.length - 1 ? (
                <View style={styles.divider} />
              ) : null}
            </View>
          ))}
        </View>

        <StyledText
          color={COLORS.GRAY_LIGHT}
          size={11}
          textAlign="center"
          textStyle={styles.version}>
          {t('PROFILE_SCREEN.APP_VERSION', {version: APP_VERSION})}
        </StyledText>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ProfileScreen;
