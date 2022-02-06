import React from 'react';
import {Box, Heading, FlatList} from 'native-base';
import {TouchableOpacity} from 'react-native';
import ListItem from './ListItem';
import {useNavigation} from '@react-navigation/native';

const UserList = ({users}) => {
  const navigation = useNavigation();

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Friends
      </Heading>
      <Box>
        {users.map(item => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {profile: item})}
            key={item.id}>
            <ListItem item={item} />
          </TouchableOpacity>
        ))}
      </Box>
    </Box>
  );
};

export default UserList;
