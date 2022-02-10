/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './store';
import screens from './config/screens';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const navigationOption = {
    headerStyle: {
      backgroundColor: '#fff',
      paddingHorizontal: 0,
    },
    headerTitleAlign: 'center',
  };

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <Stack.Navigator initialRouteName={screens.add}>
              <Stack.Screen
                name={screens.home}
                component={HomeScreen}
                options={{
                  ...navigationOption,
                }}
              />
              <Stack.Screen
                name={screens.add}
                component={AddScreen}
                options={{
                  ...navigationOption,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
