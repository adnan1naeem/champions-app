import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../../Utils/Colors';
import BackButton from '../../../../Components/BackButton';
import Header from '../../../../Components/Header/Header';
const Gallery = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
            <ScrollView>
                <View style={{ paddingHorizontal: 10 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 17,
                        color: Colors.text_Color,
                        marginTop: -20,
                        fontWeight: 'bold',
                    }}>
                    Gallery
                </Text>

                <View style={styles.Login_view}>
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProductManuals')}
                            style={{ alignItems: 'center', padding: 5 }}>
                            <MaterialCommunityIcons
                                name="book-open-page-variant-outline"
                                size={29}
                                color={Colors.text_Color}
                            />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                                Product Manuals
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Videos')}
                            style={{ alignItems: 'center', padding: 5 }}>
                            <MaterialCommunityIcons
                                name="video-image"
                                size={29}
                                color={Colors.text_Color}
                            />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                                Videos
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Blogs')}
                            style={{ alignItems: 'center', padding: 5 }}>
                            <Entypo name="new-message" size={29} color={Colors.text_Color} />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                                Blogs
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            paddingVertical: 20,
                            flexDirection: 'row',
                            paddingHorizontal: 25,
                        }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Catelogue')}
                            style={{ paddingLeft: 15, alignItems: 'center', padding: 5 }}>
                            <MaterialIcon
                                name="menu-book"
                                size={29}
                                color={Colors.text_Color}
                            />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                                Catelogue
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Policy')}
                            style={{
                                alignItems: 'center',
                                flex: 1,
                                alignItems: 'center',
                                padding: 5,
                            }}>
                            <MaterialCommunityIcons
                                name="book-check-outline"
                                size={29}
                                color={Colors.text_Color}
                            />
                            <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                                Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Gallery;
