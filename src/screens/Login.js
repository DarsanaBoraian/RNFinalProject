import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Auth from '../services/auth';
import appColors from '../constants/appColors';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            Auth.signIn(email, password);
            console.log('signed in');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

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
