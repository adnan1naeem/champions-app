import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    Text,
    ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../Utils/Colors';
import Header from '../../../Components/Header/Header';
import BackButton from '../../../Components/BackButton';
// import { ScrollView } from 'react-native-gesture-handler';
const HelpFAQ = ({ navigation }) => {



    return (
        <ImageBackground
            source={require('../../../Assets/Image/background_image.png')}
            style={styles.container}
            resizeMode="cover">
            <ScrollView>

                <Header />
                <BackButton navigation={navigation} marginTop='0' paddingVertical='0' />


                <View style={{ marginLeft: 20, marginTop: 5 }}>
                    <Text
                        style={{ fontSize: 16, fontWeight: '500', color: Colors.text_Color }}>
                        HELP
                    </Text>
                    <Text
                        style={{ fontSize: 12, fontWeight: '400', color: Colors.text_Color }}>
                        Account,{' '}Setting,{' '}More
                    </Text>
                </View>
                <View style={styles.help_container}>
                    <Text style={styles.header}>How we can Help?</Text>
                </View>
                <View style={styles.cate_container}>
                    <TouchableOpacity
                        style={styles.card_container1}
                        onPress={() => {
                            navigation.navigate('AboutUs');
                        }}>
                        <Entypo
                            name="dots-three-vertical"
                            color={'#7645EA'}
                            style={{ alignSelf: 'flex-end', margin: 10 }}
                        />
                        <View style={styles.Text_container}>
                            <Text style={styles.cate_heading}>About</Text>
                            <Text style={styles.user_detail}>Orient Champion</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.card_container2}
                        onPress={() => {
                            navigation.navigate('FAQ');
                        }}>
                        <Entypo
                            name="dots-three-vertical"
                            color={'#E6716F'}
                            style={{ alignSelf: 'flex-end', margin: 10 }}
                        />
                        <View style={styles.Text_container}>
                            <Text style={styles.cate_heading}>FAQ</Text>
                            <Text style={styles.user_detail}>Questions/Ans</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.cate_container}>
                    <TouchableOpacity
                        style={styles.card_container3}
                        onPress={() => {
                            navigation.navigate('ContactUs');
                        }}>
                        <Entypo
                            name="dots-three-vertical"
                            color={'#D8A422'}
                            style={{ alignSelf: 'flex-end', margin: 10 }}
                        />
                        <View style={styles.Text_container}>
                            <Text style={styles.cate_heading}>Contact Us</Text>
                            <Text style={styles.user_detail}>Customer Center</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AboutUs', { privacy: true })}
                        style={styles.card_container4}>
                        <Entypo
                            name="dots-three-vertical"
                            color={'#409EE5'}
                            style={{ alignSelf: 'flex-end', margin: 10 }}
                        />
                        <View style={styles.Text_container}>
                            <Text style={styles.cate_heading}>Privacy Policy</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.cate_container}>
                    <TouchableOpacity
                        style={styles.card_container5}
                        onPress={() => {
                            navigation.navigate('Gallery');
                        }}>
                        <Entypo
                            name="dots-three-vertical"
                            color={'#3CC16B'}
                            style={{ alignSelf: 'flex-end', margin: 10 }}
                        />
                        <View style={styles.Text_container}>
                            <Text style={styles.cate_heading}>Gallery</Text>
                            <Text style={styles.user_detail}>Product Catelogue</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.card_container6}
                        onPress={() => {
                            navigation.navigate('TermsAndCondition');
                        }}>
                        <Entypo
                            name="dots-three-vertical"
                            color={'#35A7B6'}
                            style={{ alignSelf: 'flex-end', margin: 10 }}
                        />
                        <View style={styles.Text_container}>
                            <Text style={styles.cate_heading}>Terms & Conditions</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground >
    );
};

export default HelpFAQ;
