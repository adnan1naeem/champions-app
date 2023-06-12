import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../Utils/Colors";
import { Badge } from "react-native-elements";

const CustomButton = ({
  title,
  onPress,
  ContainerStyle,
  Notification,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={ContainerStyle ? ContainerStyle : styles.Container}
    >
      {Notification && (
        <Badge
          value="3"
          status="error"
          badgeStyle={styles.badge}
          containerStyle={styles.badgeContainer}
        />
      )}
      <Text style={textStyle ? textStyle : styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Colors.borderColor,
    paddingVertical: 20,
    width: 280,
    borderRadius: 15,
  },
  badgeStyle: {
    backgroundColor: "red",
    height: 25,
    width: 25,
    borderRadius: 12.5,
  },
  badgeContainer: {
    position: "absolute",
    right: 15,
    top: 5,
  },
  title: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
