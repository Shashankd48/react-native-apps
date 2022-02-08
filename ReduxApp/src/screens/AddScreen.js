import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Box,
  Text,
  Button,
  Input,
  FormControl,
  TextArea,
  Heading,
} from 'native-base';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';
import screens from '../config/screens';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

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

function AddScreen({navigation}) {
  const [totalSeason, setTotalSeason] = useState('');
  const [name, setName] = useState('');
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addToList = async () => {
    try {
      console.log(task);
      return;
    } catch (error) {
      console.log(error);
    }
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
                height={200}
                value={task.description}
                onChangeText={text => setTask({...task, description: text})}
                fontSize="md"
              />
            </FormControl>
          </Box>
          <Box alignItems="center" mb={3}>
            <FormControl isInvalid={false} w="100%">
              <FormControl.Label>
                <Text fontSize="lg" fontWeight={500}>
                  Due Date
                </Text>
              </FormControl.Label>
              <Input
                type="text"
                onFocus={() => setShowDatePicker(true)}
                value={
                  task.dueDate ? moment(task.dueDate).format('MMM Do YYYY') : ''
                }
                onChangeText={() => setShowDatePicker(true)}
                fontSize="md"
              />
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={task.dueDate || new Date()}
                  mode={showDatePicker}
                  is24Hour={true}
                  display="default"
                  onChange={(e, selectedDate) => {
                    setTask({...task, dueDate: selectedDate});
                    setShowDatePicker(false);
                  }}
                  onTouchCancel={() => setShowDatePicker(false)}
                />
              )}
            </FormControl>
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