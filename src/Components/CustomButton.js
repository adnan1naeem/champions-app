import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../Utils/Colors';
import { Badge } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';

const CustomButton = ({
  loading,
  title,
  onPress,
  ContainerStyle,
  Notification,
  textStyle,
  disabled,
  Linear,
}) => {

  const enabledBackgroundColor = ['#17b8f5', '#619dea'];
  const disabledBackgroundColor = ['#17b8f5', '#17b8f5'];
  const backgroundGradientColors = disabled ? disabledBackgroundColor : enabledBackgroundColor;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={ContainerStyle ? ContainerStyle : styles.Container}>
      {Notification && (
        <Badge
          value="3"
          status="error"
          badgeStyle={styles.badge}
          containerStyle={styles.badgeContainer}
        />
      )}
      {loading ? (
        <LinearGradient
          colors={backgroundGradientColors}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <ActivityIndicator style={{}} size={'small'} color={Colors.White} />
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={backgroundGradientColors}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <Text style={textStyle ? textStyle : styles.title}>{title}</Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
    width: 280,
    borderRadius: 15,
  },
  gradient: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  badgeStyle: {
    backgroundColor: 'red',
    height: 25,
    width: 25,
    borderRadius: 12.5,
  },
  badgeContainer: {
    position: 'absolute',
    right: 15,
    top: 5,
  },
  title: {
    color: Colors.text_Color,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
