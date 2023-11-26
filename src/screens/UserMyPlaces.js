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

// import {
//   View,
//   Text,
//   ScrollView,
//   FlatList,
//   StyleSheet,
//   Button,
// } from 'react-native';
// import React, {
//   useEffect,
//   useContext,
//   useState,
//   useSyncExternalStore,
// } from 'react';
// import {useForm, Controller} from 'react-hook-form';
// import {yupResolver} from '@hookform/resolvers/yup';
// import InputControl from '../components/InputControl';
// import GenderSelector from '../components/GenderSelector';
// import MapView, {Marker} from 'react-native-maps';
// import firestore from '@react-native-firebase/firestore';
// import {UserContext} from '../../navigator';
// import MyPlaces from './MyPlaces';
// import {ColorPicker} from 'react-native-color-picker';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import * as yup from 'yup';
// import {useNavigation} from '@react-navigation/native';

// const schema = yup.object().shape({
//   userName: yup
//     .string()
//     .required('First Name is required')
//     .matches(/^[a-zA-Z\s]+$/, 'First name must contain only letters'),
// });

// export default function UserMyPlaces() {
//   const userAuthName = useContext(UserContext);
//   const [userIdExists, setUserIdExists] = useState(false);
//   const [userDataList, setUserDataList] = useState([]);

//   const [locationName, setLocationName] = useState('United Kingdom');
//   const navigation = useNavigation();

//   const [region, setRegion] = useState({
//     latitude: 51.509865,
//     longitude: -0.118092,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   const [data, setData] = useState([]);

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     getValues,
//     reset,
//     formState: {errors},
//   } = useForm({
//     mode: 'all',
//     resolver: yupResolver(schema),
//     defaultValues: {
//       userName: '',
//       userLocation: '',
//       latitude: '',
//       longitude: '',
//       userColor: '#3498db',
//     },
//   });

//   const onSubmit = async placesFormData => {
//     console.log('submit pressed');
//     try {
//       // Add the user data to Firestore
//       await firestore().collection('UserMyPlaces').add({
//         userName: placesFormData.userName,
//         userId: userAuthName.uid,
//         userLocation: placesFormData.userLocation,
//         latitude: placesFormData.latitude,
//         longitude: placesFormData.longitude,
//         author: 'Darsana',
//       });

//       console.log('Data added to Firestore successfully');

//       // Reset the form fields
//       reset();
//     } catch (error) {
//       console.error('Error adding data to Firestore:', error);
//     }

//     // Navigate to the 'MyPlaces' screen
//     navigation.navigate('MyPlaces');
//   };

//   const handleMapPress = event => {
//     // Get the coordinates of the tapped location
//     const {latitude, longitude} = event.nativeEvent.coordinate;

//     // Update the region and location description
//     setRegion({
//       ...region,
//       latitude,
//       longitude,
//     });

//     // Fetch location details (reverse geocoding)
//     fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
//     )
//       .then(response => response.json())
//       .then(data => {
//         //const location = data.display_name || 'Unknown Location';
//         const location =
//           data.address.suburb + ', ' + data.address.city || 'Unknown Location';
//         setLocationName(location);
//         setValue('userLocation', location);
//         setValue('latitude', region.latitude);
//         setValue('longitude', region.longitude);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return (
//     <ScrollView style={{marginTop: 20}}>
//       <View style={{height: 150, width: '100%'}}>
//         <MapView
//           style={styles.map}
//           initialRegion={region}
//           onRegionChange={newRegion => setRegion(newRegion)}
//           onPress={handleMapPress}>
//           <Marker
//             coordinate={{
//               latitude: region.latitude,
//               longitude: region.longitude,
//             }}
//             title={locationName}
//           />
//         </MapView>
//       </View>

//       <InputControl
//         control={control}
//         name={'userLocation'}
//         placeholder={'User Location'}
//         error={errors?.userLocation}
//         value={locationName} // Pass the value of locationName to InputControl
//       />
//       <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//         <Button title={'Submit'} onPress={handleSubmit(onSubmit)} />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   listItem: {
//     backgroundColor: '#fff', // Set background color
//     padding: 10, // Add padding
//     marginVertical: 5, // Add vertical margin
//     borderRadius: 8, // Add border radius for rounded corners
//     borderWidth: 1, // Add border width
//     borderColor: '#ddd', // Set border color
//   },
//   locationText: {
//     fontSize: 16, // Set font size
//     fontWeight: 'bold', // Set font weight
//   },
//   map: {
//     flex: 7,
//     width: '100%',
//   },
//   titleText: {
//     color: 'skyblue',
//     fontSize: 25,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   locationDetails: {
//     position: 'absolute',
//     bottom: 24,
//     left: 16,
//     right: 16,
//     backgroundColor: 'white',
//     padding: 8,
//     borderRadius: 8,
//   },
//   buttonContainer: {
//     flexDirection: 'coloumn',
//     marginTop: 16,
//   },
//   zoomButton: {
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 10,
//     margin: 8,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: 'white',
//   },
// });
