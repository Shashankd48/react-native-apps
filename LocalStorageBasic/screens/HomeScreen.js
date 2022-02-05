import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Fab, Box, AddIcon} from 'native-base';
import screens from '../config/screens';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Loading from '../components/Loading';
import NoWatchList from '../components/NoWatchList';
import Watchlist from '../components/Watchlist';
import {SeasonContext} from '../context/SeasonContextProvider';
import {TOGGLE_REFRESH} from '../actions/seasonActions';

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

function HomeScreen({navigation, route}) {
  const [seasons, setSeasons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {refreshScreen, dispatch} = useContext(SeasonContext);

  useEffect(() => {
    getSeasonsList();
    return;
  }, []);

  useEffect(() => {
    if (refreshScreen) {
      dispatch({type: TOGGLE_REFRESH});
      getSeasonsList();
      return;
    }
  }, [refreshScreen == true]);

  const getSeasonsList = async () => {
    setIsLoading(true);
    try {
      const data = await AsyncStorage.getItem('@season_list');
      const storedValues = await JSON.parse(data);
      if (!storedValues) {
        setIsLoading(false);
        setSeasons([]);
        return;
      }

      setSeasons(storedValues.reverse());
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteSeason = async id => {
    const newList = seasons.filter(season => season.id != id);
    setSeasons(newList);
    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
  };

  const markWatched = async id => {
    let tempList = [...seasons];
    const findIndex = tempList.findIndex(season => season.id == id);
    if (findIndex != -1) {
      tempList[findIndex].isWatched = !tempList[findIndex].isWatched;
      setSeasons(tempList);
      await AsyncStorage.setItem('@season_list', JSON.stringify(tempList));
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <Box style={styles.container}>
          {seasons.length === 0 ? (
            <NoWatchList />
          ) : (
            <Watchlist
              seasons={seasons}
              markWatched={markWatched}
              deleteSeason={deleteSeason}
            />
          )}
        </Box>
      )}

      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<AddIcon size={6} />}
        onPress={() => navigation.navigate(screens.add)}
      />
    </View>
  );
}

export default HomeScreen;
