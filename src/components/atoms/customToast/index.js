import React from 'react';
import {View, Text} from 'react-native';
import Icon from '../icon';
import {COLORS} from '../../../constants';
import styles from './styles';

const CustomToast = ({text1, text2, variant = 'success'}) => {
  const isError = variant === 'error';

  return (
    <View
      accessibilityRole="alert"
      style={[
        styles.customToast,
        isError ? styles.errorToast : styles.successToast,
      ]}>
      <View
        style={[
          styles.iconBadge,
          isError ? styles.errorBadge : styles.successBadge,
        ]}>
        <Icon
          name={isError ? 'error-outline' : 'check'}
          size={20}
          color={COLORS.WHITE}
        />
      </View>

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.customTitle,
            isError ? styles.errorTitle : styles.successTitle,
          ]}>
          {text1}
        </Text>
        {!!text2 && <Text style={styles.customMessage}>{text2}</Text>}
      </View>
    </View>
  );
};

export default React.memo(CustomToast);
