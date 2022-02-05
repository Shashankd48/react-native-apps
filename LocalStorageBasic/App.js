/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';
import AddScreen from './screens/AddScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screens from './config/screens';
import {NativeBaseProvider} from 'native-base';
import HeaderTitle from './components/HeaderTitle';
import SeasonContextProvider from './context/SeasonContextProvider';

const Stack = createNativeStackNavigator();

const App = () => {
  const navigationOption = {
    headerStyle: {
      backgroundColor: '#0f4c75',
      paddingHorizontal: 0,
    },
    headerTitleAlign: 'center',
  };
  return (
    <SeasonContextProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={screens.home}>
            <Stack.Screen
              name={screens.home}
              component={HomeScreen}
              options={{
                ...navigationOption,
                headerTitle: props => (
                  <HeaderTitle {...props} title="Watchlist" />
                ),
              }}
            />
            <Stack.Screen
              name={screens.edit}
              component={EditScreen}
              options={{
                ...navigationOption,
                headerTitle: props => (
                  <HeaderTitle {...props} title="Edit Watchlist" />
                ),
              }}
            />
            <Stack.Screen
              name={screens.add}
              component={AddScreen}
              options={{
                ...navigationOption,
                headerTitle: props => (
                  <HeaderTitle {...props} title="Add Watchlist" />
                ),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SeasonContextProvider>
  );
};

export default App;
