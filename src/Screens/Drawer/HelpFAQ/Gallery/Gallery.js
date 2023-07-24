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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import config from "../../../../../services/config";
const Gallery = () => {
    const [mobile, setMobile] = useState(""); // Separate state for name
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
                    <View style={{ width: "100%",paddingVertical:30,paddingHorizontal:50 }}>
                        <View style={styles.container}>
                           <View style={{alignItems:'center'}}>
                           <MaterialCommunityIcons name="book-open-page-variant-outline" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>Product Manuals</Text>
                           </View>
                           <View style={{alignItems:'center'}}>
                           <MaterialCommunityIcons name="video-image" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>Videos</Text>
                           </View>
                           <View style={{alignItems:'center'}}>
                           <Entypo name="new-message" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>Blogs</Text>
                           </View>
                        </View>
                    </View>
                    <View style={{ width: "100%",paddingVertical:30, }}>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
                           <View style={{alignItems:'center'}}>
                           <MaterialIcon name="menu-book" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>Catelogue</Text>
                           </View>
                           <View style={{alignItems:'center'}}>
                           <MaterialCommunityIcons name="book-check-outline" size={26} color="white" onPress={() => {  }} />
                           <Text style={{color:'white',fontSize:10}}>Policy</Text>
                           </View>
                        </View>
                    </View>
                    
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Gallery;