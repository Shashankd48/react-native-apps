import {Box, Text, Avatar, Heading} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    height: 400,
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    padding: 20,
  },
});

const ProfileCard = ({profile}) => {
  return (
    <Box style={styles.container}>
      <Box style={styles.card}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Avatar
            size="138px"
            source={{
              uri: profile.picture.large,
            }}
          />
          <Heading mt={5} color="gray.900">
            {profile.name}
          </Heading>
          <Heading mt={2} color="gray.900" size="sm">
            {profile.email}
          </Heading>
          <Text fontSize={16} mt={2} textAlign="center">
            From
            {` ${profile.location.city}, ${profile.location.state}, ${profile.location.country}  `}
          </Text>
          <Text fontSize={16} mt={2} textAlign="center">
            Born in {profile.dob}
          </Text>
          <Text fontSize={16} mt={2} textAlign="center">
            I'am {profile.age} year old
          </Text>
        </Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default ProfileCard;
