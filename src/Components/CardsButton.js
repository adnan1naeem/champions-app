import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../Utils/Colors';

const CardsButton = ({ navigation, value, status, onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.flatList_container}
      onPress={onPress}>
      <View
        style={styles.container}>
        <View>
          <Text style={styles.flatList_text}>{status}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.valueText}>{value}</Text>
          <MaterialIcons
            name="navigate-next"
            size={20}
            color={'#D0D3E2'}
            style={{ paddingTop: 16 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardsButton;

const styles = StyleSheet.create({
  flatList_container: {
    width: '90%',
    height: 45,
    borderBottomWidth: 2,
    borderColor: '#98B1DD',
    marginBottom: 6,
    alignSelf: 'center',
  },
  flatList_text: {
    color: Colors.flatlist_color,
    fontSize: 15,
    paddingTop: 13,
  },
  valueText: {
    color: Colors.text_Color,
    fontSize: 18,
    paddingTop: 13,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  }
});
