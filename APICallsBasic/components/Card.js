import React, {useEffect, useState} from 'react';
import {VStack, Box, Divider} from 'native-base';
import {StyleSheet} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default function Card() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const request = await axios.get('https://randomuser.me/api/?results=1');
      const data = await request.data;
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box border="1" borderRadius="md" style={styles.container}>
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pt="4">
          NativeBase
        </Box>
        <Box px="4">
          NativeBase is a free and open source framework that enable developers
          to build high-quality mobile apps using React Native iOS and Android
          apps with a fusion of ES6.
        </Box>
        <Box px="4" pb="4">
          GeekyAnts
        </Box>
      </VStack>
    </Box>
  );
}
