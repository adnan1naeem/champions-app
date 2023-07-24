import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import config from "../../../../../services/config";
const ContactUs = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View style={styles.Login_main_view}>
                    <Image style={styles.logo} source={require('../../../../Assets/Image/login_image.png')} resizeMode="contain" />
                </View>
                <View style={styles.Login_view}>
                    <View style={styles.unlock_view}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>
                            For Product Functionality Complaints
                        </Text>
                    </View>
                    <View style={{ width: "100%",paddingVertical:30 }}>
                        <View style={styles.container}>
                           <View style={{alignItems:'center'}}>
                           <Ionicons name="call-outline" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>042 111 635 635</Text>
                           </View>
                           <View style={{alignItems:'center'}}>
                           <Ionicons name="call-outline" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>0800-11 635</Text>
                           </View>
                           <View style={{alignItems:'center'}}>
                           <Ionicons name="logo-whatsapp" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>0800-11 635</Text>
                           </View>
                           <View style={{alignItems:'center'}}>
                           <Ionicons name="mail-outline" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>care@orient.com.pk</Text>
                           </View>
                        </View>
                    </View>
                    <View style={styles.unlock_view}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>
                            For Information about Online Orders
                        </Text>
                    </View>
                    <View style={{ width: "100%",paddingHorizontal:10,paddingVertical:30 }}>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
                           <View style={{alignItems:'center'}}>
                           <Ionicons name="call-outline" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>042 - 38107405</Text>
                           </View>
                           <View style={{alignItems:'center'}}>
                           <Ionicons name="mail-outline" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>onlinesales@orient.com.pk</Text>
                           </View>
                        </View>
                    </View>
                    <View style={styles.unlock_view}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>
                            For App Related Issues
                        </Text>
                    </View>
                    <View style={{ width: "100%",paddingHorizontal:10,paddingVertical:30 }}>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
                           <View style={{alignItems:'center'}}>
                           <Ionicons name="call-outline" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>042 - 38107405</Text>
                           </View>
                           <View style={{alignItems:'center'}}>
                           <Ionicons name="mail-outline" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>care@orient.com.pk</Text>
                           </View>
                        </View>
                    </View>
                    
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default ContactUs;