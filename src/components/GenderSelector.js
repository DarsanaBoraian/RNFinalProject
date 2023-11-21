import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';

const genders = [
  {key: 'male', title: 'Male'},
  {key: 'female', title: 'Female'},
];
export default function GenderSelector(props) {
  const [selectedCell, setSelectedCell] = useState(props?.value);

  useEffect(() => {
    setSelectedCell(props?.value);
  }, [props?.value]);

  let selectedCellStyle;
  selectedCellStyle = {...styles.cell, ...styles.selectedCell};

  return (
    <View style={styles.container}>
      {genders.map(thisEl => {
        return (
          <TouchableOpacity
            style={
              selectedCell === thisEl.key ? selectedCellStyle : styles.cell
            }
            onPress={() => {
              setSelectedCell(thisEl.key);

              if (props.onGenderSelected) {
                props.onGenderSelected(thisEl.key);
              }
            }}>
            <Text>{thisEl.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 60,
    marginHorizontal: 10,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCell: {
    backgroundColor: 'grey',
  },
});
