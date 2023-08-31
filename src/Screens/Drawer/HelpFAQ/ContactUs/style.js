import { StyleSheet } from 'react-native';
import { Colors } from '../../../../Utils/Colors';

export const styles = StyleSheet.create({
    Login_main_view: {
        marginTop: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        height: 100,
        width: '85%',
        alignSelf: 'center',
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
        marginTop: '15%',
        borderRadius: 40,
        alignSelf: 'center',
        paddingHorizontal: 20,
    },
    unlock_view: {
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 30,
    },
    Unlock_Icon: {
        color: Colors.text_Color,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 55,
    },
    ContainerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
