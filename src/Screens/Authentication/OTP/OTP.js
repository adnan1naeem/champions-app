import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { Colors } from '../../../Utils/Colors';

const OtpInput = ({ onPress }) => {

  return (
    <View style={styles.container}>
      <OTPTextInput
        autoFocus={true}
        handleTextChange={onPress}
        containerStyle={styles.otpContainer}
        textInputStyle={styles.otpInput}
        inputCount={5}
        borderColor={'#41CBEB'}
        secureTextEntry={true}
      />
      {/* 3520260422879 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
    height: 70,
    borderColor: '#41CBEB',

  },
  otpInput: {
    borderWidth: 1,
    color: Colors.text_Color,
    borderColor: '#41CBEB',
    fontSize: 20,
    fontWeight: 'bold',
    width: 35,
    height: 42,
    marginHorizontal: 6,
    textAlign: 'center',
    borderBottomWidth: 1,

  },
});

export default OtpInput;
