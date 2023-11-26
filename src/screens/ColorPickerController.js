import React from 'react';
import {Controller} from 'react-hook-form';
import {ColorPicker, Preview, Panel1, HueSlider} from 'reanimated-color-picker';
const ColorPickerController = ({control, name}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}}) => (
        <ColorPicker
          style={{width: '70%'}}
          value={value}
          onComplete={selectedColor => onChange(selectedColor)}>
          <Preview hideInitialColor />
          <Panel1 />
          <HueSlider style={{marginTop: 20}} />
          {/* Add other color picker components here if needed */}
        </ColorPicker>
      )}
    />
  );
};

export default ColorPickerController;
