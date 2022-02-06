import {View, Text} from 'native-base';
import React, {useState} from 'react';

const ProfileScreen = ({route}) => {
  const [profile, setProfile] = useState(route.params?.profile);

  console.log(profile);

  return (
    <View>
      <Text>{profile.name}</Text>
    </View>
  );
};

export default ProfileScreen;
