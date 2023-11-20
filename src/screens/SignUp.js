import {
  View,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Auth from '../services/auth';
import appColors from '../constants/appColors';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import InputControl from '../components/InputControl';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('First Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'First name must contain only letters'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),

  password: yup
    .string()
    .required('Last Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'password must contain only letters and numbers'),
});

export default function SignUp() {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/welcomecat.png')} // Replace 'path_to_your_image' with the actual image path
        style={styles.image}
      />
      {/* <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View> */}
      <View style={styles.inputContainer}>
        <InputControl
          control={control}
          name={'name'}
          placeholder={'Enter First name'}
          error={errors?.name}
        />
        <InputControl
          control={control}
          name={'email'}
          placeholder={'Enter email'}
          error={errors?.email}
        />
        <InputControl
          control={control}
          name={'password'}
          placeholder={'Enter password'}
          error={errors?.password}
        />
      </View>

      <Button
        title={'Submit'}
        onPress={handleSubmit(formData => {
          console.log(formData);
          Auth.signUp(formData.name, formData.email, formData.password);
        })}
      />

      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => Auth.signUp(name, email, password)}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set background color for the SafeAreaView
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  image: {
    marginBottom: 50,
    width: 300, // Set the width of the image
    height: 100, // Set the height of the image
    marginLeft: 10, // Adjust the margin as needed
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10, // Adjust the top margin to separate the input fields
  },
  buttonContainer: {
    width: '60%',
    alignItems: 'center',
    marginTop: 30, // Adjust the top margin to separate the input fields and button
  },
  button: {
    backgroundColor: appColors.color2,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10, // Adjust the vertical margin for spacing
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 10, // Adjust the top margin for spacing
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
