import React from 'react';
import {Box, Center, Heading, Text} from 'native-base';
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
        w="98%">
        <Box p="4" pb="3">
          <Heading>You Tasks</Heading>
          <Text fontSize="md">Swipe right for actions.</Text>
        </Box>

        <TodoLists />
      </Box>
    </Center>
  );
}

export default TodoView;
