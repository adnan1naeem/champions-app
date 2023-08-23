import {
    Image,
    Text,
    View,
    ImageBackground,
    ScrollView,
  } from "react-native";
  import React from "react";
  import { Colors } from "../../../Utils/Colors";
  import CustomButton from "../../../Components/CustomButton";
  import { styles } from "./style";
  import { useNavigation } from "@react-navigation/native";
  const Congratulation = () => {
    const navigation = useNavigation();
    const handleSignUp = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    };
    return (
  
      <ImageBackground
        source={require('../../../Assets/Image/background_image.png')}
        style={{ flex: 1,backgroundColor: Colors.blueBackground }}
  
      >
        <ScrollView>
          <View style={styles.Login_main_view}>
            <Image style={styles.logo} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
          </View>
          <View style={styles.Container_view}>
  
            <View style={{height:150,paddingHorizontal:25,justifyContent:'center'}}>
                <Text style={styles.contact_text_2}>
                Congratulations your password has been changed successfully</Text>
            </View>
            <CustomButton
              onPress={() => handleSignUp()}
              ContainerStyle={{
                marginTop:50,
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
  
  export default Congratulation;