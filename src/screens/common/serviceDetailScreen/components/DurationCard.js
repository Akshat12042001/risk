import React from 'react';
import {Pressable, View} from 'react-native';
import {StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import styles from '../styles';

const DurationCard = ({item, selected, onPress}) => {
  return (
    <Pressable
      style={[styles.durationCard, selected && styles.durationCardSelected]}
      onPress={() => onPress?.(item)}>
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
      <View style={[styles.addButton, selected && styles.addButtonSelected]}>
        <StyledText
          color={selected ? COLORS.WHITE : COLORS.PRIMARY}
          size={14}
          textStyle={styles.addButtonText}>
          {selected ? 'Added' : 'Add'}
        </StyledText>
      </View>
    </Pressable>
  );
};

export default React.memo(DurationCard);
