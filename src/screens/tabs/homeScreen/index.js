import React, {useCallback} from 'react';
import {Pressable, ScrollView, StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Icon, StyledText} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import ComingSoonBanner from './components/ComingSoonBanner';
import ServiceCard from './components/ServiceCard';
import {LOCATION, SERVICES} from './data';
import styles from './styles';

const HomeScreen = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const isServiceable = LOCATION.isServiceable;

  const handleNotify = useCallback(() => {
    // Notify via WhatsApp will be wired later
  }, []);

  const handleChangeLocation = useCallback(() => {
    // Location picker will be wired later
  }, []);

  const handleProfilePress = useCallback(() => {
    // Profile navigation will be wired later
  }, []);

  const handleLocationPress = useCallback(() => {
    // Location picker will be wired later
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY} />

      <View style={[styles.header, {paddingTop: insets.top + 10}]}>
        <Pressable
          style={styles.locationBlock}
          onPress={handleLocationPress}
          hitSlop={4}>
          <View style={styles.locationTitleRow}>
            <StyledText
              color={COLORS.WHITE}
              size={20}
              textStyle={styles.locationTitle}>
              {LOCATION.title}
            </StyledText>
            <Icon name="keyboard-arrow-down" size={22} color={COLORS.WHITE} />
          </View>
          <StyledText
            color={COLORS.WHITE}
            size={12}
            numberOfLines={1}
            textStyle={styles.locationAddress}>
            {LOCATION.address}
          </StyledText>
        </Pressable>

        <Pressable
          style={styles.profileButton}
          onPress={handleProfilePress}
          hitSlop={8}>
          <Icon name="person" size={24} color={COLORS.BLACK} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}>
        {!isServiceable ? (
          <ComingSoonBanner
            onNotify={handleNotify}
            onChangeLocation={handleChangeLocation}
          />
        ) : null}

        <View style={styles.servicesSection}>
          {!isServiceable ? (
            <StyledText
              color={COLORS.BLACK}
              size={20}
              textStyle={styles.sectionTitle}>
              {t('HOME_SCREEN.SERVICES_TITLE')}
            </StyledText>
          ) : null}

          <View style={styles.grid}>
            {SERVICES.map(item => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
