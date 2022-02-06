import React, {Fragment, useEffect, useState} from 'react';
import {View, useToast, Box, Heading} from 'native-base';
import UserList from '../components/UserList';
import axios from 'axios';
import moment from 'moment';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import Loading from '../components/Loading';
import {useNetInfo} from '@react-native-community/netinfo';
import {ConnectionLive, ConnectionOffline} from '../components/Toasts';
import NoInternet from '../components/NoInternet';

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
        duration: 2000,
      });
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
        {isLoading && !error ? (
          <Fragment>
            <Loading />
          </Fragment>
        ) : (
          <Fragment>
            {netInfo.isConnected == false && error ? (
              <NoInternet />
            ) : (
              <UserList users={users} />
            )}
          </Fragment>
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
