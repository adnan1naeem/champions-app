

// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";
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
        color: Colors.text_Color,
        fontSize: 30,
        fontWeight: '300',
    },
    Login_view: {
        paddingVertical: 30,
        width: '90%',
        backgroundColor: "#3F6FAD",
        marginTop: "30%",
        borderRadius: 40,
        marginBottom:15,
        alignSelf: "center",
    },
    unlock_view: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        width: '75%',
        height: 30,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 30,
        // Add the borderColor property

    },
    Unlock_Icon: {
        color: Colors.text_Color
    },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomColor: Colors.text_Color,
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingBottom: 5,
        paddingVertical:150
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
        fontSize:12
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


