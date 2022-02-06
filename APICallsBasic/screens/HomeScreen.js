import React, {useEffect, useState} from 'react';
import {View} from 'native-base';
import UserList from '../components/UserList';
import axios from 'axios';
import moment from 'moment';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import Loading from '../components/Loading';

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(300).then(() => {
      setRefreshing(false);
      getUsers();
    });
  }, []);

  const getUsers = async () => {
    setIsLoading(true);
    getRandomUsers(7).then(data => {
      if (!data && data.results.length <= 0) return;
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
    });
  };

  useEffect(() => {
    getUsers();
    return;
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoading ? <Loading /> : <UserList users={users} />}
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
