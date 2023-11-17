import {SafeAreaView, Text} from 'react-native';
import React from 'react';
import LocaleHelper from '../helpers/LocaleHelper';

export default function French() {
  LocaleHelper.locale = 'fr';
  return (
    <SafeAreaView>
      <Text>French</Text>
      <Text>{LocaleHelper.t('howru')}</Text>
    </SafeAreaView>
  );
}
