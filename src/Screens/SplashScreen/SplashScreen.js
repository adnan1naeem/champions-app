import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import LottieView from 'lottie-react-native';
import orient_icon from '../../Assets/Image/splash_title1.png';
import Splash_icon from '../../Assets/SVG/splash_title1.svg'
import { styles } from './styles';
import { ProfilePicture } from '../../Assets/SVG/svgs'
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignIn')
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../../Assets/Image/splash_sceen.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.sub_container}>
      <Image source={require('../../Assets/Image/splash_screen.png')} style={styles.Splash_icon} resizeMode="contain"/>
      </View>
    </ImageBackground>
  );
};


export default SplashScreen;