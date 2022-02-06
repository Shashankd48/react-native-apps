import {Box, Text, Avatar, Heading} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// const myIcon = ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    height: 500,
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

        <Box style={{paddingVertical: 15}}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}>
            <Box flex="1" flexDirection="row" alignItems="center">
              <Box width="30px">
                <Icon name="phone" size={25} color="#10b981" />
              </Box>
              <Heading size="sm">Phone :</Heading>
            </Box>
            <Heading size="sm">{profile.phone}</Heading>
          </Box>

          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}>
            <Box flex="1" flexDirection="row" alignItems="center">
              <Box width="30px">
                <Icon name="mobile-phone" size={30} color="#3b82f6" />
              </Box>
              <Heading size="sm">Mobile No. :</Heading>
            </Box>
            <Heading size="sm">{profile.cell}</Heading>
          </Box>

          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}>
            <Box flex="1" flexDirection="row" alignItems="center">
              <Box width="30px">
                <Icon name="genderless" size={30} color="#a855f7" />
              </Box>
              <Heading size="sm">Gender :</Heading>
            </Box>
            <Heading size="sm">{profile.gender.toUpperCase()}</Heading>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCard;
