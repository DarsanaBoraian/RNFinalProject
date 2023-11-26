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
import UserProfileEdit from './UserProfileEdit';

import {Auth} from '../services';
import UserMyPlaces from './UserMyPlaces';
import MyPlaces from './MyPlaces';

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
    <Drawer.Navigator
      initialRouteName="Urdu"
      screenOptions={{
        drawerLabelStyle: {
          color: 'black', // Change this to your default color
          fontWeight: 'bold', // Add additional styles if needed
        },
        drawerActiveTintColor: 'green', // Change this to your desired active color
        drawerInactiveTintColor: 'black', // Change this to your desired inactive color
      }}>
      <Drawer.Screen
        name="UserProfileEdit"
        component={UserProfileEdit}
        options={{
          drawerIcon: ({focused, size}) => (
            <ArrowRightCircleIcon size={40} strokeWidth={4.5} color={'black'} />
          ),
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
        name="UserMyPlaces"
        component={UserMyPlaces}
        options={{
          drawerIcon: ({focused, size}) => (
            <ArrowRightCircleIcon size={40} strokeWidth={4.5} color={'black'} />
          ),
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
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({focused, size}) => (
            <ArrowRightCircleIcon size={40} strokeWidth={4.5} color={'black'} />
          ),
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
          drawerIcon: ({focused, size}) => (
            <ArrowRightCircleIcon size={40} strokeWidth={4.5} color={'black'} />
          ),
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
          drawerIcon: ({focused, size}) => (
            <ArrowRightCircleIcon size={40} strokeWidth={4.5} color={'black'} />
          ),
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
