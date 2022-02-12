import React, {useEffect, useState} from 'react';
import {Box, Center, Heading, HStack, Text} from 'native-base';
import TodoLists from './TodoLists';
import {useSelector} from 'react-redux';
import NoTodoFound from './NoTodoFound';

function TodoView() {
  const todos = useSelector(state => state.todos);
  const [taskStatus, setTaskStatus] = useState({
    pending: 0,
    expired: 0,
    completed: 0,
  });

  useEffect(() => {
    if (todos.length) {
      let pending = 0;
      let expired = 0;
      let completed = 0;
      todos.map(todo => {
        if (todo.isCompleted) completed++;
        else if (new Date(todo.dueDate) < new Date()) expired++;
        else pending++;
      });
      setTaskStatus({pending, expired, completed});
    }
  }, [todos]);

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
            {taskStatus.completed ? 'Congratulation! 🎉' : 'Keep Working 💪🏻'}
          </Heading>
          <Text textAlign="center" fontWeight={500}>
            {taskStatus.completed
              ? `You have completed ${taskStatus.completed} Task.👍`
              : 'We will keep you updated! 😊'}
          </Text>
          <Box pt={4}>
            <Center>
              <HStack justifyContent="space-between">
                <Text fontSize="md" fontWeight={500} color="yellow.700">
                  ⏳ Pending Task {taskStatus.pending}
                </Text>
                <Text fontSize="md" fontWeight={500} ml={4} color="danger.700">
                  😰 Expired Task {taskStatus.expired}
                </Text>
              </HStack>
            </Center>
          </Box>
        </Box>

        {todos.length > 0 ? <TodoLists /> : <NoTodoFound />}
      </Box>
    </Center>
  );
}

export default TodoView;
