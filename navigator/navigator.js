import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Auth} from '../src/services';
import Home from '../src/screens/Home';
import MyPlaces from '../src/screens/MyPlaces';
import NavDrawer from '../src/screens/navDrawer';

const Stack = createNativeStackNavigator();

export default function Mainnav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NavDrawer"
        component={NavDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyPlaces"
        component={MyPlaces}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
