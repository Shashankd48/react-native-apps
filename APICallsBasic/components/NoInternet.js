import React from 'react';
import {Box, Heading, Text} from 'native-base';

const NoInternet = () => {
  return (
    <Box
      height="80%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column">
      <Heading>No Internet!</Heading>
      <Text style={{color: '#282828', fontSize: 16, textAlign: 'center'}}>
        Please connect to internet and pull to refresh.
      </Text>
    </Box>
  );
};

export default NoInternet;
