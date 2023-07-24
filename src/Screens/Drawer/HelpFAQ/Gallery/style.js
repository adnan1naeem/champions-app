

// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../../Utils/Colors";
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
        color: Colors.White,
        fontSize: 30,
        fontWeight: 300,
    },
    Login_view: {
        paddingVertical: 10,
        width: '90%',
        backgroundColor: "#3F6FAD",
        marginTop: "30%",
        borderRadius: 40,
        alignSelf: "center",
    },
    unlock_view: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        width: '90%',
        borderRadius: 10,
        alignSelf: "center",
        // marginTop: 30,
        // Add the borderColor property

    },
    Unlock_Icon: {
        color: Colors.White
    },
    container: {
        // alignItems: 'flex-end',
        flex:1,
        justifyContent:'space-between',
        // paddingHorizontal:20,
        flexDirection:'row',
        // marginBottom: 10,
        // paddingBottom: 5,
        // alignSelf:'center',

    },
    about_text:{
        fontSize:14,
        fontWeight:300,
        color:Colors.White,
        paddingBottom:8,
        lineHeight:20
        
    },
    
    icon: {
        marginRight: 10,
        marginBottom: 5

    },
    
});


