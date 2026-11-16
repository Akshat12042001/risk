import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon, StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import styles from '../styles';

const CartBar = ({
  count = 1,
  imageUrl,
  expanded = false,
  onPressSummary,
  onGoToCart,
}) => {
  const insets = useSafeAreaInsets();
  const label = `${count} services`;

  return (
    <View style={[styles.cartBar, {paddingBottom: Math.max(insets.bottom, 12)}]}>
      <Pressable style={styles.cartSummary} onPress={onPressSummary}>
        {imageUrl ? (
          <Image
            source={{uri: imageUrl}}
            style={styles.cartThumb}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.cartThumb, styles.cartThumbFallback]}>
            <Icon name="cleaning-services" size={18} color={COLORS.PRIMARY} />
          </View>
        )}
        <StyledText color={COLORS.BLACK} size={14} textStyle={styles.cartCount}>
          {label}
        </StyledText>
        <Icon
          name={expanded ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
          size={20}
          color={COLORS.PRIMARY}
        />
      </Pressable>

      <Pressable style={styles.cartCta} onPress={onGoToCart}>
        <StyledText color={COLORS.WHITE} size={15} textStyle={styles.cartCtaText}>
          Go to cart
        </StyledText>
      </Pressable>
    </View>
  );
};

export default React.memo(CartBar);
