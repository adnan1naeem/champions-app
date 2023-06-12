import { Image, StyleSheet, Text, AppState, View, Modal } from "react-native";
import React, { useState, useRef } from "react";
import Home from "../Home/Index";
import { Colors } from "../../Utils/Colors";
// import OTPInputView from '@twotalltotems/react-native-otp-input';

const PinCodeScreen = () => {
  const [isModalVisible, setisModalVisible] = useState(false);

  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue("1234");
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={{ zIndex: 0, height: "100%" }}>
          <Home />
        </View>

        <Modal
          isVisible={isModalVisible}
          transparent={true}
          backdropOpacity={0.1}
          onBackdropPress={() => setisModalVisible(false)}
          style={{ alignItems: "center", alignContent: "center" }}
          animationIn={"zoomIn"}
        >
          <View
            style={{
              zIndex: 1,
              backgroundColor: Colors.White,
              position: "absolute",
              height: "90%",
              bottom: 5,
              width: "90%",
              alignSelf: "center",
            }}
          >
            <Image
              source={require("../../../assets/Orient.png")}
              style={{ resizeMode: "contain", width: 200, alignSelf: "center" }}
            />
          </View>

          {/* <OTPInputView
                  autoFocusOnLoad={true}
                  pinCount={6}
                  style={styles.optStyling}
                  codeInputHighlightStyle={{borderColor: Colors.blue}}
                  codeInputFieldStyle={styles.optContainer}
                  // handleChange={value => setCode(value)}
                /> */}
        </Modal>
      </View>
    </View>
  );
};

export default PinCodeScreen;

const styles = StyleSheet.create({
    optContainer: {
    borderWidth:1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    height: 60,
    width: 40,
    color: Colors.black,
    textAlign: "center",
  },
   optStyling: {
    marginVertical: 30,
    width:  "85%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    color: Colors.black,
  },
});
