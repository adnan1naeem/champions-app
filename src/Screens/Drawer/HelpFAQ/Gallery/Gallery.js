import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView,
    FlatList,
    Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../../../Utils/Colors';
import BackButton from '../../../../Components/BackButton';
import Header from '../../../../Components/Header/Header';
const Gallery = ({ route }) => {
    const navigation = useNavigation();
    const data = [
        // {
        //     id: '1',
        //     icon: 'book-open-page-variant-outline',
        //     text: 'Product Manuals',
        //     onPress: 'ProductManuals',
        // },
        {
            id: '2',
            icon: 'video-image',
            text: 'Videos',
            onPress: 'Videos',
        },
        {
            id: '3',
            icon: 'new-message',
            text: 'Blogs',
            onPress: 'Blogs',
        },
        {
            id: '4',
            icon: 'menu-book',
            text: 'Catalogue',
            onPress: 'Catelogue',
        },
        {
            id: '5',
            icon: 'book-check-outline',
            text: 'Privacy Policy',
            onPress: 'Policy',
        },
        {
            id: '6',
            icon: 'book-check-outline',
            text: 'FSM Policy',
            // onPress: 'https://orient.com.pk/',
        },
        {
            id: '7',
            icon: require('../../../../Assets/Image/help.png'),
            text: 'Help/FAQ',
            onPress: 'HelpFAQ',
        },

        {
            id: '8',
            icon: 'facebook',
            text: 'Facebook',
            onPress: 'https://www.facebook.com/Orient.Pakistan',
        },
        {
            id: '9',
            icon: 'instagram',
            text: 'Instagram',
            onPress: 'https://www.instagram.com/orient.electronics/?hl=en',
        },
        {
            id: '10',
            icon: 'linkedin',
            text: 'LinkedIn',
            onPress: 'https://www.linkedin.com/company/orient-electronics/',
        },
        {
            id: '11',
            icon: 'youtube',
            text: 'You Tube',
            onPress: 'https://www.youtube.com/@OrientElectronicsOfficial',
        },
        {
            id: '12',
            icon: 'web',
            text: 'https://orient.com.pk',
            onPress: 'https://orient.com.pk/',
        },
        {
            id: '13',
            icon: 'tiktok',
            text: 'tiktok',
            onPress: 'https://www.tiktok.com/@orient.electronics?_t=8hLamd8mynQ&_r=1',
        },
    ];

    const CustomListItem = ({ item, navigation }) => {
        const handlePress = () => {
            if (item?.onPress?.startsWith('http')) {
                Linking.openURL(item?.onPress);
                return;
            } else if (typeof item.onPress === 'string') {
                navigation.navigate(item.onPress);
                return;
            } else if (item?.id === '6') {
                navigation.navigate('Fsm_Policy', { privacy: true });
                return;
            }
        };

        return (
            <TouchableOpacity
                onPress={handlePress}
                style={{ alignItems: 'center', flex: 1, paddingVertical: 15 }}>
                {item.id === '3' ? (
                    <Entypo name={item.icon} size={29} color={Colors.text_Color} />
                ) : item.id === '4' ? (
                    <MaterialIcon name={item.icon} size={29} color={Colors.text_Color} />
                ) : item.id === '7' ? (
                    <Image
                        source={item?.icon}
                        style={{
                            alignSelf: 'center',
                            height: 26,
                            width: 26,
                            resizeMode: 'contain',
                            tintColor: Colors.text_Color,
                        }}
                    />
                ) : item.id === '13' ? <MaterialIcons name={item.icon} size={29} color={Colors.text_Color} /> : (
                    <MaterialCommunityIcons
                        name={item.icon}
                        size={29}
                        color={Colors.text_Color}
                    />
                )}
                <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                    {item.text}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
            <ScrollView>
                <View style={{ paddingHorizontal: 10 }}>
                    <Header />
                    <View style={{ width: 80, paddingVertical: 5 }}>
                        <BackButton navigation={navigation} />
                    </View>
                </View>

                <Text
                    style={{ textAlign: 'center', fontSize: 18, color: Colors.text_Color }}>
                    {route?.params?.title ? route?.params?.title : ' '}
                </Text>

                <View style={styles.Login_view}>
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <CustomListItem item={item} navigation={navigation} />
                        )}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Gallery;
