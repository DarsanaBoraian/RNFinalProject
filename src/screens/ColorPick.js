import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ColorPicker, toHsv} from 'react-native-color-picker';

export const ColorPick = () => {
  const [color, setColor] = useState(toHsv('green'));
  function onColorChange(color) {
    setColor({color});
  }
  return (
    <View style={{flex: 1, padding: 45, backgroundColor: '#212021'}}>
      <Text style={{color: 'white'}}>React Native Color Picker</Text>

      <ColorPicker
        oldColor="purple"
        color={color}
        onColorChange={onColorChange}
        onColorSelected={color => alert(`Color selected: ${color}`)}
        onOldColorSelected={color => alert(`Old color selected: ${color}`)}
        style={{flex: 1}}
      />
    </View>
  );
};
