

// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";
let deviceWidth = Dimensions.get("window").width;



export const styles = StyleSheet.create({
    Login_main_view: {


    },
    logo: {
        height: 100,
        width: "85%",
        alignSelf: 'center',
        marginTop: "10%",
    },
    startScreen_text: {
        color: Colors.text_Color,
        fontSize: 30,
        fontWeight: '300',
    },
    Login_view: {
        paddingVertical: 30,
        paddingBottom: "10%",
        width: '90%',
        backgroundColor: "#3F6FAD",
        marginTop: "20%",
        borderRadius: 40,
        marginBottom: 15,
        alignSelf: "center",
    },
    unlock_view: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: '#4F81BF',
        width: '75%',
        height: 130,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10,
        alignItems: "center",
        borderWidth: 1.5,
        borderLeftColor: '#3DB2DE',
        borderRightColor: '#5C91D3',
        borderTopColor: '#4CACE1',
        borderBottomColor: '#4493C9',

    },
    Unlock_Icon: {
        color: Colors.text_Color
    },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomColor: Colors.text_Color,
        borderBottomWidth: 1,
        height: 50,
        marginBottom: 10,
        paddingBottom: 5,
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 8,

    },
    label: {
        color: '#84ADD2',
        fontSize: 14,
        fontWeight: '400'
    },
    input: {
        flex: 1,
        color: Colors.text_Color,
        textTransform: 'none',
        // marginTop: 10,
        fontSize: 20,
        fontWeight: '200',
        // backgroundColor:'red'
    },
    icon: {
        marginRight: 10,
        marginBottom: 5

    },
    checkboxContainer: {
        flexDirection: 'row',
    },
    otp_not_received: {
        flex: 1,
    },
    otp: {
        fontWeight: '600',
        color: Colors.text_Color,
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center'

    },
    remember_view: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 40,
        marginVertical: 5,
    },
    forgotpassword: {
        color: Colors.text_Color,
        marginTop: 5,
        fontStyle: 'italic',
        fontWeight: "200",
        fontSize: 12
    },
    proceed_button: {
        paddingVertical: 15,
        marginTop: 10,
        justifyContent: "center",
        alignSelf: "center",
        height: 50,
        width: "80%",
        borderRadius: 15
    }

});


