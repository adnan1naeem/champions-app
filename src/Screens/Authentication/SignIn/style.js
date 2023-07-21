

// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";
import { colors } from "react-native-elements";
let deviceWidth = Dimensions.get("window").width;



export const styles = StyleSheet.create({
    Login_main_view: {
        marginTop: "10%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logo: {
        height: 100,
        width: "85%",
        alignSelf: 'center'
    },
    startScreen_text: {
        color: "white",
        fontSize: 30,
        fontWeight: 300,
    },
    Login_view: {
        paddingVertical: 30,
        paddingBottom: "10%",
        width: '90%',
        backgroundColor: "#3F6FAD",
        marginTop: "35%",
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
        borderBottomColor: '#4493C9', // Add the borderColor property

    },
    Unlock_Icon: {
        color: 'white'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomColor: 'white',
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
        color: 'white',
        marginTop: 10,
        fontSize: 20,
        fontWeight: '200',
    },
    icon: {
        marginRight: 10,
        marginBottom: 5

    },
    checkboxContainer: {
        flexDirection: 'row',
    },
    otp_not_received: {
        flex:1,
        justifyContent: 'center',
        width:"80%",
        paddingHorizontal:20,
        alignSelf:'center'

    },
    otp: {
        flex:1,
        justifyContent:'center',
        color: "white",
        fontWeight: 600,
         color: 'white',
        fontSize: 14

    },
    remember_view: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 40,
        marginVertical: 5,
    },
    forgotpassword: {
        color: '#789FC4',
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


