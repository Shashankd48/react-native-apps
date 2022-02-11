import React from 'react';
import {Box, Center, Heading, HStack, Text} from 'native-base';
import TodoLists from './TodoLists';
import {useSelector} from 'react-redux';

function TodoView() {
  const todos = useSelector(state => state.todos);
  return (
    <Center h="95%">
      <Box
        _dark={{
          bg: 'coolGray.800',
        }}
        _light={{
          bg: 'white',
        }}
        flex="1"
        safeAreaTop
        w="96%"
        rounded="sm">
        <Box
          p="3"
          mb={3}
          mt={5}
          rounded="sm"
          borderColor="gray.300"
          borderWidth={1}>
          <Heading color="green.500" size="md" textAlign="center">
            Congratulation! 🎉
          </Heading>
          <Text textAlign="center" fontWeight={500}>
            You have completed {todos.length} Task.👍
          </Text>
          <Box pt={4}>
            <Center>
              <HStack justifyContent="space-between">
                <Text fontSize="md" fontWeight={500} color="yellow.700">
                  ⏳ Pending Task 5
                </Text>
                <Text fontSize="md" fontWeight={500} ml={4} color="danger.700">
                  😰 Expired Task 5
                </Text>
              </HStack>
            </Center>
          </Box>
        </Box>

        <TodoLists />
      </Box>
    </Center>
  );
}

export default TodoView;
