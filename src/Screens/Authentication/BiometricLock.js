import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

export const Bio_unLock = async (navigation, id) => {
    try {
        const user = JSON.parse(await AsyncStorage.getItem("USER"));
        if (!user || !user.token) {
            Alert.alert("You need to login first");
            return;
        }
        const rnBiometrics = new ReactNativeBiometrics();
        const resultObject = await rnBiometrics.isSensorAvailable();
        const { available, biometryType } = resultObject;
        if (available && biometryType === id) {
            const biometricResult = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' });
            const { success } = biometricResult;
            if (success) {
                console.log('Biometrics successful: ', success);
                navigation.replace('Home');
            } else {
                console.log('User cancelled biometric prompt');
            }
        } else {
            Alert.alert(`${id} NOT supported`)
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};


