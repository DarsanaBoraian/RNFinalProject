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
    height: 40,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 10,
    borderRadius: 20,
  },
  selectedCell: {
    backgroundColor: 'skyblue',
  },
});
