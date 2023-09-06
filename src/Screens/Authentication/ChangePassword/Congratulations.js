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
import Header from "../../../Components/Header/Header";
const Congratulation = ({ route }) => {
  const navigation = useNavigation();
  const handleSignUp = () => {
    if (route?.params?.keyName === "scan") {
      navigation.replace("Home");
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    }
  };
  return (

    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.blueBackground }}

    >
      <ScrollView>
        {route?.params?.keyName ?

          <Header /> :
          <View style={[styles.Login_main_view, { paddingTop: Platform.OS === "ios" ? 20 : 0 }]}>
            <Image style={{
              height: 100,
              width: '80%',
              alignSelf: 'center',
              paddingTop: 5
            }} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
          </View>}
        <View style={[styles.Container_view, { marginTop: '44%' }]}>

          <View style={{ height: 150, paddingHorizontal: 25, justifyContent: 'center' }}>
            <Text style={styles.contact_text_2}>
              {route?.params?.message}</Text>
          </View>
          <CustomButton
            onPress={() => handleSignUp()}
            ContainerStyle={{
              marginTop: 50,
              justifyContent: "center",
              alignSelf: "center",
              width: "80%",
              borderRadius: 15
            }}
            textStyle={{ color: Colors.text_Color, textAlign: "center", fontSize: 18, fontFamily: '200' }}
            title="Proceed"
          />
        </View>
      </ScrollView>
    </ImageBackground>

  );
};

export default Congratulation;