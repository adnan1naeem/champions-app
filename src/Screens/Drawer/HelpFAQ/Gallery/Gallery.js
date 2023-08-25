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
const Gallery = () => {
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
                <View style={styles.Login_view}>

                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProductManuals')} style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons name="book-open-page-variant-outline" size={26} color={Colors.text_Color} onPress={() => { }} />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>Product Manuals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Videos')} style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons name="video-image" size={26} color={Colors.text_Color} onPress={() => { }} />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>Videos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Blogs')} style={{ alignItems: 'center' }}>
                            <Entypo name="new-message" size={26} color={Colors.text_Color} onPress={() => { }} />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>Blogs</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: "100%", paddingVertical: 20, flexDirection: 'row',
                        paddingHorizontal: 25

                    }}>

                        <TouchableOpacity onPress={() => navigation.navigate('Catelogue')} style={{ alignItems: 'center', paddingLeft: 15 }}>
                            <MaterialIcon name="menu-book" size={26} color={Colors.text_Color} onPress={() => { }} />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>Catelogue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Policy')} style={{ alignItems: 'center', alignSelf: 'center', flex: 1 }}>
                            <MaterialCommunityIcons name="book-check-outline" size={26} color={Colors.text_Color} onPress={() => { }} />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>Policy</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Gallery;