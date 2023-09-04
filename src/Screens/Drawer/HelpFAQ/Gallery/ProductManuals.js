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
import { Colors } from "../../../../Utils/Colors";
import BackButton from "../../../../Components/BackButton";
import Header from "../../../../Components/Header/Header";
const ProductManuals = () => {
    const [mobile, setMobile] = useState(""); // Separate state for name
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground }}
        >
            <ScrollView>
                <View style={{ paddingHorizontal: 10 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>
                <MaterialCommunityIcons name="book-open-page-variant-outline" style={{ alignSelf: 'center' }} size={26} color={Colors.text_Color} />
                <Text style={{ textAlign: 'center', paddingTop: 5, fontSize: 18, color: Colors.text_Color }}>Product Manuals</Text>

                <View style={[styles.Login_view, { paddingBottom: 25 }]}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '4%', paddingVertical: 10 }}>
                        <Image source={require('../../../../Assets/Image/product1.jpeg')} style={{ height: 170, width: '48%', resizeMode: 'stretch', }} />
                        <Image source={require('../../../../Assets/Image/product3.jpeg')} style={{ height: 170, width: '48%', resizeMode: 'stretch' }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '4%' }}>
                        <Image source={require('../../../../Assets/Image/product2.jpeg')} style={{ height: 170, width: '48%', resizeMode: 'stretch' }} />
                        <Image source={require('../../../../Assets/Image/product2.jpeg')} style={{ height: 170, width: '48%', resizeMode: 'stretch' }} />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default ProductManuals;