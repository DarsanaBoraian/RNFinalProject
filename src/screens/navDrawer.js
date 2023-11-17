import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  HeartIcon,
  Square3Stack3DIcon,
  InboxStackIcon,
  ArrowRightCircleIcon,
  UsersIcon,
  SwatchIcon,
  CameraIcon,
} from 'react-native-heroicons/solid';
import Home from './Home';
import Urdu from './Urdu';
import French from './French';
import {Auth} from '../services';

/**
 * https://reactnavigation.org/docs/drawer-navigator
 * 
 * @returns yarn add @react-navigation/native
yarn add react-native-screens react-native-safe-area-context
npx pod-install ios
yarn add @react-navigation/native-stack

yarn add @react-navigation/drawer
yarn add react-native-gesture-handler react-native-reanimated
import 'react-native-gesture-handler';  -> in first line

 */

const Drawer = createDrawerNavigator();

function NavDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => Auth.signOut()}
                style={{marginRight: 16}}>
                <ArrowRightCircleIcon
                  size={40}
                  strokeWidth={4.5}
                  color={'black'}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Urdu"
        component={Urdu}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => Auth.signOut()}
                style={{marginRight: 16}}>
                <ArrowRightCircleIcon
                  size={40}
                  strokeWidth={4.5}
                  color={'black'}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Drawer.Screen
        name="French"
        component={French}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => Auth.signOut()}
                style={{marginRight: 16}}>
                <ArrowRightCircleIcon
                  size={40}
                  strokeWidth={4.5}
                  color={'black'}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default NavDrawer;
