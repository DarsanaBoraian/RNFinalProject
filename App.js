import {View, Text} from 'react-native';
import React from 'react';
import AppContainer from './navigator';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://67a5b749b229283864b642ebd5040e1c@o4506257728602112.ingest.sentry.io/4506257731223552',
});

export default function App() {
  return <AppContainer />;
}
