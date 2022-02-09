import React, {useState} from 'react';
import {Box, Center, Heading} from 'native-base';
import TodoLists from './TodoLists';

function TodoView() {
  return (
    <Center h="100%">
      <Box
        _dark={{
          bg: 'coolGray.800',
        }}
        _light={{
          bg: 'white',
        }}
        flex="1"
        safeAreaTop
        maxW="400px"
        w="98%">
        <Heading p="4" pb="3" size="lg">
          You Tasks
        </Heading>
        <TodoLists />
      </Box>
    </Center>
  );
}

export default TodoView;
