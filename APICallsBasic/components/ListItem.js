import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, HStack, VStack, Text, Avatar, Spacer} from 'native-base';

const ListItem = ({item}) => {
  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      pl="4"
      pr="5"
      py="2">
      <HStack space={3} justifyContent="space-between">
        <Avatar
          size="48px"
          source={{
            uri: item.picture.medium,
          }}
        />
        <VStack>
          <Text
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800"
            bold>
            {item.name}
          </Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            {`${item.location.city}, ${item.location.country}`}
          </Text>
        </VStack>
        <Spacer />
        <Text
          fontSize="xs"
          _dark={{
            color: 'warmGray.50',
          }}
          color="coolGray.800"
          alignSelf="flex-start">
          {item.dob}
        </Text>
      </HStack>
    </Box>
  );
};

export default ListItem;
