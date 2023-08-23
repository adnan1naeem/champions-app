import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ImageBackground, Text, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'react-native-elements/dist/helpers';
import { styles } from './Style';
import { Colors } from '../../../Utils/Colors';
import Header from '../../../Components/Header/Header';
import BackButton from '../../../Components/BackButton';
const AccountSetting = () => {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [FingerToggle, setFingerToggle] = useState(false);
    const AuthenticationToggle = () => setFingerToggle(previousState => !previousState);
    const handleBackPress = () => {
        // Handle back button press
        navigation.goBack();
    };
    const SignOut = () => {
        // navigation.navigate('SignIn');
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
        });
    };

    return (
        <ImageBackground
            source={require('../../../Assets/Image/background_image.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <Header />
            <BackButton navigation={navigation} />

            <View style={{ marginLeft: 20, marginTop: 20 }}>
                <Text style={styles.Text}>ACCOUNT SETTINGS</Text>
                <Text style={styles.Text_detail}>Account,Setting,More</Text>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 30, gap: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../Assets/Image/Acoount_setting.png')} style={styles.icons} />
                    <Text style={styles.user_detail}>Account Setting</Text>
                </View>
                <View style={{ paddingHorizontal: 40 }}>
                    <Text style={styles.Text_detail}>Account Information</Text>
                </View>
            </View>
            <View style={styles.type_container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../Assets/Image/Acoount_setting.png')} style={styles.icons} />
                    <Text style={styles.user_detail}>General</Text>
                </View>
                <View style={styles.toggle_container}>
                    <Text style={styles.Text_detail}>Notification</Text>
                    <LinearGradient
                        colors={['rgb(62, 97, 173)', 'rgb(16,169,228)',]}
                        style={styles.toggle}
                        start={{ x: 0, y: 0 }} // Start from the left side
                        end={{ x: 0, y: 1 }} // End at the right side
                    >
                        <Switch
                            trackColor={{ false: 'transparent', true: 'transparent' }}
                            thumbColor={isEnabled ? 'blue' : '#fff'}
                            ios_backgroundColor="#3e3e3e"
                            size={30}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />

                    </LinearGradient>
                </View>
                <View style={styles.toggle_container}>
                    <Text style={styles.Text_detail}>Finger Print, Face ID,</Text>
                    <LinearGradient
                        colors={['rgb(62, 97, 173)', 'rgb(16,169,228)',]}
                        style={styles.toggle}
                        start={{ x: 0, y: 0 }} // Start from the left side
                        end={{ x: 0, y: 1 }} // End at the right side
                    >
                        <Switch
                            trackColor={{ false: 'transparent', true: 'transparent' }}
                            thumbColor={FingerToggle ? 'blue' : '#fff'}
                            ios_backgroundColor="#3e3e3e"
                            size={30}
                            onValueChange={AuthenticationToggle}
                            value={FingerToggle}
                        />
                    </LinearGradient>
                </View>
            </View>
        </ImageBackground>
    );
};


export default AccountSetting;
