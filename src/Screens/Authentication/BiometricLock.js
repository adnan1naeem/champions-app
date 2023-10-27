import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

export const Bio_unLock = async (navigation, id, extra) => {

    try {
        const user = JSON.parse(await AsyncStorage.getItem("USER"));
        if (!user || !user.token) {
            if (extra === "default") {
                return console.log("You need to login first");
            }
            return Alert.alert("You need to login first");
        }
        const rnBiometrics = new ReactNativeBiometrics();
        const resultObject = await rnBiometrics.isSensorAvailable();
        const { available, biometryType } = resultObject;
        if (available && biometryType === id) {
            const biometricResult = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' });
            const { success } = biometricResult;
            if (success) {
                navigation.replace('Home');
            } else {
                console.log('');
            }
        } else {
            if (extra === "default") {
                return console.log(`${id} NOT supported`);
            }
            Alert.alert(`${id} NOT supported`)
            return
        }
    } catch (error) {
        console.log('Error fetching user data:', error);
    }
};


