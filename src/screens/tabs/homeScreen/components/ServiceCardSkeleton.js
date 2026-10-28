import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import styles from './ServiceCardSkeleton.styles';

const ServiceCardSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.imageArea, {opacity}]} />
      <View style={styles.info}>
        <Animated.View style={[styles.nameLine, {opacity}]} />
        <Animated.View style={[styles.priceLine, {opacity}]} />
      </View>
    </View>
  );
};

export default React.memo(ServiceCardSkeleton);
