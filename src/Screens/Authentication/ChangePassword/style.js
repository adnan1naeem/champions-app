

// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";
let deviceWidth = Dimensions.get("window").width;



export const styles = StyleSheet.create({
    Login_main_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    startScreen_text: {
        color: Colors.text_Color,
        fontSize: 30,
        fontWeight: '300',
    },
    logo: {
        height: 100,
        width: "85%",
        alignSelf: 'center'
    },
    Login_view: {
        paddingVertical: 70,
        width: '90%',
        backgroundColor: "#3F6FAD",
        marginTop: "30%",
        borderRadius: 40,
        alignSelf: "center",
        marginBottom: 15,
    },
    Container_view: {
        paddingVertical: 70,
        width: '90%',
        backgroundColor: "#3F6FAD",
        marginTop: "35%",
        borderRadius: 40,
        alignSelf: "center",
        marginBottom: 15,
    },
    contact_text: {
        fontSize: 18,
        fontWeight: '300',
        color: Colors.text_Color,
        textAlign: 'center'
    },
    contact_text_2: {
        fontSize: 20,
        fontWeight: '300',
        color: Colors.text_Color,
        textAlign: 'center'
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
        marginTop: 35,
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
        flexDirection:'row',
        borderBottomColor: Colors.text_Color,
        borderBottomWidth: 1,
        marginBottom: 10,
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
        marginTop: 10,
        fontSize: 18,
        fontWeight: '300',
    },
    inputError: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomColor: 'red',
        borderBottomWidth: 1,
        height: 50,
        marginBottom: 10,

    },
    icon: {
        marginRight: 10,
        marginBottom: 5

    },
    checkboxContainer: {
        flexDirection: 'row',
    },
    remember_view: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 40,
        marginVertical: 5,
    },
    forgotpassword: {
        color: '#789FC4',
        marginTop: 2,
        fontStyle: 'italic',
        fontWeight: "200",

    },
    proceed_button: {
        paddingVertical: 15,
        marginTop: 10,
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: Colors.blue,
        width: "80%",
        borderRadius: 15
    },
    Started: {
        marginTop: 15,
        color: Colors.text_Color,
        fontSize: 28,
        fontWeight: '400',
    },
    create_account: {
        color: Colors.text_Color,
        fontSize: 12,
        fontWeight: '100',
    },
    signin: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    text: {
        color: Colors.Half_white,
        fontSize: 11
    },
    checkboxGradient: {
        borderRadius: 5,
        height: 24,
        width: 24,
    },


});