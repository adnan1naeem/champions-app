import {
    Text,
    Button,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    FlatList,
    Image,
    ImageBackground,
    StatusBar
} from "react-native";
// import { Image } from "native-base";
import React, { useState } from "react";
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/Ionicons';
import Header from "../../Components/Header/Header";
import CustomButton from "../../Components/CustomButton";
const Scan = () => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground
                source={require('../../Assets/Image/background_image.png')}
                style={styles.container}
                resizeMode="cover"
            >
                <StatusBar hidden={true} />
                <Header />
                <View style={styles.Login_view}>
                    <View style={styles.unlock_view}>
                        <TextInput
                            
                            placeholder="Enter Code Manually"
                            placeholderTextColor="#FFFFFF"
                            style={{ fontSize: 17,color:'white' }}
                        />
                    </View>
                    <View style={styles.scanner_view}>
                        <View style={styles.scanner_sub_view}>
                            <Image source={require('../../Assets/Image/QR_code.png')} style={{height:90,width:90,backgroundColor:'white'}}/>
                            {/* <Icon style={styles.Unlock_Icon} name="finger-print-outline" size={70} color="black" /> */}
                            {/* <Icon style={styles.Unlock_Icon} name="finger-print-outline" size={70} color="black" /> */}
                            <Image source={require('../../Assets/Image/barcode.jpg')} style={{height:90,width:125,backgroundColor:'white'}}/>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: "center", gap: 10 }}>
                        <CustomButton
                            onPress={() => { }}
                            ContainerStyle={styles.proceed_button}
                            textStyle={styles.text}
                            title="QR CODE"
                        />
                        <CustomButton
                            onPress={() => { }}
                            ContainerStyle={styles.proceed_button}
                            textStyle={styles.text}
                            title="BARCODE"
                        />
                    </View>

                </View>

            </ImageBackground>
        </ScrollView>
    );
};

export default Scan;