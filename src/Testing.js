import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import messaging from '@react-native-firebase/messaging';



const Testing = () => {
  const [backgroundToken, setbackgroundToken] = useState()
  const [forgroundToken, setforgroundToken] = useState()


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    (async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
      const Token = await messaging().getToken();
      console.log("Token:: ", Token);
      setbackgroundToken(Token)

    })();
  }, [])

  return (
    <View>
      <Text style={{ padding: 30 }}>backgroundToken :{backgroundToken}</Text>
      <Text style={{ padding: 30 }}>forgroundToken :{forgroundToken}</Text>

    </View>
  )
}

export default Testing

const styles = StyleSheet.create({})