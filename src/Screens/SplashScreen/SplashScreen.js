import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ImageBackground, Animated } from 'react-native';
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
      navigation.replace('Home')
    }, 4600);

    return () => clearTimeout(timer);
  }, []);

  const [fadeAnim] = useState(new Animated.Value(0));
  const [fadeAnim2] = useState(new Animated.Value(0));

  React.useEffect(async () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1200,
      }).start();
    }, 1200);
  }, []);

  React.useEffect(async () => {
    setTimeout(() => {
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1200,
      }).start();
      setTimeout(() => {
        Animated.timing(fadeAnim2, {
          toValue: 0,
          duration: 1200,
        }).start();
      }, 1200);
    }, 2400);
  }, []);


  return (
    <ImageBackground
      source={require('../../Assets/Image/splash_sceen.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.sub_container}>
        <Animated.Image source={require('../../Assets/Image/OrientNewLogo.png')} style={[styles.Splash_icon, { opacity: fadeAnim, }]} resizeMode="contain" />
        <Animated.Image source={require('../../Assets/Image/splashNew.png')} style={[styles.Splash_icon, { opacity: fadeAnim2 }]} resizeMode="contain" />
      </View>
    </ImageBackground>
  );
};


export default SplashScreen;