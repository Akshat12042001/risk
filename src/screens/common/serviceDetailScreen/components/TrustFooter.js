import React from 'react';
import {Image, View} from 'react-native';
import {StyledText} from '../../../../components/atoms';
import {COLORS} from '../../../../constants';
import styles from '../styles';

const TrustStat = ({stat}) => (
  <View style={styles.trustStat}>
    <View style={styles.laurel}>
      <StyledText color={COLORS.GRAY} size={11} textStyle={styles.trustLabel}>
        {stat.label}
      </StyledText>
      <StyledText color={COLORS.BLACK} size={20} textStyle={styles.trustValue}>
        {stat.value}
      </StyledText>
      <StyledText color={COLORS.GRAY} size={11} textStyle={styles.trustSuffix}>
        {stat.suffix}
      </StyledText>
    </View>
  </View>
);

const TrustFooter = ({trust, proImage}) => {
  return (
    <View style={styles.trustSection}>
      <StyledText color={COLORS.BLACK} size={18} textStyle={styles.trustTitle}>
        {trust.title}
      </StyledText>

      <View style={styles.trustStatsRow}>
        <TrustStat stat={trust.left} />
        <TrustStat stat={trust.right} />
      </View>

      {proImage ? (
        <View style={styles.proImageWrap}>
          <View style={styles.skyline}>
            {[12, 40, 70, 105, 140, 175, 210].map((left, index) => (
              <View
                key={left}
                style={[
                  styles.skylineBlock,
                  {
                    left,
                    height: 28 + ((index * 17) % 40),
                    width: 18 + (index % 3) * 8,
                  },
                ]}
              />
            ))}
          </View>
          <Image
            source={{uri: proImage}}
            style={styles.proImage}
            resizeMode="contain"
          />
        </View>
      ) : null}
    </View>
  );
};

export default React.memo(TrustFooter);
