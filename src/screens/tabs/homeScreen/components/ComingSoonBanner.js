import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Icon, StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import styles from './ComingSoonBanner.styles';

const ComingSoonBanner = ({onNotify, onChangeLocation}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.banner}>
      <StyledText
        color={COLORS.GRAY_LIGHT}
        size={22}
        textAlign="center"
        containerStyle={styles.titleRow}
        textStyle={styles.title}>
        {t('HOME_SCREEN.COMING_PREFIX')}{' '}
        <Text style={[styles.title, {color: COLORS.PRIMARY}]}>
          {t('HOME_SCREEN.COMING_SOON')}
        </Text>
      </StyledText>

      <StyledText
        color={COLORS.GRAY}
        size={14}
        textAlign="center"
        lineHeight={20}
        textStyle={styles.description}>
        {t('HOME_SCREEN.COMING_DESCRIPTION')}
      </StyledText>

      <Pressable style={styles.notifyButton} onPress={onNotify}>
        <Icon name="chat" size={20} color={COLORS.WHITE} />
        <StyledText
          color={COLORS.WHITE}
          size={16}
          textStyle={styles.notifyLabel}>
          {t('HOME_SCREEN.NOTIFY_ME')}
        </StyledText>
      </Pressable>

      <Pressable onPress={onChangeLocation} hitSlop={8}>
        <StyledText
          color={COLORS.PRIMARY}
          size={14}
          textStyle={styles.changeLocation}>
          {t('HOME_SCREEN.CHANGE_LOCATION')}
        </StyledText>
      </Pressable>
    </View>
  );
};

export default React.memo(ComingSoonBanner);
