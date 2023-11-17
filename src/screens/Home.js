import {View, Text, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import Auth from '../services/auth';
import LocaleHelper from '../helpers/LocaleHelper';
import {UserContext} from '../../navigator';

export default function Home() {
  const userName = useContext(UserContext);

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => {
          Auth.signOut();
          console.log('signed out');
        }}>
        <Text>Sign Out</Text>
        <Text> User Name :{userName.displayName}</Text>
      </TouchableOpacity>

      <Text>{LocaleHelper.t('howru')}</Text>
    </SafeAreaView>
  );
}
