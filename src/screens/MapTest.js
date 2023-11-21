import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

//Copy the contents into App.js to execure

export default MapTest = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [locationName, setLocationName] = useState('United Kingdom');

  const [region, setRegion] = useState({
    latitude: 51.509865,
    longitude: -0.118092,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handlePlaceSelect = (data, details) => {
    //name -> Delhi, Geometry ->  {"lat": 28.7040592, "lng": 77.10249019999999}
    const {geometry, name} = details;
    const {location} = geometry;

    // Set the selected location and its name
    setSelectedLocation(location);
    setLocationName(name);

    // Set the map region to the selected location
    setRegion(() => ({
      latitude: location.lat,
      longitude: location.lng,
      //zoom values
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }));
    console.log(region);
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
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'skyblue',
          flex: 1,
          marginVertical: 20,
        }}>
        <GooglePlacesAutocomplete
          placeholder="Search for a place"
          fetchDetails={true}
          onPress={handlePlaceSelect}
          query={{
            key: 'AIzaSyDuOhi5_gYyFJ5ZCBK7NvxzEFmX7q3GA2Y',
            language: 'en',
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400} // Delay before making the request
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChange={newRegion => setRegion(newRegion)}
        onPress={handleMapPress}>
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
          title={locationName}
        />
      </MapView>
      <View style={styles.locationDetails}>
        <Text style={{fontWeight: 'bold', fontFamily: 'YoungSerif-Regular'}}>
          {locationName}
        </Text>
      </View>
    </View>
  );
};

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
