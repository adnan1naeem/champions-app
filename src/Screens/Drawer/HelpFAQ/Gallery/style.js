// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../../../Utils/Colors';
let deviceWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    Login_main_view: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ListHeaderStyle: {
        paddingBottom: 35,
        paddingTop: 28,
        backgroundColor: '#3F6FAD',
        borderRadius: 40,
        alignSelf: 'center',
        paddingHorizontal: 10,
        width: '90%',
    },
    logo: {
        height: 100,
        width: '85%',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    startScreen_text: {
        color: Colors.text_Color,
        fontSize: 30,
        fontWeight: '300',
    },
    Login_view: {
        paddingVertical: 10,
        width: '90%',
        backgroundColor: '#3F6FAD',
        borderRadius: 40,
        alignSelf: 'center',
        paddingBottom: 20,
        marginTop: 50,
    },
    unlock_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        // marginTop: 30,
        // Add the borderColor property
    },
    privacyDetailText: {
        fontSize: 13,
        textAlign: 'center',
        color: Colors.text_Color,
        paddingVertical: 2,
        paddingHorizontal: 3,
        paddingTop: 15
    },
    Unlock_Icon: {
        color: Colors.text_Color,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    about_text: {
        fontSize: 14,
        fontWeight: '300',
        color: Colors.text_Color,
        paddingBottom: 8,
        lineHeight: 20,
    },

    icon: {
        marginRight: 10,
        marginBottom: 5,
    },
});
