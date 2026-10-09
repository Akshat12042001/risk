import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../constants';

const Icon = ({
  name,
  size = 24,
  color = COLORS.BLACK,
  style,
  ...props
}) => {
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color}
      style={style}
      {...props}
    />
  );
};

export default React.memo(Icon);
