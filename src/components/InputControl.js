import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

export default function InputControl({
  value,
  error,
  control,
  placeholder,
  name,
}) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        defaultValue={value || ''}
        rules={{required: true, validate: true}}
        render={({field}) => {
          return (
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.onChange}
              placeholder={placeholder}
              autoCapitalize="none"
              autoCorrect={false}
            />
          );
        }}
      />

      {error && error.message.length > 0 && (
        <Text style={styles.errorStyle}>{error.message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    marginHorizontal: 10,
    borderColor: 'skyblue',
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  },
  errorStyle: {
    marginHorizontal: 10,
    color: 'red',
  },
});
