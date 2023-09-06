import {
    Image,
    Text,
    View,
    TextInput,
    ImageBackground,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../Utils/Colors";
import CustomButton from "../../../Components/CustomButton";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../../../../Constants";
import BackButton from "../../../Components/BackButton";
const ForgetPassword = () => {
    const [mobile, setMobile] = useState("");
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const handleForgot = async () => {
        if (mobile?.length !== 13) {
            alert("Please enter valid cnic code");
            return;
        }
        setLoading(true);
        try {
            const data = {
                cnic: mobile,
            };

            const config = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(`${API_BASE_URL}/forgetPassword`, config);
            if (!response?.ok) {
                setLoading(false);
                if (response?.status === 404) {
                    alert("User not Exist\nPlease check your CNIC and try again.");
                    return;
                }
                alert("User not Exist\nPlease check your CNIC and try again.");
                // throw new Error("Network response was not ok");
                return;
            }
            const responseData = await response.json();
            console.log("Login Response: ", response?.token);
            if (responseData) {
                setLoading(false)
                navigation.replace('PinCodeScreen', { cnic: mobile });
            } else {
                setLoading(false);
                Alert.alert("Invalid Password", "Please check your password and try again.");
            }
        } catch (error) {
            setLoading(false);
            console.log("Error posting data:", error?.message);
        }
    };

    return (
        <ImageBackground
            source={require('../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground }}
        >
            <ScrollView>

                <View style={{ marginTop: 35, marginHorizontal: 15 }}>
                    <BackButton navigation={navigation} />
                </View>
                <Image style={styles.logo} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
                <View style={[styles.Login_view, { marginTop: '33%' }]}>
                    <View style={styles.unlock_view}>
                        <Text style={{ color: Colors.text_Color, fontSize: 20, fontWeight: 200 }}>
                            Enter CNIC
                        </Text>
                    </View>
                    <View style={{ width: "70%", alignSelf: "center" }}>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={Colors.text_Color}
                                placeholder=""
                                marginLeft={20}
                                value={mobile}
                                onChangeText={setMobile}
                            />
                        </View>
                    </View>
                    <CustomButton
                        loading={loading}
                        onPress={() => handleForgot()}
                        ContainerStyle={{
                            paddingVertical: 15,
                            marginTop: 30,
                            marginBottom: 30,
                            justifyContent: "center",
                            alignSelf: "center",
                            height: 50,
                            width: "80%",
                            borderRadius: 15,
                        }}
                        textStyle={{ color: Colors.text_Color, textAlign: "center", fontSize: 18, fontWeight: 300 }}
                        title="Send Pin"
                    />

                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default ForgetPassword;