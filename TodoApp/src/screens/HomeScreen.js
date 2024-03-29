import React, {useEffect, useState} from 'react';
import {View, Fab, AddIcon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';
import {StyleSheet} from 'react-native';
import screens from '../config/screens';
import {useDispatch, useSelector} from 'react-redux';
import {storeTodo} from '../actions/todoActions';
import TodoView from '../components/TodoView';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllTask = async () => {
      setIsLoading(true);
      const storedValues = await AsyncStorage.getItem(config.store);
      const prevList = await JSON.parse(storedValues);
      if (prevList) dispatch(storeTodo(prevList));
      setIsLoading(false);
    };

    if (todos?.length <= 0) getAllTask();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : <TodoView />}

      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<AddIcon size={6} />}
        onPress={() => navigation.navigate(screens.add)}
        backgroundColor="yellow.400"
      />
    </View>
  );
};

export default HomeScreen;
