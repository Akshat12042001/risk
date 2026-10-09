import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {Icon, StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import styles from './ServiceCard.styles';

const ServiceCard = ({item, onPress}) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageArea}>
        <Image source={{uri: item.image}} style={styles.image} resizeMode="contain" />

        {item.isNew ? (
          <View style={styles.newBadge}>
            <StyledText color={COLORS.WHITE} size={9} textStyle={styles.newText}>
              NEW
            </StyledText>
          </View>
        ) : null}

        <View style={styles.ratingBadge}>
          <Icon name="star" size={10} color="#FBBF24" />
          <StyledText color={COLORS.BLACK} size={9} textStyle={styles.ratingText}>
            {item.rating} ({item.ratingCount})
          </StyledText>
        </View>
      </View>

      <View style={styles.info}>
        <StyledText
          color={COLORS.BLACK}
          size={12}
          numberOfLines={2}
          textStyle={styles.name}>
          {item.name}
        </StyledText>
        <View style={styles.priceRow}>
          <StyledText color={COLORS.BLACK} size={13} textStyle={styles.price}>
            ₹{item.price}
          </StyledText>
          {item.originalPrice ? (
            <StyledText
              color={COLORS.GRAY_LIGHT}
              size={11}
              textStyle={styles.originalPrice}>
              ₹{item.originalPrice}
            </StyledText>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export default React.memo(ServiceCard);
