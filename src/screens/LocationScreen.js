import {useEffect} from 'react';
import {View, Text, Platform} from 'react-native';
import {LocationHelper} from '../../helpers';

const LocationScreen = () => {
  useEffect(() => {
    LocationHelper.checkLocationPermission(
      () => {
        LocationHelper.trackUserLocation(
          locationObject => {
            console.log(locationObject);
          },
          error => {
            console.log(error);
          },
        );
      },
      error => {
        console.log(error);
      },
    );
  }, []);

  return (
    <View>
      <Text>test maps</Text>
    </View>
  );
};

export default LocationScreen;
