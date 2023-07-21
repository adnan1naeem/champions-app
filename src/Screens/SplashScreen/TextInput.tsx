import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "@react-native-material/core";
// import { Colors } from "../utils/Colors";
// import fonts from "../utils/fonts";

const Textinput = ({ label }) => {
    return (
        <TextInput
            variant="outlined"
            label={label}
            color={"#C4C4C4"}
            placeholderTextColor={"#C4C4C4"}
            style={styles.textInput}
            inputStyle={styles.inputStyle}
        />
    );
};

export default Textinput;

const styles = StyleSheet.create({
    textInput: {
        marginHorizontal: 16,
        marginVertical: 5,
    },
    inputStyle: {
        fontFamily: "PoppinsMedium",
        color: "black",
    },
});