import React, {useCallback} from 'react';
import {Pressable, View} from 'react-native';
import {Icon, StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import styles from '../styles';

const FaqItem = ({item, expanded, onToggle}) => {
  const handlePress = useCallback(() => {
    onToggle?.(item.id);
  }, [item.id, onToggle]);

  return (
    <View style={styles.faqCard}>
      <Pressable style={styles.faqHeader} onPress={handlePress}>
        <StyledText
          color={COLORS.BLACK}
          size={14}
          textStyle={styles.faqQuestion}>
          {item.question}
        </StyledText>
        <Icon
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={22}
          color={COLORS.GRAY}
        />
      </Pressable>
      {expanded ? (
        <View style={styles.faqAnswerWrap}>
          <StyledText
            color={COLORS.GRAY}
            size={13}
            textStyle={styles.faqAnswer}>
            {item.answer}
          </StyledText>
        </View>
      ) : null}
    </View>
  );
};

export default React.memo(FaqItem);
