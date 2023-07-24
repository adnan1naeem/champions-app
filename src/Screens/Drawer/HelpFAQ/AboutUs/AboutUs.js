import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ImageBackground,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../../../Utils/Colors";
import CustomButton from "../../../../Components/CustomButton";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import config from "../../../../../services/config";
const AboutUs = () => {
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
                    <View style={styles.unlock_view}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>
                            About Us
                        </Text>
                    </View>
                    <View style={{ width: "85%", alignSelf: 'center', paddingVertical: 20 }}>
                        <View style={styles.container}>
                            <Text style={styles.about_text}>
                                At Orient Electronics we are determined to continuously enrich the lives of our valued customers by providing technologically advanced consumer electronics. Our products are aimed to enhance lifestyles of our customers and bringing maximum comfort and convenience into their lives.
                            </Text>
                            
                            <Text style={styles.about_text}>
                                As one of Pakistan’s fastest growing consumer electronics brand, Orient Electronics has established state of the art production facilities in collaboration with International Technology Partners.
                            </Text>
                            <Text style={styles.about_text}>
                                By maintaining the brand’s true innovative essence in terms of Technology, Research and Development, Orient is working on the ideas and concepts that have the aptitude of bringing positive change in the lives of the consumers.                            </Text>
                            <Text style={styles.about_text}>
                                Orient Electronics, located in Lahore, is a part of Orient Group of Companies which is considered as one of the fastest growing business entites in Pakistan. The Group has a diversified business portfolio in the fields of Consumer Electronics, Software Development, Technology Solutions, E-commerce, Porcelain Tiles Manufacturing, Power & Energy Generation, Hospitality, Healthcare, Apparel, Motors and Metals.
                            </Text>
                            <Text style={styles.about_text}>
                                Orient is well known for its innovative product portfolio based on extensive research and consumer insights. It is the first Pakistani brand which is providing full range of the most innovative, affordable and durable products to its valued customers.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default AboutUs;