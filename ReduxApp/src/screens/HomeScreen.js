import React, {useEffect} from 'react';
import {
  View,
  Text,
  Fab,
  AddIcon,
  HStack,
  Center,
  VStack,
  Heading,
  ScrollView,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';
import {StyleSheet} from 'react-native';
import screens from '../config/screens';
import {useDispatch, useSelector} from 'react-redux';
import {storeTodo} from '../actions/todoActions';
import moment from 'moment';

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

const TodoCard = ({todo}) => {
  return (
    <HStack borderColor="gray.200" borderWidth={1} rounded="sm" my={1}>
      <View h="100%" w="1" bg="yellow.400" />
      <VStack px={2} py={3}>
        <Heading size="md">{todo.title}</Heading>
        <Text fontSize="md" mt={1}>
          {todo.description}
        </Text>
        <Text fontSize="sm" fontWeight={500} mt={1}>
          Due date {moment(todo.dueDate).calendar()}
        </Text>
        <View></View>
      </VStack>
    </HStack>
  );
};

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    const getAllTask = async () => {
      const storedValues = await AsyncStorage.getItem(config.store);
      const prevList = await JSON.parse(storedValues);
      dispatch(storeTodo(prevList.reverse()));
    };
    if (todos.length <= 0) getAllTask();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View padding={1} rounded="sm">
        <ScrollView>
          {todos.map(todo => (
            <TodoCard todo={todo} key={todo.id} />
          ))}
        </ScrollView>
      </View>

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
