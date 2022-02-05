import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Box, Button, Input} from 'native-base';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';
import screens from '../config/screens';
import {SeasonContext} from '../context/SeasonContextProvider';
import {TOGGLE_REFRESH} from '../actions/seasonActions';

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
  const {dispatch} = useContext(SeasonContext);

  const addToList = async () => {
    try {
      if (!name || !totalSeason) return alert('Please add both fields');

      const seasonToAdd = {
        id: shortid.generate(),
        totalSeason,
        name,
        isWatched: false,
      };

      const storedValues = await AsyncStorage.getItem('@season_list');
      const prevList = await JSON.parse(storedValues);

      console.log(prevList);

      if (!prevList) {
        const newList = [seasonToAdd];
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
      } else {
        prevList.push(seasonToAdd);
        await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
      }

      dispatch({type: TOGGLE_REFRESH});
      setName('');
      setTotalSeason('');
      navigation.navigate(screens.home);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.heading}>Add to watchlist</Text>
        <Box px={5}>
          <Box alignItems="center">
            <Input
              mx="3"
              placeholder="Webseries Name"
              w="100%"
              value={name}
              onChangeText={text => setName(text)}
            />
          </Box>

          <Box alignItems="center" my={5}>
            <Input
              mx="3"
              placeholder="Season"
              w="100%"
              maxWidth="350px"
              value={totalSeason}
              onChangeText={text => setTotalSeason(text)}
            />
          </Box>
          <Box>
            <Button onPress={addToList}>Add to Watchlist</Button>
          </Box>
        </Box>
      </ScrollView>
    </View>
  );
}

export default AddScreen;
