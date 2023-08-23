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
import { Colors } from "../../../../Utils/Colors";
const Gallery = () => {
    const [mobile, setMobile] = useState(""); // Separate state for name
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <Ionicons name="chevron-back" size={25} style={{ paddingTop: 15, paddingLeft: 15 }} color={Colors.text_Color} onPress={() => navigation.goBack()} />

                <View style={styles.Login_main_view}>
                    <Image style={styles.logo} source={require('../../../../Assets/Image/login_image.png')} resizeMode="contain" />
                </View>
                <View style={styles.Login_view}>

                    <View style={styles.container}>
                        <View style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons name="book-open-page-variant-outline" size={26} color={Colors.text_Color} onPress={() => { }} />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>Product Manuals</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons name="video-image" size={26} color={Colors.text_Color} onPress={() => { }} />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>Videos</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Entypo name="new-message" size={26} color={Colors.text_Color} onPress={() => { }} />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>Blogs</Text>
                        </View>
                    </View>
                    <View style={{
                        width: "100%", paddingVertical: 20, flexDirection: 'row',
                        paddingHorizontal: 25

                    }}>

                        <View style={{ alignItems: 'center', paddingLeft:15}}>
                            <MaterialIcon name="menu-book" size={26} color={Colors.text_Color} onPress={() => { }} />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>Catelogue</Text>
                        </View>
                        <View style={{ alignItems: 'center',alignSelf:'center',flex:1 }}>
                            <MaterialCommunityIcons name="book-check-outline" size={26} color={Colors.text_Color } onPress={() => { }} />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>Policy</Text>

                        </View>
                    </View>

                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Gallery;