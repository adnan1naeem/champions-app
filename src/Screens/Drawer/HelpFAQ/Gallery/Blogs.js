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
                <View style={{ paddingHorizontal: 20 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>
                <Image source={require('../../../../Assets/Image/Blog.png')} style={{ height: 50, width: 50, resizeMode: 'contain', alignSelf: 'center', tintColor: Colors.White, }} />
                <Text style={{ textAlign: 'center', paddingTop: 5, fontSize: 10, color: Colors.text_Color }}>Blog</Text>
                <View style={[styles.Login_view, { paddingBottom: 40 }]}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                        <Image source={require('../../../../Assets/Image/product1.jpeg')} style={{ height: 170, width: 150, resizeMode: 'contain', marginTop: 15 }} />
                        <Image source={require('../../../../Assets/Image/product1.jpeg')} style={{ height: 170, width: 150, resizeMode: 'contain', marginTop: 15 }} />
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