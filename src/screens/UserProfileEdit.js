import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import InputControl from '../components/InputControl';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
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
  const [selectedLocation, setSelectedLocation] = useState(null);

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
      const querySnapshot = await firestore().collection('UserProfile').get();

      const documents = querySnapshot.docs.map(doc => doc.data());

      setData(documents);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const onSubmit = async formData => {
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
        userColor: formData.userColor,
      });

      console.log('Data added to Firestore successfully');
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      userLocation: '',
    },
  });

  return (
    <ScrollView>
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
      <InputControl
        control={control}
        name={'gender'}
        placeholder={'Enter gender'}
        error={errors?.gender}
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

      <View style={{height: 250, width: '100%'}}>
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
        <View style={styles.locationDetails}>
          <Text style={{fontWeight: 'bold', fontFamily: 'YoungSerif-Regular'}}>
            {locationName}
          </Text>
        </View>
      </View>
      <InputControl
        control={control}
        name={'userLocation'}
        placeholder={'User Location'}
        error={errors?.userLocation}
        value={locationName} // Pass the value of locationName to InputControl
      />

      <Button title={'Submit'} onPress={handleSubmit(onSubmit)} />

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
