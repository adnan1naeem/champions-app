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
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
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
                <Entypo name="video-image" style={{alignSelf:'center'}} size={26} color={Colors.text_Color} />
                <Text style={{ textAlign: 'center', fontSize: 18, color: Colors.text_Color }}>Catalogue</Text>

                <View style={[styles.Login_view, { paddingBottom: 40 }]}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                        <Image source={require('../../../../Assets/Image/product1.jpeg')} style={{ height: 170, width: 150, resizeMode: 'contain', marginTop: 15 }} />
                        <Image source={require('../../../../Assets/Image/product3.jpeg')} style={{ height: 200, width: 140, resizeMode: 'contain' }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 10 }}>
                        <Image source={require('../../../../Assets/Image/product2.jpeg')} style={{ height: 170, width: 150, resizeMode: 'contain' }} />
                        <Image source={require('../../../../Assets/Image/product2.jpeg')} style={{ height: 170, width: 150, resizeMode: 'contain' }} />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default ProductManuals;