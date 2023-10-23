import {
  Image,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { Colors } from "../../../Utils/Colors";
import CustomButton from "../../../Components/CustomButton";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

const ConfirmPassword = () => {

  const navigation = useNavigation();

  const handleCongratulation = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (

    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.blueBackground }}

    >
      <ScrollView>
        <View style={[styles.Login_main_view, { paddingTop: Platform.OS === 'ios' ? 20 : 0 }]}>
          <Image style={styles.logo} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
        </View>
        <View style={styles.Container_view}>

          <View style={{ height: 150, paddingHorizontal: 10, justifyContent: 'center', alignSelf: 'center' }}>
            <Text style={styles.contact_text}>
              If anyassistance is required please contact to app coordinator</Text>
          </View>
          <CustomButton
            onPress={() => handleCongratulation()}
            ContainerStyle={{
              marginTop: 50,
              justifyContent: "center",
              alignSelf: "center",
              width: "80%",
              borderRadius: 15
            }}
            textStyle={{ color: Colors.text_Color, textAlign: "center", fontSize: 18, fontFamily: '200' }}
            title="Procced"
          />
        </View>
      </ScrollView>
    </ImageBackground>

  );
};

export default ConfirmPassword;