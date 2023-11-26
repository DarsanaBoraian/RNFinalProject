import {View, Text} from 'react-native';
import React from 'react';

export default function LocationFinder() {
  // Get user's current location
  navigator.geolocation.getCurrentPosition(
    position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const speed = position.coords.speed || 'Speed not available';
      const timestamp = new Date(position.timestamp).toLocaleString();

      // Fetch additional location information using Nominatim API
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
      )
        .then(response => response.json())
        .then(data => {
          const location =
            data.address.suburb + ', ' + data.address.city ||
            'Unknown Location';

          // Display or use the obtained information as needed
          console.log('Location:', location);
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          console.log('Speed:', speed);
          console.log('Timestamp:', timestamp);
        })
        .catch(error => {
          console.error(error);
        });
    },
    error => {
      console.error('Error getting location:', error);
    },
  );

  return (
    <View>
      <Text>LocationFinder</Text>
    </View>
  );
}
