import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, TextInput, View} from 'react-native';
import {COLORS} from '../../../constants';
import StyledText from '../styledText';
import styles, {
  LABEL_FLOAT_SIZE,
  LABEL_FLOAT_TOP,
  LABEL_REST_SIZE,
  LABEL_REST_TOP,
} from './styles';

const Input = ({
  label,
  value = '',
  onChangeText,
  onFocus,
  onBlur,
  error,
  containerStyle,
  inputStyle,
  labelColor,
  focusedBorderColor = COLORS.PRIMARY,
  style,
  editable = true,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value != null && String(value).length > 0;
  const isFloating = isFocused || hasValue;
  const animation = useRef(new Animated.Value(isFloating ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isFloating ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [animation, isFloating]);

  const labelTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [LABEL_REST_TOP, LABEL_FLOAT_TOP],
  });

  const labelFontSize = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [LABEL_REST_SIZE, LABEL_FLOAT_SIZE],
  });

  const animatedLabelColor = isFloating
    ? labelColor || (error ? COLORS.TOAST_ERROR_ICON : focusedBorderColor)
    : COLORS.GRAY_LIGHT;

  const handleFocus = event => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = event => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={style}>
      <View
        style={[
          styles.container,
          isFocused && {borderColor: focusedBorderColor},
          !!error && styles.containerError,
          containerStyle,
        ]}>
        <Animated.Text
          pointerEvents="none"
          style={[
            styles.label,
            {
              top: labelTop,
              fontSize: labelFontSize,
              color: animatedLabelColor,
            },
          ]}>
          {label}
        </Animated.Text>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          placeholder=""
          style={[styles.input, inputStyle]}
          selectionColor={focusedBorderColor}
          {...textInputProps}
        />
      </View>

      {!!error && (
        <StyledText
          color={COLORS.TOAST_ERROR_ICON}
          size={12}
          containerStyle={styles.errorText}>
          {error}
        </StyledText>
      )}
    </View>
  );
};

export default React.memo(Input);
