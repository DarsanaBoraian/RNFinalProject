import {View, Text, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import Auth from '../services/auth';

export default function Home() {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => {
          Auth.signOut();
          console.log('signed out');
        }}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
