import React, {useCallback} from 'react';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../../constants';
import Icon from '../icon';
import StyledText from '../styledText';
import styles from './styles';

const Header = ({
  title,
  onBack,
  showBack = true,
  titleAlign = 'left',
  backgroundColor = COLORS.WHITE,
  titleColor = COLORS.BLACK,
  iconColor = COLORS.BLACK,
  titleSize = 20,
  style,
}) => {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation, onBack]);

  const isCentered = titleAlign === 'center';

  return (
    <View style={[styles.container, {backgroundColor}, style]}>
      {showBack ? (
        <Pressable style={styles.backButton} onPress={handleBack} hitSlop={8}>
          <Icon name="arrow-back" size={24} color={iconColor} />
        </Pressable>
      ) : (
        <View style={styles.backButton} />
      )}

      {isCentered ? (
        <View style={styles.titleCenterWrap} pointerEvents="none">
          <StyledText
            color={titleColor}
            size={titleSize}
            textAlign="center"
            textStyle={styles.titleCenter}>
            {title}
          </StyledText>
        </View>
      ) : (
        <StyledText
          color={titleColor}
          size={titleSize}
          textStyle={styles.titleLeft}>
          {title}
        </StyledText>
      )}
    </View>
  );
};

export default React.memo(Header);
