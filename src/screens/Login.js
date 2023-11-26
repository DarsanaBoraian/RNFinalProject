import {
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Auth from '../services/auth';
import appColors from '../constants/appColors';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import InputControl from '../components/InputControl';
import * as yup from 'yup';
/***
 * yarn add react-hook-form
 * yarn add yup
 * yarn add @hookform/resolvers
 */

export default function Login({navigation}) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),

    password: yup
      .string()
      .required('Last Name is required')
      .matches(
        /^[a-zA-Z\s]+$/,
        'password must contain only letters and numbers',
      ),
  });

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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login</Text>
        <Image
          source={require('../../assets/images/login.png')} // Replace 'path_to_your_image' with the actual image path
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
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
          Auth.signIn(formData.email, formData.password);
        })}
      />

      {/* <View style={styles.inputContainer}>
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

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity
          onPress={() => {
            Auth.signIn(email, password);
            console.log('signed in');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity> */}

        <View style={styles.buttonSpacing} />

        <Text style={styles.bodyText}>New user? sign up..</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Create user</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 44,
    color: appColors.color1,
    fontWeight: 'bold',
    marginRight: 20,
  },
  bodyText: {
    fontSize: 16,
    color: appColors.color2,
    fontWeight: 'medium',
    marginBottom: 20,
  },
  image: {
    width: 100, // Set the width of the image
    height: 100, // Set the height of the image
    marginLeft: 10, // Adjust the margin as needed
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonSpacing: {
    height: 20, // Adjust the height to create more space
  },
  button: {
    backgroundColor: appColors.color1,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonOutline: {
    backgroundColor: '#ffffff',
    borderColor: appColors.color2,
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: appColors.color2,
    fontWeight: '700',
    fontSize: 24,
    padding: 10,
  },
});
