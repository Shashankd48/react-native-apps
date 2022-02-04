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
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import Card from './components/Card';
import UserList from './components/UserList';
import HomeScreen from './screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const navigationOption = {
    headerStyle: {
      backgroundColor: '#0f4c75',
      paddingHorizontal: 0,
    },
    headerTitleAlign: 'center',
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{...navigationOption}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;
