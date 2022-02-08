import React from 'react';
import {
  Box,
  Avatar,
  HStack,
  VStack,
  Text,
  Button,
  Spacer,
  Checkbox,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import screens from '../config/screens';

const ListItem = ({item, markWatched, deleteSeason}) => {
  const navigation = useNavigation();

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
      <HStack space={3} justifyContent="space-between" alignItems="center">
        <Avatar size="48px" bg="coolGray.600">
          <Text
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.100"
            bold
            fontSize={20}>
            {item.name[0]}
          </Text>
        </Avatar>
        <VStack>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screens.edit, {season: item});
            }}>
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
              Season {item.totalSeason}
            </Text>
          </TouchableOpacity>
        </VStack>
        <Spacer />
        <HStack alignItems="center">
          <Button
            size="md"
            variant="ghost"
            colorScheme="secondary"
            onPress={() => deleteSeason(item.id)}>
            Delete
          </Button>

          <Box ml={3}>
            <Checkbox
              value={item.id}
              accessibilityLabel="This is a dummy checkbox"
              isChecked={item.isWatched}
              onChange={value => markWatched(item.id)}
            />
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};

export default ListItem;
