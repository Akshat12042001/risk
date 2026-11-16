import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {Icon, StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import styles from './HomeCartBar.styles';

const HomeCartBar = ({
  count = 0,
  countLabel,
  serviceName = '',
  imageUrl,
  onPressSummary,
  onGoToCart,
}) => {
  if (!count) {
    return null;
  }

  const label =
    countLabel || `${count} ${count === 1 ? 'service' : 'services'}`;

  return (
    <View style={styles.wrap}>
      <Pressable style={styles.summary} onPress={onPressSummary}>
        {imageUrl ? (
          <Image
            source={{uri: imageUrl}}
            style={styles.thumb}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.thumb, styles.thumbFallback]}>
            <Icon name="cleaning-services" size={18} color={COLORS.PRIMARY} />
          </View>
        )}
        <View style={styles.textBlock}>
          <View style={styles.countRow}>
            <StyledText
              color={COLORS.BLACK}
              size={14}
              textStyle={styles.countText}>
              {label}
            </StyledText>
            <Icon name="keyboard-arrow-up" size={18} color={COLORS.PRIMARY} />
          </View>
          {serviceName ? (
            <StyledText
              color={COLORS.GRAY}
              size={12}
              numberOfLines={1}
              textStyle={styles.serviceName}>
              {serviceName}
            </StyledText>
          ) : null}
        </View>
      </Pressable>

      <Pressable style={styles.cta} onPress={onGoToCart}>
        <StyledText color={COLORS.WHITE} size={14} textStyle={styles.ctaText}>
          Go to cart
        </StyledText>
      </Pressable>
    </View>
  );
};

export default React.memo(HomeCartBar);
