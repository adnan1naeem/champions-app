import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from 'react-native-linear-gradient';
import { styles } from "./style";
const DrawerScreen = () => {
    const navigation = useNavigation();

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
            source={require('../../Assets/Image/background_image.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <LinearGradient
                        colors={['rgb(39, 174, 229)', 'rgb(41,128,201)', 'rgb(50,107,194)', 'rgb(59,90,183)']}
                        style={styles.backIcon_style}
                        start={{ x: 0, y: 0 }} // Start from the left side
                        end={{ x: 1, y: 0 }} // End at the right side
                    >
                        <Ionicons name="chevron-back" size={25} color="white" style={styles.Icon} />
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.replace("EditProfile")
                }} style={{
                    flex: 1, marginTop: 40,
                    marginBottom: 5,
                    marginLeft: 5,
                    justifyContent:'center',
                    alignItems:"flex-end",
                }}>
                    <Text style={{color:'white'}}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: 'white', }}>ACCOUNT SETTINGS</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', color: 'white', }}>Account,Setting,More</Text>
            </View>
            <View style={styles.drawerContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.profile_continer}>
                        <Image source={require('../../Assets/Image/amir.jpg')} style={{ height: 60, width: 50, borderRadius: 30 }} />
                    </View>
                    <View style={{ marginLeft: 15, justifyContent: 'center' }}>
                        <Text style={styles.user_detail}>Amir Ali</Text>
                        <Text style={styles.user_detail}>0333-3593699</Text>
                        <Text style={styles.user_detail}>Lahore Center</Text>
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: 30, marginTop: 30, gap: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../Assets/Image/Acoount_setting.png')} style={styles.icons} />
                    <Text style={styles.user_detail_cate}>
                        Account Setting
                    </Text>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}
                        onPress={() => { navigation.navigate('AccountSetting') }}>
                        <LinearGradient
                            colors={['rgb(39, 174, 229)', 'rgb(41,128,201)', 'rgb(50,107,194)', 'rgb(59,90,183)']}
                            style={styles.forward_arrow}
                            start={{ x: 0, y: 0 }} // Start from the left side
                            end={{ x: 1, y: 0 }} // End at the right side
                        >
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../Assets/Image/help.png')} style={styles.icons} />
                    <Text style={styles.user_detail_cate}>Help/FAQ</Text>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}
                        onPress={() => { navigation.navigate('HelpFAQ') }}>
                        <LinearGradient
                            colors={['rgb(39, 174, 229)', 'rgb(41,128,201)', 'rgb(50,107,194)', 'rgb(59,90,183)']}
                            style={styles.forward_arrow}
                            start={{ x: 0, y: 0 }} // Start from the left side
                            end={{ x: 1, y: 0 }} // End at the right side
                        >
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../Assets/Image/signout.png')} style={styles.icons} />
                    <Text style={styles.user_detail_cate}>Sign Out</Text>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={() => SignOut()}>
                        <LinearGradient
                            colors={['rgb(39, 174, 229)', 'rgb(41,128,201)', 'rgb(50,107,194)', 'rgb(59,90,183)']}
                            style={styles.forward_arrow}
                            start={{ x: 0, y: 0 }} // Start from the left side
                            end={{ x: 1, y: 0 }} // End at the right side
                        >
                            <Ionicons name="chevron-forward" size={20} color="white" style={{ justifyContent: 'center', borderRadius: 10, }} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};



export default DrawerScreen;
