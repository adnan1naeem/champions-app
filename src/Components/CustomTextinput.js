import { StyleSheet, TouchableOpacity, TextInput, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../Utils/Colors';

const CustomTextinput = ({
  placeholderText,
  secureText,
  multiLine,
  password,
  placeholderTextColor,
  keyboardType,
  onChangeText,
  value,
  selectionColor,
  maxlength,
  numberOfLines,
  onSubmitEditing,
  onKeyPress,
  eye,

}
) => {
  const [showPassword, setShowPassword] = useState(
    !secureText ? true : false
  );
  return (
    <View style={{ marginTop: 15 }}>
      <TextInput
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholderText}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : Colors.text_Color
        }
        style={styles.textInputContainer}
        secureTextEntry={!showPassword}
        multiline={multiLine}
        value={value}
        selectionColor={
          selectionColor
        }
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxlength ? maxlength : null}
        onKeyPress={onKeyPress}
        numberOfLines={numberOfLines}
      />
      {eye && (
        <>
          <View>
            <TouchableOpacity
              style={styles.showPasswordC}
              activeOpacity={0.6}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              <Image
                source={require("../Assets/Image/eye.png")}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

export default CustomTextinput

const styles = StyleSheet.create({
  textInputContainer: {
    height: 47,
    fontSize: 15,
    color: Colors.Half_white,
    zIndex: 0,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.Half_white

  },
  showPasswordC: {
    zIndex: 1,
    width: 40,
    alignSelf: "flex-end",
    marginTop: -30,
  },
  eyeIcon: { height: 25, width: 25, resizeMode: "contain" },
})