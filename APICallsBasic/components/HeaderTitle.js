import React from 'react';
import {Text} from 'react-native';

const HeaderTitle = ({title}) => {
  return (
    <Text
      style={{
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 1,
        color: '#000',
      }}>
      {title}
    </Text>
  );
};

export default HeaderTitle;
