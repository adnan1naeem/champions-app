

// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";
let deviceWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blueBackground,
        paddingHorizontal: 10,
    },
    backButton: {
        width: 25,
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 30,
        marginLeft: 5,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    backIcon_style: {
        width: 30,
        borderRadius: 20,
    },
    Text: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text_Color,
    },
    toggle: {
        width: 45,
        borderRadius: 20,
    },

    user_detail: {
        paddingLeft: 5,
        fontSize: 16,
        color: Colors.text_Color,
        fontWeight: '400'
    },
    type_container: {
        marginTop: 30,
        gap: 20
    },
    toggle_container: {
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icons: {
        width: 15,
        height: 15
    },
    Text_detail: {
        color: '#D3D3D3',
        paddingLeft: 25,
        fontSize: 13,
        fontWeight: "200"

    }

});


