import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, Image, View} from 'react-native';
import styles, {GAP, IMAGE_WIDTH} from './MarqueeRow.styles';

const MarqueeRow = ({images = [], direction = 'left-to-right', duration = 18000}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const duplicatedImages = useMemo(() => [...images, ...images], [images]);
  const contentWidth = images.length * (IMAGE_WIDTH + GAP);

  useEffect(() => {
    if (!images.length || contentWidth <= 0) {
      return;
    }

    const isLtr = direction === 'left-to-right';
    translateX.setValue(isLtr ? -contentWidth : 0);

    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: isLtr ? 0 : -contentWidth,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();
    return () => animation.stop();
  }, [contentWidth, direction, duration, images.length, translateX]);

  return (
    <View style={styles.row}>
      <Animated.View
        style={[styles.track, {transform: [{translateX}]}]}>
        {duplicatedImages.map((uri, index) => (
          <Image
            key={`${uri}-${index}`}
            source={{uri}}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default MarqueeRow;
