import React from 'react';
import {Pressable} from 'react-native';
import {COLORS} from '../../../constants';
import StyledText from '../styledText';
import styles from './styles';

const Button = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  textColor = COLORS.WHITE,
  textSize = 17,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled, style]}>
      <StyledText
        color={textColor}
        size={textSize}
        textStyle={[styles.label, textStyle]}>
        {title}
      </StyledText>
    </Pressable>
  );
};

export default React.memo(Button);
