import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import Settings from './Settings';

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
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

export default NavDrawer;
