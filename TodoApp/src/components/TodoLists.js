import React from 'react';
import {
  Box,
  Pressable,
  HStack,
  VStack,
  Text,
  Icon,
  useToast,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TodoCard from './TodoCard';
import {useDispatch, useSelector} from 'react-redux';
import {removeTodo, toggleCompleteTodo} from '../actions/todoActions';
import {useNavigation} from '@react-navigation/native';
import screens from '../config/screens';

import ToastMessage from './ToastMessage';

const TodoLists = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const toggleTodo = (rowMap, item) => {
    closeRow(rowMap, item.id);

    if (new Date() <= new Date(item.dueDate)) {
      dispatch(toggleCompleteTodo(item.id));
    } else {
      toast.show({
        render: () => (
          <ToastMessage
            message={
              item.isCompleted
                ? "Task completed and expired! can't modify now 😒"
                : "Task expired can't modify now 😒"
            }
            success={item.isCompleted}
          />
        ),
      });
    }
  };

  const deleteTodo = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    dispatch(removeTodo(rowKey));
    toast.show({
      render: () => {
        return <ToastMessage message="Task deleted" success={false} />;
      },
    });
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const navigate = item => {
    navigation.navigate(screens.add, {
      task: {...item, dueDate: item.dueDate.toString()},
    });
  };

  const renderItem = ({item, index}) => (
    <Box>
      <Pressable
        onPress={() => navigate(item)}
        _dark={{
          bg: 'coolGray.800',
        }}
        _light={{
          bg: 'white',
        }}>
        <TodoCard todo={item} />
      </Pressable>
    </Box>
  );

  const ActionMenu = (data, rowMap) => (
    <HStack
      flex="1"
      pl="2"
      my={2}
      borderWidth={1}
      borderColor="gray.200"
      rounded="sm">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg={data.item.isCompleted ? 'green.500' : 'coolGray.200'}
        justifyContent="center"
        onPress={() => toggleTodo(rowMap, data.item)}
        _pressed={{
          opacity: 0.5,
        }}
        rounded="sm">
        <VStack alignItems="center" space={2} rounded="sm">
          <Icon
            as={
              data.item.isCompleted ? (
                <AntDesign name="checkcircle" />
              ) : (
                <AntDesign name="checkcircleo" />
              )
            }
            size="xs"
            color={data.item.isCompleted ? 'coolGray.100' : 'coolGray.500'}
          />
          <Text
            fontSize="xs"
            fontWeight="medium"
            color={data.item.isCompleted ? 'coolGray.100' : 'gray.900'}>
            {data.item.isCompleted ? 'Finished' : 'Unfinished'}
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteTodo(rowMap, data.item.id)}
        _pressed={{
          opacity: 0.5,
        }}
        rounded="sm">
        <VStack alignItems="center" space={2} rounded="sm">
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={todos}
        renderItem={renderItem}
        renderHiddenItem={ActionMenu}
        rightOpenValue={-140}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
        useFlatList
        keyExtractor={(rowData, index) => {
          return rowData.id.toString();
        }}
      />
    </Box>
  );
};

export default TodoLists;
