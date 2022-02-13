import React from 'react';
import {Heading, HStack, Spinner} from 'native-base';

const Loading = () => {
  return (
    <HStack space={2} justifyContent="center" flex={1} alignItems="center">
      <Spinner
        accessibilityLabel="Loading posts"
        size="lg"
        color="yellow.400"
      />
      <Heading fontSize="2xl">Loading...</Heading>
    </HStack>
  );
};

export default Loading;
