import {Box} from 'native-base';
import React from 'react';

const ToastMessage = ({message, success = true}) => {
  return (
    <Box
      bg={success ? 'emerald.500' : 'danger.500'}
      px="2"
      py="1"
      rounded="sm"
      mb={5}>
      {message}
    </Box>
  );
};

export default ToastMessage;
