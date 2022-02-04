import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Box, Button, Input} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import screens from '../config/screens';

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

const emptySeason = {
  id: '',
  name: '',
  isWatched: false,
  totalSeason: '',
};

function EditScreen({navigation, route}) {
  const [season, setSeason] = useState(emptySeason);

  useEffect(() => {
    const {season: data} = route.params;
    if (data) setSeason(data);
  }, []);

  const updateSeason = async () => {
    try {
      if (!season.name || !season.totalSeason)
        return alert('Please add both fields');

      const storedValues = await AsyncStorage.getItem('@season_list');
      const tempList = await JSON.parse(storedValues);

      const findIndex = tempList.findIndex(item => item.id == season.id);
      if (findIndex != -1) {
        tempList[findIndex] = {...season};
        await AsyncStorage.setItem('@season_list', JSON.stringify(tempList));
      }

      setSeason(emptySeason);
      navigation.navigate(screens.home);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.heading}>Edit</Text>
        <Box px={5}>
          <Box alignItems="center">
            <Input
              mx="3"
              placeholder="Webseries Name"
              w="100%"
              value={season.name}
              onChangeText={text => setSeason({...season, name: text})}
            />
          </Box>

          <Box alignItems="center" my={5}>
            <Input
              mx="3"
              placeholder="Season"
              w="100%"
              maxWidth="350px"
              value={season.totalSeason}
              onChangeText={text => setSeason({...season, totalSeason: text})}
            />
          </Box>
          <Box>
            <Button onPress={updateSeason}>Update Season</Button>
          </Box>
        </Box>
      </ScrollView>
    </View>
  );
}

export default EditScreen;
