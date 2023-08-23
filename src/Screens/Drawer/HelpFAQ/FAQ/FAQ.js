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
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../../../Components/Header/Header";
import BackButton from "../../../../Components/BackButton";
const FAQ = () => {
    const [mobile, setMobile] = useState(""); // Separate state for name
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>


                <View style={styles.unlock_view}>
                    <Text style={{ color: Colors.text_Color, fontSize: 20, fontWeight: "600" }}>
                        FAQs
                    </Text>

                </View>
                <View style={styles.Login_view}>
                    <View style={styles.unlock_view}>
                        <Text style={{ color: Colors.text_Color, fontSize: 20, fontWeight: "600" }}>
                            Air Conditions
                        </Text>

                    </View>

                    <View style={{ width: "85%", alignSelf: 'center', paddingVertical: 20 }}>
                        <View style={styles.container}>
                            <Text style={styles.faq_Heading}>
                                Why Orient Air-conditioners are the best choice?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient air-conditioners are technologically advanced coupled with state of the art features including T3 Optimized Inverter, Optimized Compressor Drive, Low Voltage Operation, Eco Gear Technology, Japanese Compressor to name a few.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                What is EComfort?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient smart Air-conditioners are wifi enabled and can be operated and controlled with Mevris – Orient’s proprietry mobile application. Mevris offers unique CPAD system to operate, control and further increase efficiencies of Orient Air-conditioners.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                What are different types of air-conditioners which Orient offers?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient offers wall mounted commonly known as split air-conditioners as well as Floor Standing air-conditioners both in DC Inverter and non-inverter technologies.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                What are the sizes of Air-conditioners?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient offers split air-conditioners in 1 ton, 1.5 ton and 2 tons whereas Floor Standing are in 2 ton and 4 ton.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                What is T3 Technology?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient T3 Technology means T3 Tropicalized Inverter and any T3 IoT DC Inverter AC performs best even at high ambient temperature of 60 degree Celsius.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                What is Auto Pilot feature and how much energy it can save?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient T3 IoT DC Inverter with Auto Pilot feature provides a choice of 5 different cooling control profiles to ensure up to 80% energy savings.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                What is Eco Gear Technology?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient Air-Conditioners also come with great Eco Gear Technology which gives option to run air-conditioner on any of the preset power saving system.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                Does Orient air-conditioner perform best at low voltage as well?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient T3 IoT DC Inverter air-conditioner operates on as low as 70 Volts without compromising on its cooling performance.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                What is Auto Clean Sterilization System?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient T3 IoT DC Inverter air-conditioners are equipped with built-in Auto Clean Sterilization System which automatically senses dust and also cleans its evaporator automatically to enhance its cooling and saves maximum electricity cost.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                How fast it can start cooling?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient T3 IoT DC Inverter air-conditioners are the fastest air-conditioners due to unique optimized Compressor Drive feature. It can assure Fast Cooling in 30 seconds and Fast Heating in just 60 seconds.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                What is built-in Energy Meter?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient T3 IoT DC Inverter air-conditioners have built-in energy meter which helps to easily monitor live consumption of electricity.

                            </Text>
                            <Text style={styles.faq_Heading}>
                                How durable and long lasting is PCB Kit?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient T3 IoT DC Inverter air-conditioners is equipped with new and improved Japanese PCB Kit for better protection from moisture for longer life and durability.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                Can Orient air-conditioner be used in winter also?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient T3 IoT DC Inverter air-conditioner with its dual heating and cooling functions is geared to provide maximum comfort in all seasons and weather conditions with greater electricity savings.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                Are Orient Air-Conditioners rust proof?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient T3 IoT DC Inverter air-conditioners come with protective Gold Fin Anti-Rust coating which prevents from corrosion caused by moisture.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                Can Orient Air-Conditioners clean air?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient T3 IoT DC Inverter air-conditioners keep all odors away and ensure to remove bacteria and germs to provide clean and fresh air.
                            </Text>
                            <Text style={styles.faq_Heading}>
                                How noisy are Orient air-conditioners?
                            </Text>
                            <Text style={styles.faq_text}>
                                Orient T3 IoT DC Inverter air-conditioners make minimum noise while ensuring maximum performance.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default FAQ;