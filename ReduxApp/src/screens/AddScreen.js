import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  Box,
  Text,
  Button,
  Input,
  FormControl,
  TextArea,
  Heading,
  VStack,
  HStack,
} from 'native-base';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';
import screens from '../config/screens';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {addTodo} from '../actions/todoActions';
import config from '../config';
import {useDispatch} from 'react-redux';
import HomeScreen from './HomeScreen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '500',
  },
});

const emptyTask = {
  title: '',
  description: '',
  dueDate: '',
  time: '',
};

function AddScreen({navigation}) {
  const [task, setTask] = useState(emptyTask);
  const [showDateTimeModal, setShowDateTimeModal] = useState({
    date: false,
    time: false,
  });
  const dispatch = useDispatch();

  const addToList = async () => {
    try {
      if (task.title === '' || task.dueDate === '')
        return alert('Please add title and due date!');

      const taskToAdd = {...task, id: shortid.generate(), isCompleted: false};

      console.log(taskToAdd);

      const storedValues = await AsyncStorage.getItem(config.store);
      const prevList = await JSON.parse(storedValues);

      console.log(prevList);

      dispatch(addTodo(taskToAdd));

      if (!prevList) {
        const newList = [taskToAdd];
        await AsyncStorage.setItem(config.store, JSON.stringify(newList));
      } else {
        prevList.push(taskToAdd);
        await AsyncStorage.setItem(config.store, JSON.stringify(prevList));
      }

      setTask(emptyTask);
      navigation.navigate(screens.home);
    } catch (error) {
      console.log(error);
    }
  };

  const yesterday = moment().subtract(1, 'day');
  const disablePastDt = current => {
    return current.isAfter(yesterday);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Heading alignSelf="center" my="5">
          Create New Task
        </Heading>
        <Box px={5}>
          <Box alignItems="center" mb={3}>
            <FormControl isInvalid={false} w="100%" isRequired>
              <FormControl.Label>
                <Text fontSize="lg" fontWeight={500}>
                  Title
                </Text>
              </FormControl.Label>
              <Input
                placeholder="Enter title"
                type="text"
                onChangeText={text => setTask({...task, title: text})}
                value={task.title}
                fontSize="md"
              />
            </FormControl>
          </Box>
          <Box alignItems="center" mb={3}>
            <FormControl isInvalid={false} w="100%">
              <FormControl.Label>
                <Text fontSize="lg" fontWeight={500}>
                  Description
                </Text>
              </FormControl.Label>
              <TextArea
                placeholder="Please describe you task..."
                numberOfLines={6}
                height={160}
                value={task.description}
                onChangeText={text => setTask({...task, description: text})}
                fontSize="md"
              />
            </FormControl>
          </Box>
          <Box alignItems="center" mb={3}>
            <FormControl isInvalid={false} w="100%" isRequired>
              <FormControl.Label>
                <Text fontSize="lg" fontWeight={500}>
                  Due Date
                </Text>
              </FormControl.Label>
              <HStack>
                <Box w="50%">
                  <Pressable
                    onPress={() =>
                      setShowDateTimeModal({
                        ...showDateTimeModal,
                        date: true,
                      })
                    }>
                    <Input
                      type="text"
                      value={
                        task.dueDate ? moment(task.dueDate).format('ll') : ''
                      }
                      editable={false}
                      fontSize="md"
                      placeholder="Date"
                    />
                  </Pressable>
                </Box>
                <Box pl={2} w="50%">
                  <Pressable
                    onPress={() =>
                      setShowDateTimeModal({
                        ...showDateTimeModal,
                        time: true,
                      })
                    }>
                    <Input
                      type="text"
                      value={
                        task.dueDate ? moment(task.dueDate).format('LT') : ''
                      }
                      editable={false}
                      fontSize="md"
                      placeholder="Time"
                    />
                  </Pressable>
                </Box>
              </HStack>
            </FormControl>
          </Box>

          <Box mb={2}>
            {showDateTimeModal.date && (
              <DateTimePicker
                testID="datePicker"
                value={task.dueDate || new Date()}
                mode="date"
                onChange={(e, selectedDate) => {
                  console.log(selectedDate);
                  setShowDateTimeModal({...showDateTimeModal, date: false});
                  setTask({...task, dueDate: selectedDate});
                }}
                onTouchCancel={() =>
                  setShowDateTimeModal({...showDateTimeModal, date: false})
                }
                isVisible={showDateTimeModal.time}
                display="spinner"
                minimumDate={new Date()}
              />
            )}
            {showDateTimeModal.time && (
              <DateTimePicker
                testID="timePicker"
                value={task.dueDate || new Date()}
                mode="time"
                onChange={(e, selectedDate) => {
                  console.log(selectedDate);
                  setShowDateTimeModal({...showDateTimeModal, time: false});
                  setTask({...task, time: selectedDate});
                }}
                onTouchCancel={() =>
                  setShowDateTimeModal({...showDateTimeModal, time: false})
                }
                display="spinner"
              />
            )}
          </Box>

          <Box>
            <Button onPress={addToList} backgroundColor="yellow.400">
              <Text color="gray.900" fontSize="md">
                Add Task
              </Text>
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </View>
  );
}

export default AddScreen;
