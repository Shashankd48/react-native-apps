import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import {
  Box,
  Text,
  Button,
  Input,
  FormControl,
  TextArea,
  HStack,
  useToast,
} from 'native-base';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';
import screens from '../config/screens';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {addTodo, updateTodo} from '../actions/todoActions';
import config from '../config';
import {useDispatch} from 'react-redux';
import {useRoute, useIsFocused} from '@react-navigation/native';
import ToastMessage from '../components/ToastMessage';

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
  id: null,
  title: '',
  description: '',
  dueDate: '',
};

function AddScreen({navigation}) {
  const [task, setTask] = useState(emptyTask);
  const [showDateTimeModal, setShowDateTimeModal] = useState({
    date: false,
    time: false,
  });
  const dispatch = useDispatch();
  const route = useRoute();
  const focused = useIsFocused();
  const toast = useToast();

  useEffect(() => {
    if (route.params) {
      const {task: data} = route.params;
      navigation.setOptions({title: 'Update Task'});

      if (data) setTask(data);
    }
  }, [focused]);

  const handleSubmit = async () => {
    try {
      if (task.title === '')
        return toast.show({
          render: () => (
            <ToastMessage message="Title Required 😰" success={false} />
          ),
        });
      else if (task.dueDate === '')
        return toast.show({
          render: () => (
            <ToastMessage message="Due Date Required 😰" success={false} />
          ),
        });

      if (task.id) {
        dispatch(updateTodo(task));
        toast.show({
          render: () => (
            <ToastMessage message="Task updated 😁" success={true} />
          ),
        });
      } else {
        const taskToAdd = {...task, id: shortid.generate(), isCompleted: false};
        dispatch(addTodo(taskToAdd));
        const storedValues = await AsyncStorage.getItem(config.store);
        let prevList = await JSON.parse(storedValues);
        console.log(prevList);
        if (!prevList || prevList.length <= 0) {
          toast.show({
            render: () => (
              <ToastMessage
                message="🎉 Congratulations on 1st task 🎉"
                success={true}
              />
            ),
          });
          const newList = [taskToAdd];
          await AsyncStorage.setItem(config.store, JSON.stringify(newList));
        } else {
          toast.show({
            render: () => (
              <ToastMessage message="New task added 👍" success={true} />
            ),
          });
          prevList = [taskToAdd, ...prevList];
          await AsyncStorage.setItem(config.store, JSON.stringify(prevList));
        }
      }

      setTask(emptyTask);
      navigation.navigate(screens.home);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTime = selectedDate => {
    setShowDateTimeModal({...showDateTimeModal, time: false});

    try {
      if (task.dueDate) {
        console.log('log: selectedDate', selectedDate.toString());
        console.log('log: due', new Date(task.dueDate).toString());
        const date = new Date(task.dueDate).toString().substring(0, 16);
        const time = selectedDate.toString().substr(16, task.dueDate.length);

        console.log('log: New', date + time);

        setTask({...task, dueDate: new Date(date + time)});
      } else {
        setTask({...task, dueDate: selectedDate});
      }
    } catch (error) {
      setTask({...task, dueDate: new Date()});
    }
  };

  const handleDate = selectedDate => {
    setShowDateTimeModal({...showDateTimeModal, date: false});
    setTask({...task, dueDate: selectedDate});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <Box p={5}>
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
                value={task.dueDate ? new Date(task.dueDate) : new Date()}
                mode="date"
                onChange={(e, selectedDate) => handleDate(selectedDate)}
                onTouchCancel={() =>
                  setShowDateTimeModal({...showDateTimeModal, date: false})
                }
                isVisible={showDateTimeModal.date}
                display="spinner"
                minimumDate={new Date()}
              />
            )}
            {showDateTimeModal.time && (
              <DateTimePicker
                testID="timePicker"
                value={task.dueDate ? new Date(task.dueDate) : new Date()}
                mode="time"
                onChange={(e, selectedDate) => handleTime(selectedDate)}
                onTouchCancel={() =>
                  setShowDateTimeModal({...showDateTimeModal, time: false})
                }
                isVisible={showDateTimeModal.time}
                display="spinner"
              />
            )}
          </Box>

          <Box>
            <Button onPress={handleSubmit} backgroundColor="yellow.400">
              <Text color="gray.900" fontSize="md">
                {task.id ? 'Update Task' : 'Add Task'}
              </Text>
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </View>
  );
}

export default AddScreen;
