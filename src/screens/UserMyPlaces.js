import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';
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
import MyPlaces from './MyPlaces';
import {ColorPicker} from 'react-native-color-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';

const schema = yup.object().shape({
  userName: yup
    .string()
    .required('First Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'First name must contain only letters'),
});

export default function UserMyPlaces() {
  const userAuthName = useContext(UserContext);
  const [userIdExists, setUserIdExists] = useState(false);
  const [userDataList, setUserDataList] = useState([]);

  const [locationName, setLocationName] = useState('United Kingdom');
  const navigation = useNavigation();

  const [region, setRegion] = useState({
    latitude: 51.509865,
    longitude: -0.118092,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const userId = userAuthName.uid;
      const userRef = await firestore()
        .collection('UserMyPlaces')
        .where('userId', '==', userId)
        .get();

      if (!userRef.empty) {
        const userDataList = userRef.docs.map(doc => doc.data());
        setUserIdExists(true);
        setLocationName(userDataList[0].userLocation || 'United Kingdom');
        setValue('userName', userDataList[0].userName || '');
        setValue('userId', userDataList[0].userId);
        setValue(
          'userLocation',
          userDataList[0].userLocation || 'United Kingdom',
        );
        setValue('latitude', userDataList[0].latitude || '');
        setValue('longitude', userDataList[0].longitude || '');

        // Update userDataList state with the fetched data
        setUserDataList(userDataList);
        console.log(userDataList);
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
      const userId = userAuthName.uid;
      const placesFormData = getValues(); // Get the latest form data
      console.log('update pressed:::');
      console.log(placesFormData);

      // Document exists, update the user data
      await firestore().collection('UserMyPlaces').doc(userId).set(
        {
          userName: placesFormData.userName,
          userId: userAuthName.uid,
          userLocation: placesFormData.userLocation,
          longitude: placesFormData.longitude,
          latitude: placesFormData.latitude,
          author: 'Darsana',
        },
        {merge: true},
      );

      console.log('Data updated in Firestore successfully');

      // Optionally, set form values to reflect the update
      Object.keys(placesFormData).forEach(field => {
        setValue(field, placesFormData[field]);
      });
    } catch (error) {
      console.error('Error updating data in Firestore:', error);
    }
  };

  const onSubmit = async placesFormData => {
    try {
      // Add the user data to Firestore
      await firestore().collection('UserMyPlaces').add({
        userName: placesFormData.userName,
        userId: userAuthName.uid,
        userLocation: placesFormData.userLocation,
        latitude: placesFormData.latitude,
        longitude: placesFormData.longitude,
        author: 'Darsana',
      });

      console.log('Data added to Firestore successfully');
      reset();
    } catch (error) {
      console.error('Error adding data to Firestore:', error);
    }
    fetchData();
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
      {/* <InputControl
        control={control}
        name={'userName'}
        placeholder={'Enter User name'}
        error={errors?.userName}
      /> */}

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
      </View>
      {/* <InputControl
        control={control}
        name={'latitude'}
        placeholder={'latitude'}
        error={errors?.latitude}
        value={region.latitude} // Pass the value of locationName to InputControl
      />
      <InputControl
        control={control}
        name={'longitude'}
        placeholder={'longitude'}
        error={errors?.longitude}
        value={region.longitude} // Pass the value of locationName to InputControl
      /> */}

      <InputControl
        control={control}
        name={'userLocation'}
        placeholder={'User Location'}
        error={errors?.userLocation}
        value={locationName} // Pass the value of locationName to InputControl
      />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button title={'Submit'} onPress={handleSubmit(onSubmit)} />
        {/* <Button
          title={userIdExists ? 'Update' : 'Submit'}
          onPress={userIdExists ? onUpdate : handleSubmit(onSubmit)}
        /> */}
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
  listItem: {
    backgroundColor: '#fff', // Set background color
    padding: 10, // Add padding
    marginVertical: 5, // Add vertical margin
    borderRadius: 8, // Add border radius for rounded corners
    borderWidth: 1, // Add border width
    borderColor: '#ddd', // Set border color
  },
  locationText: {
    fontSize: 16, // Set font size
    fontWeight: 'bold', // Set font weight
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
