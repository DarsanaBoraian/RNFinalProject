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
import {useNavigation} from '@react-navigation/native';

const schema = yup.object().shape({
  userLocation: yup.string(),
});

export default function UserMyPlaces() {
  const userName = useContext(UserContext);
  const navigation = useNavigation();

  const [locationName, setLocationName] = useState('United Kingdom');

  const [region, setRegion] = useState({
    latitude: 51.509865,
    longitude: -0.118092,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [data, setData] = useState([]);
  const [myUserColor, setColor] = useState([]);
  const fetchData = async () => {
    try {
      const userId = userName.uid;
      const userRef = await firestore()
        .collection('UserProfile')
        .where('userId', '==', userId)
        .get();

      if (!userRef.empty) {
        const userData = userRef.docs[0].data();
        setColor(userData.userColor);
        console.log(myUserColor);
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const onSubmit = async formData => {
    try {
      // Add the user data to Firestore
      await firestore().collection('UserMyPlaces').add({
        latitude: formData.latitude,
        longitude: formData.longitude,
        userLocation: formData.userLocation,
        author: 'Darsana',
        userId: userName.uid,
      });

      console.log('Data added to Firestore successfully');
      //      reset();
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }
    navigation.navigate('MyPlaces');
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
        //const location = data.display_name || 'Unknown Location';
        const location =
          data.address.suburb + ', ' + data.address.city || 'Unknown Location';
        setLocationName(location);
        setValue('userLocation', location);
        setValue('latitude', region.latitude);
        setValue('longitude', region.longitude);
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
      latitude: '',
      longitude: '',
      userLocation: '',
      author: 'Darsana',
      userId: userName.uid,
    },
  });

  return (
    <ScrollView style={{marginTop: 20}}>
      {/* <Text style={styles.titleText}>User Info Form</Text> */}

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
            pinColor={myUserColor}
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
      </View>
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
