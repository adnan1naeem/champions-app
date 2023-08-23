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
import { Colors } from "../../../Utils/Colors";
import CustomButton from "../../../Components/CustomButton";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import config from "../../../../services/config";
import BackButton from "../../../Components/BackButton";
const ForgetPassword = () => {
    const [mobile, setMobile] = useState(""); // Separate state for name
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../../Assets/Image/background_image.png')}
            style={{ flex: 1,backgroundColor: Colors.blueBackground }}
        >
            <ScrollView>
            <View style={{marginTop:25,paddingHorizontal:20}}>
      <BackButton navigation={navigation}/>
      </View>
                <View style={styles.Login_main_view}>
                    <Image style={styles.logo} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
                </View>
                <View style={styles.Login_view}>
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
                                value={mobile} // Set the value of the input field to name state
                                onChangeText={setMobile} // Update the name state when the text changes
                            />
                        </View>
                    </View>
                    <CustomButton
                        onPress={() => navigation.navigate('PinCodeScreen')}
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