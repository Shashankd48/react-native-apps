import React, {useEffect} from 'react';
import {HStack, VStack, View, Text, Heading} from 'native-base';
import moment from 'moment';

const TodoCard = ({todo}) => {
  const findColor = todo => {
    if (todo.isCompleted) return 'green.400';
    else if (new Date(todo.dueDate) < new Date()) return 'danger.400';
    else if (!todo.isCompleted) return 'yellow.400';
  };

  return (
    <HStack borderColor="gray.200" borderWidth={1} rounded="sm" my={2}>
      <View h="100%" w="1" bg={findColor(todo)} rounded="sm" />
      <VStack p={2} w="100%">
        <Heading size="md" isTruncated maxW="400" w="85%">
          {todo.title}
        </Heading>
        <Text fontSize="md" mt={1} isTruncated maxW="400" w="85%">
          {todo.description}
        </Text>
        <Text fontSize="sm" fontWeight={500} mt={1} color="gray.700">
          Due date {moment(todo.dueDate).calendar()}
        </Text>
      </VStack>
    </HStack>
  );
};

export default TodoCard;
