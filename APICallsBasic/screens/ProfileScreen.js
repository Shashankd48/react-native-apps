import {View, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import ProfileCard from '../components/ProfileCard';

const ProfileScreen = ({route}) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (route.params?.profile) setProfile(route.params?.profile);
  }, []);

  return (
    <View>{profile ? <ProfileCard profile={profile} /> : <Loading />}</View>
  );
};

export default ProfileScreen;
