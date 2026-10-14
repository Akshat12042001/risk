import React from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import {COLORS} from '../../../constants';
import StyledText from '../styledText';
import styles from './styles';

const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  textColor = COLORS.WHITE,
  textSize = 17,
  loaderColor = COLORS.WHITE,
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.button, isDisabled && styles.disabled, style]}>
      {loading ? (
        <ActivityIndicator color={loaderColor} />
      ) : (
        <StyledText
          color={textColor}
          size={textSize}
          textStyle={[styles.label, textStyle]}>
          {title}
        </StyledText>
      )}
    </Pressable>
  );
};

export default React.memo(Button);
