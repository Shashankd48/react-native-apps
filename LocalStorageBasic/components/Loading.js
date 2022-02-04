import React from 'react';
import {Heading, HStack, Spinner} from 'native-base';

const Loading = () => {
  return (
    <HStack space={2} justifyContent="center" flex={1} alignItems="center">
      <Spinner accessibilityLabel="Loading posts" size="lg" />
      <Heading color="primary.500" fontSize="xl">
        Loading...
      </Heading>
    </HStack>
  );
};

export default Loading;
