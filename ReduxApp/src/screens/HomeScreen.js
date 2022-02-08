import React, {useEffect} from 'react';
import {View, Text} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';

const HomeScreen = () => {
  const getAllTask = async () => {
    const storedValues = await AsyncStorage.getItem(config.store);
    const prevList = await JSON.parse(storedValues);
  };
  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <View>
      <Text color="#000">Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
