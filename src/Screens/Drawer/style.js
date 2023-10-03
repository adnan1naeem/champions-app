// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
let deviceWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blueBackground,
        paddingHorizontal: 10,
    },
    backButton: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 15,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    backIcon_style: {
        width: 30,
        borderRadius: 20,
    },
    drawerContainer: {
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'row',
        marginTop: 30,
        width: '90%',
        height: 100,
        paddingVertical: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#17b8f5',
        backgroundColor: 'transparent',
    },
    profile_continer: {
        marginLeft: 10,
        width: '25%',
        height: 80,
        borderRadius: 15,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#17b8f5',
    },
    DrawerProfile: {
        width: '100%',
        height: 77.5,
        borderRadius: 15,
    },
    image: {
        width: '10%',
        aspectRatio: 1,
        borderRadius: 15,
    },
    user_detail: {
        paddingLeft: 5,
        fontSize: 16,
        color: Colors.text_Color,
        fontWeight: '400',
    },
    user_detail_cate: {
        paddingLeft: 20,
        fontSize: 14,
        fontWeight: '200',
        color: Colors.text_Color,
    },
    forward_arrow: {
        borderRadius: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: '#4C64FF',
        padding: 15,
        marginLeft: 1,
        marginRight: 1,
        width: 198,
    },
    icons: {
        width: 15,
        height: 15,
    },
});
