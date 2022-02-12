import {Box, Center, Heading, Text} from 'native-base';
import React from 'react';
import {Image} from 'react-native';
import todoImage from '../assets/todoList.png';

const NoTodoFound = () => {
  return (
    <Center>
      <Box
        px={2}
        py={5}
        width="85%"
        alignItems="center"
        justifyContent="center"
        height={400}>
        <Image
          source={todoImage}
          alt="Alternate Text"
          style={{
            height: 180,
            width: '100%',
          }}
        />
        <Box pt={6}>
          <Heading textAlign="center">No Tasks Created Yet❗</Heading>
          <Text
            textAlign="center"
            fontSize="md"
            fontWeight={500}
            color="gray.500">
            Click on the add button to get started. 🤪
          </Text>
        </Box>
      </Box>
    </Center>
  );
};

export default NoTodoFound;
