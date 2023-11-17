import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import LocaleHelper from '../helpers/LocaleHelper';

export default function Urdu() {
  LocaleHelper.locale = 'ur';
  return (
    <SafeAreaView>
      <Text>Urdu</Text>
      <Text>{LocaleHelper.t('howru')}</Text>
    </SafeAreaView>
  );
}
