import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../../Utils/Colors';
import BackButton from '../../../../Components/BackButton';
import Header from '../../../../Components/Header/Header';

import WebView from 'react-native-webview'
const ProductManuals = () => {
    const navigation = useNavigation();

    const data = [
        {
            id: '1',
            imageSource: 'https://www.youtube.com/watch?v=6QtAcaTGOnY',
            title: 'Oriant T3 Dc Invertor Air Conditioner',
            views: '901K views - 9 months ago',
        },
        {
            id: '2',
            imageSource: 'https://www.youtube.com/watch?v=GutiOP4sWNM',
            title: 'Oriant T3 Dc Invertor Air Conditioner',
            views: '901K views - 9 months ago',
        },
        // {
        //     id: '3',
        //     imageSource: 'https://www.youtube.com/watch?v=GutiOP4sWNM',
        //     title: 'Oriant T3 Dc Invertor Air Conditioner',
        //     views: '901K views - 9 months ago',
        // },
        // {
        //     id: '4',
        //     imageSource: 'https://www.youtube.com/watch?v=GutiOP4sWNM',
        //     title: 'Oriant T3 Dc Invertor Air Conditioner',
        //     views: '901K views - 9 months ago',
        // },
    ];

    const renderItem = ({ item }) => (
        <View
            style={{
                backgroundColor: Colors.White,
                height: 155,
                marginVertical: 5,
                borderRadius: 5,
                marginHorizontal: 2,

            }}>
            <WebView source={{
                uri: item?.imageSource
            }} style={{ height: 230, }} mediaPlaybackRequiresUserAction={true} />
            <Text
                style={{
                    color: Colors.black,
                    fontSize: 8,
                    fontWeight: 'bold',
                    paddingTop: 5,
                    paddingHorizontal: 5
                }}>
                {item.title}
            </Text>
            <Text
                style={{
                    color: Colors.black,
                    fontSize: 5,
                    fontWeight: 'bold',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                }}>
                {item.views}
            </Text>
        </View>

    );

    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
            <View style={{ paddingHorizontal: 10 }}>
                <Header />
                <BackButton navigation={navigation} />
            </View>
            <MaterialCommunityIcons name="video-image" style={{ alignSelf: 'center' }} size={26} color={Colors.text_Color} />
            <Text
                style={{
                    textAlign: 'center',
                    paddingTop: 5,
                    fontSize: 18,
                    color: Colors.text_Color,
                }}>
                Videos
            </Text>

            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                numColumns={1}
                contentContainerStyle={

                    {
                        paddingBottom: 25, paddingTop: 22, paddingVertical: 10,
                        backgroundColor: '#3F6FAD',
                        borderRadius: 40,
                        alignSelf: 'center',
                        marginTop: 25,
                        paddingHorizontal: 10,
                        width: '90%'

                    }
                }
            />


        </ImageBackground>
    );
};

export default ProductManuals;
