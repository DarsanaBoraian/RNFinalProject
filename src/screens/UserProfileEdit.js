import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import React, {
  useEffect,
  useContext,
  useState,
  useSyncExternalStore,
} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import InputControl from '../components/InputControl';
import GenderSelector from '../components/GenderSelector';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import {UserContext} from '../../navigator';

import {ColorPicker} from 'react-native-color-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'First name must contain only letters'),
  lastName: yup
    .string()
    .required('Last Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Last name must contain only letters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),
  userLocation: yup.string(),
});

export default function UserProfileEdit() {
  const userName = useContext(UserContext);
  const [userIdExists, setUserIdExists] = useState(false);

  const [locationName, setLocationName] = useState('United Kingdom');

  const [region, setRegion] = useState({
    latitude: 51.509865,
    longitude: -0.118092,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const userId = userName.uid;
      const userRef = await firestore()
        .collection('UserProfile')
        .where('userId', '==', userId)
        .get();

      if (!userRef.empty) {
        const userData = userRef.docs[0].data();
        setUserIdExists(true);
        setLocationName(userData.userLocation || 'United Kingdom');
        setValue('firstName', userData.firstName || '');
        setValue('lastName', userData.lastName || '');
        setValue('email', userData.email || '');
        setValue('gender', userData.gender || '');
        setValue('age', userData.age || '');
        setValue('userColor', userData.userColor || '#3498db');
        setValue('userLocation', userData.userLocation || 'United Kingdom');
        setValue('userId', userData.userId);
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const onUpdate = async () => {
    try {
      const userId = userName.uid;
      const formData = getValues(); // Get the latest form data
      console.log('update pressed:::');
      console.log(formData);

      // Document exists, update the user data
      await firestore().collection('UserProfile').doc(userId).set(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          userLocation: formData.userLocation,
          age: formData.age,
          gender: formData.gender,
          userColor: formData.userColor,
          author: 'Darsana',
          userId: userName.uid,
        },
        {merge: true},
      );

      console.log('Data updated in Firestore successfully');

      // Optionally, set form values to reflect the update
      Object.keys(formData).forEach(field => {
        setValue(field, formData[field]);
      });
    } catch (error) {
      console.error('Error updating data in Firestore:', error);
    }
  };

  const onSubmit = async formData => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generatedColor =
      '#' +
      Array.from(
        {length: 6},
        () => characters[Math.floor(Math.random() * characters.length)],
      ).join('');

    try {
      // Add the user data to Firestore
      await firestore().collection('UserProfile').add({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        userLocation: formData.userLocation,
        age: formData.age,
        gender: formData.gender,
        author: 'Darsana',
        userColor: generatedColor,
        userId: userName.uid,
      });

      console.log('Data added to Firestore successfully');
      //      reset();
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }
  };

  const handleMapPress = event => {
    // Get the coordinates of the tapped location
    const {latitude, longitude} = event.nativeEvent.coordinate;

    // Update the region and location description
    setRegion({
      ...region,
      latitude,
      longitude,
    });

    // Fetch location details (reverse geocoding)
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
    )
      .then(response => response.json())
      .then(data => {
        const location = data.display_name || 'Unknown Location';
        setLocationName(location);
        setValue('userLocation', location);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors},
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      userLocation: '',
      userColor: '#3498db',
    },
  });

  return (
    <ScrollView style={{marginTop: 20}}>
      {/* <Text style={styles.titleText}>User Info Form</Text> */}
      <InputControl
        control={control}
        name={'firstName'}
        placeholder={'Enter First name'}
        error={errors?.firstName}
      />
      <InputControl
        control={control}
        name={'lastName'}
        placeholder={'Enter last name'}
        error={errors?.lastName}
      />
      <InputControl
        control={control}
        name={'email'}
        placeholder={'Enter email'}
        error={errors?.email}
      />
      <Controller
        name={'gender'}
        control={control}
        rules={{required: true, validate: true}}
        render={({field: {onChange, value}}) => {
          return <GenderSelector value={value} onGenderSelected={onChange} />;
        }}
      />

      <InputControl
        control={control}
        name={'age'}
        placeholder={'Enter age'}
        error={errors?.age}
      />

      <InputControl
        control={control}
        name={'userColor'}
        placeholder={'Enter userColor'}
        error={errors?.userColor}
      />

      <View style={{height: 150, width: '100%'}}>
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChange={newRegion => setRegion(newRegion)}
          onPress={handleMapPress}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title={locationName}
          />
        </MapView>
        {/* <View style={styles.locationDetails}>
          <Text style={{fontWeight: 'bold', fontFamily: 'YoungSerif-Regular'}}>
            {locationName}
          </Text>
        </View> */}
      </View>
      <InputControl
        control={control}
        name={'userLocation'}
        placeholder={'User Location'}
        error={errors?.userLocation}
        value={locationName} // Pass the value of locationName to InputControl
      />
      <View style={{flexDirection: 'row'}}>
        <Button title={'Submit'} onPress={handleSubmit(onSubmit)} />
        <Button title={userIdExists ? 'Update' : 'Submit'} onPress={onUpdate} />
      </View>
      <Button title={'Fetch Data'} onPress={fetchData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 7,
    width: '100%',
  },
  titleText: {
    color: 'skyblue',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  locationDetails: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'coloumn',
    marginTop: 16,
  },
  zoomButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    margin: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
  },
});
