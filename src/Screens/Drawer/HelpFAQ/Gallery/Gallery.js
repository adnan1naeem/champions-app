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
import { Colors } from '../../../../Utils/Colors';
import BackButton from '../../../../Components/BackButton';
import Header from '../../../../Components/Header/Header';
const Gallery = ({ route }) => {
    const navigation = useNavigation();
    const data = [
        {
            id: '1',
            icon: 'book-open-page-variant-outline',
            text: 'Product Manuals',
            onPress: 'ProductManuals',
        },
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
            id: '7',
            icon: 'facebook',
            text: 'Facebook',
            onPress: 'https://www.facebook.com/Orient.Pakistan',
        },
        {
            id: '8',
            icon: 'instagram',
            text: 'Instagram',
            onPress: 'https://www.instagram.com/orient.electronics/?hl=en',
        },
        {
            id: '9',
            icon: 'linkedin',
            text: 'LinkedIn',
            onPress: 'https://www.linkedin.com/company/orient-electronics/',
        },
        {
            id: '10',
            icon: 'youtube',
            text: 'You Tube',
            onPress: 'https://www.youtube.com/@OrientElectronicsOfficial',
        },
    ];

    const CustomListItem = ({ item, navigation }) => {
        const handlePress = () => {
            if (item?.onPress?.startsWith('http')) {
                Linking.openURL(item?.onPress);
            } else if (typeof item.onPress === 'string') {
                navigation.navigate(item.onPress);
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
                ) : (
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
