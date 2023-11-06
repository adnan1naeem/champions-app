import React, { useEffect, useState } from 'react';
import { View, Image, ImageBackground, Text, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './Style';
import Header from '../../../Components/Header/Header';
import BackButton from '../../../Components/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../../Utils/Colors';


const AccountSetting = () => {
    const navigation = useNavigation();
    const [profile_pic, setProfile_pic] = useState(true);
    const [FingerToggle, setFingerToggle] = useState(true);
    const [notifications, setNotifications] = useState(true);

    useEffect(() => {
        async function retrieveData() {
            try {
                const bioData = await AsyncStorage.getItem('BIOMETRIC');
                const profileData = await AsyncStorage.getItem('PROFILEPICTURE');

                if (bioData !== null) {
                    setFingerToggle(JSON.parse(bioData));
                }

                if (profileData !== null) {
                    setProfile_pic(JSON.parse(profileData));
                }
            } catch (error) {
                console.error('Error reading data: ' + error);
            }
        }

        retrieveData();
    }, []);

    const handleBioToggle = async (value) => {
        setFingerToggle(value);
        await AsyncStorage.setItem('BIOMETRIC', JSON.stringify(value));
    };

    const handleProfileToggle = async (value) => {
        setProfile_pic(value);
        await AsyncStorage.setItem('PROFILEPICTURE', JSON.stringify(value));
    };


    const handleNotification = async (value) => {
        setNotifications(value)
    }

    return (
        <ImageBackground
            source={require('../../../Assets/Image/background_image.png')}
            style={styles.container}
            resizeMode="cover">
            <Header />
            <BackButton navigation={navigation} />

            <View style={{ marginLeft: 20, marginTop: 20 }}>
                <Text style={styles.Text}>ACCOUNT SETTINGS</Text>
                <Text style={styles.Text_detail}>Account Settings, More</Text>
            </View>
            <View style={{ marginTop: 30, gap: 5 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        alignItems: 'center',
                    }}>
                    <Image
                        source={require('../../../Assets/Image/Acoount_setting.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.user_detail}>Account Settings</Text>
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={styles.Text_detail}>Account Information</Text>
                </View>
            </View>
            <View style={styles.type_container}>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        alignItems: 'center',
                    }}>
                    <Image
                        source={require('../../../Assets/Image/Acoount_setting.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.user_detail}>General</Text>
                </View>
                <View style={styles.toggle_container}>
                    <Text style={styles.Text_detail}>Notifications</Text>
                    <LinearGradient
                        colors={['rgb(62, 97, 173)', 'rgb(16,169,228)']}
                        style={styles.toggle}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}>
                        <Switch
                            trackColor={{ false: 'transparent', true: Colors.blue }}
                            thumbColor={notifications ? Colors.blueBar : Colors.text_Color}
                            ios_backgroundColor="#3e3e3e"
                            size={30}
                            onValueChange={() => handleNotification(!notifications)}
                            value={notifications}
                        />
                    </LinearGradient>
                </View>
                <View style={styles.toggle_container}>
                    <Text style={styles.Text_detail}>Finger Print, Face ID,</Text>
                    <LinearGradient
                        colors={['rgb(62, 97, 173)', 'rgb(16,169,228)']}
                        style={styles.toggle}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}>
                        <Switch
                            trackColor={{ false: 'transparent', true: Colors.blue }}
                            thumbColor={FingerToggle ? Colors.blueBar : Colors.text_Color}
                            ios_backgroundColor="#3e3e3e"
                            size={30}
                            onValueChange={() => handleBioToggle(!FingerToggle)}
                            value={FingerToggle}
                        />
                    </LinearGradient>
                </View>
                <View style={styles.toggle_container}>
                    <Text style={styles.Text_detail}>Picture</Text>
                    <LinearGradient
                        colors={['rgb(62, 97, 173)', 'rgb(16,169,228)']}
                        style={styles.toggle}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}>
                        <Switch
                            trackColor={{ false: 'transparent', true: Colors.blue }}
                            thumbColor={profile_pic ? Colors.blueBar : Colors.text_Color}
                            ios_backgroundColor="#3e3e3e"
                            size={30}
                            onValueChange={() => handleProfileToggle(!profile_pic)}
                            value={profile_pic}
                        />
                    </LinearGradient>
                </View>
            </View>
        </ImageBackground>
    );
};

export default AccountSetting;
