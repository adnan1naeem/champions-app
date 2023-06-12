import React from "react";
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const StartScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./path/to/your/image.png')} />
      <Text style={styles.heading}>Your Heading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003e96',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 24,
    marginTop: 10,
  },
});

export default StartScreen;
