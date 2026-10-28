import React from 'react';
import {Pressable, View} from 'react-native';
import {StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import styles from '../styles';

const DurationCard = ({item, onAdd}) => {
  return (
    <View style={styles.durationCard}>
      <StyledText color={COLORS.BLACK} size={15} textStyle={styles.durationLabel}>
        {item.label}
      </StyledText>
      <View style={styles.priceRow}>
        <StyledText color={COLORS.BLACK} size={15} textStyle={styles.price}>
          ₹{item.price}
        </StyledText>
        {item.originalPrice ? (
          <StyledText
            color={COLORS.GRAY_LIGHT}
            size={13}
            textStyle={styles.originalPrice}>
            ₹{item.originalPrice}
          </StyledText>
        ) : null}
      </View>
      <Pressable style={styles.addButton} onPress={() => onAdd?.(item)}>
        <StyledText
          color={COLORS.PRIMARY}
          size={14}
          textStyle={styles.addButtonText}>
          Add
        </StyledText>
      </Pressable>
    </View>
  );
};

export default React.memo(DurationCard);
