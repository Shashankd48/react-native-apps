import React from 'react';
import {Box} from 'native-base';

const ConnectionLive = () => {
  return (
    <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
      Back to online
    </Box>
  );
};

const ConnectionOffline = () => {
  return (
    <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
      No internet!
    </Box>
  );
};

export {ConnectionLive, ConnectionOffline};
