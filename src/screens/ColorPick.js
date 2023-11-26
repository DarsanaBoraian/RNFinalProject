import React, {useState} from 'react';
import {Button, Modal, StyleSheet, View} from 'react-native';

import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';

export default function ColorPick() {
  const [showModal, setShowModal] = useState(false);

  const onSelectColor = ({hex}) => {
    // do something with the selected color.
    console.log(hex);
  };

  return (
    <View style={{justifyContent: 'center'}}>
      <Button title="Color Picker" onPress={() => setShowModal(true)} />

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <ColorPicker
            style={{width: '70%'}}
            value="red"
            onComplete={onSelectColor}>
            <Preview hideInitialColor style={{marginBottom: 10}} />
            <Panel1 />
            <HueSlider style={{marginTop: 10}} />
          </ColorPicker>

          <Button
            style={{justifyContent: 'center'}}
            title="Ok"
            onPress={() => setShowModal(false)}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
