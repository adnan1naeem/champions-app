

// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";
let deviceWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
    },


    user_detail: {
        fontSize: 14,
        color: Colors.text_Color,
        fontWeight: '400'
    },
    help_container: {
        marginTop: "20%",
        alignItems: 'center'
    },
    header: {
        fontSize: 18,
        color: Colors.text_Color
    },
    cate_container: {
        marginTop: "5%",
        paddingHorizontal: 20,
        flexDirection: 'row',
        gap: 20,
        height: 150,
    },
    card_container1: {
        height: "100%",
        width: "45%",
        backgroundColor: '#AB84EF',
        borderRadius: 20
    },
    card_container2: {
        height: "100%",
        width: "45%",
        backgroundColor: '#F39893',
        borderRadius: 20
    },
    card_container3: {
        height: "100%",
        width: "45%",
        backgroundColor: '#E3C445',
        borderRadius: 20
    },
    card_container4: {
        height: "100%",
        width: "45%",
        backgroundColor: '#73C6F0',
        borderRadius: 20
    },
    card_container5: {
        height: "100%",
        width: "45%",
        backgroundColor: '#62CF95',
        borderRadius: 20
    },
    card_container6: {
        height: "100%",
        width: "45%",
        backgroundColor: '#67D0C2',
        borderRadius: 20
    },
    cate_heading: {
        fontSize: 16,
        // fontWeight: 600,
        color: Colors.text_Color,

    },
    Text_container: {
        flex: 1,
        marginTop: 45,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

