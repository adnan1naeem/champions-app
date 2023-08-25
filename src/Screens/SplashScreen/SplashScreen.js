import React, { useEffect, useState } from 'react';
import { View, Animated, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 4600);

    return () => clearTimeout(timer);
  }, []);

  const [fadeAnim] = useState(new Animated.Value(0));
  const [fadeAnim2] = useState(new Animated.Value(0));

  useEffect(() => {
    const animateFade = async () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();

      await new Promise((resolve) => setTimeout(resolve, 1200));

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    };

    animateFade();
  }, [fadeAnim]);

  useEffect(() => {
    const animateFade2 = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2400));

      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();

      await new Promise((resolve) => setTimeout(resolve, 1200));

      Animated.timing(fadeAnim2, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    };

    animateFade2();
  }, [fadeAnim2]);

  return (
    <ImageBackground
      source={require('../../Assets/Image/splash_sceen.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.sub_container}>
        <Animated.Image
          source={require('../../Assets/Image/OrientNewLogo.png')}
          style={[styles.Splash_icon, { opacity: fadeAnim }]}
          resizeMode="contain"
        />
        {/* <Animated.Image
          source={require('../../Assets/Image/splashnew.png')}
          style={[styles.Splash_icon, { opacity: fadeAnim2 }]}
          resizeMode="contain"
        /> */}
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
