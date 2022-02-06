import React, {useEffect, useState} from 'react';
import {View, useToast, Box, Heading} from 'native-base';
import UserList from '../components/UserList';
import axios from 'axios';
import moment from 'moment';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import Loading from '../components/Loading';
import {useNetInfo} from '@react-native-community/netinfo';

export function getRandomUsers(resultCount) {
  let request = axios.get(`https://randomuser.me/api/?results=${resultCount}`);
  return request
    .then(result => {
      return result.data;
    })
    .catch(error => {
      return error.response.data;
    });
}

const ConnectionLive = () => {
  return (
    <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
      Back to online
    </Box>
  );
};

const ConnectionOffline = () => {
  return (
    <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
      No internet!
    </Box>
  );
};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function HomeScreen() {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const toast = useToast();
  const netInfo = useNetInfo();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(300).then(() => {
      setRefreshing(false);
      getUsers();
    });
  }, []);

  const getUsers = async () => {
    setIsLoading(true);
    getRandomUsers(7)
      .then(data => {
        if (!data && data.results.length <= 0) {
          setIsLoading(false);
          setError(true);
          return;
        }
        const tempUsers = data.results.map(item => {
          return {
            id: item.login.uuid,
            name: `${item.name.first} ${item.name.last}`,
            location: {
              city: item.location.city,
              state: item.location.city,
              country: item.location.country,
            },
            email: item.email,
            dob: moment(item.dob.date).format('MMM Do YYYY'),
            age: item.dob.age,
            phone: item.phone,
            cell: item.cell,
            picture: {
              large: item.picture.large,
              medium: item.picture.medium,
            },
            gender: item.gender,
          };
        });
        console.log(tempUsers[0]);
        setUsers(tempUsers);
        setIsLoading(false);
        setError(false);
      })
      .catch(error => {
        setIsLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    getUsers();
    return;
  }, []);

  useEffect(() => {
    if (netInfo.isConnected != null) {
      setError(!netInfo.isConnected);
      toast.show({
        render: netInfo.isConnected
          ? () => ConnectionLive()
          : () => ConnectionOffline(),
        duration: 1500,
      });
      console.log('log: ', netInfo.isConnected);
    }

    return;
  }, [netInfo.isConnected]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoading && !error && netInfo.isConnected == false ? (
          <Loading />
        ) : (
          <UserList users={users} />
        )}

        {netInfo.isConnected == false && error && (
          <Box
            height="80%"
            justifyContent="center"
            alignItems="center"
            flexDirection="column">
            <Heading>No Internet!</Heading>
            <Text style={{color: '#282828', fontSize: 16, textAlign: 'center'}}>
              Please connect to internet and pull to refresh.
            </Text>
          </Box>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
