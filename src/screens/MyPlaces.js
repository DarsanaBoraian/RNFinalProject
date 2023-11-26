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

import {ColorPicker} from 'react-native-color-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';

export default function MyPlaces() {
  const userAuthName = useContext(UserContext);
  const [userIdExists, setUserIdExists] = useState(false);
  const [userDataList, setUserDataList] = useState([]);

  const [locationName, setLocationName] = useState('United Kingdom');
  const navigation = useNavigation();

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

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors},
  } = useForm({
    mode: 'all',
  });

  return (
    <ScrollView style={{marginTop: 20}}>
      {/* <Text style={styles.titleText}>My Places</Text> */}

      <FlatList
        data={userDataList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text style={styles.locationText}>{item.latitude}</Text>
            <Text style={styles.locationText}>{item.longitude}</Text>

            <Text style={styles.locationText}>{item.userLocation}</Text>
          </View>
        )}
      />
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
