import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect, createContext} from 'react';
import Mainnav from './navigator';
import AuthNavigator from './authNavigator';

export const UserContext = createContext();

export default AppContainer = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChange(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        {user ? <Mainnav /> : <AuthNavigator />}
      </NavigationContainer>
    </UserContext.Provider>
  );
};
