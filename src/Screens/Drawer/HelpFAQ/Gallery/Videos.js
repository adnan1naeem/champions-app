import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../../Utils/Colors';
import BackButton from '../../../../Components/BackButton';
import Header from '../../../../Components/Header/Header';

import WebView from 'react-native-webview';
const Videos = () => {
    const navigation = useNavigation();

    const data = [
        {
            id: '1',
            imageSource: require('../../../../Assets/Image/1_thumb.jpeg'),
            title:
                'Technologically advanced Orient IoT DC Inverter AC provides unmatched fastest cooling and up to 80% electricity saving due to its top of line features',
            onpress: 'https://www.youtube.com/watch?v=GutiOP4sWNM',
        },
        {
            id: '2',
            imageSource: require('../../../../Assets/Image/2_thumb.jpeg'),
            title:
                'Orient IOT DC Inverters, loaded with cutting-edge Heat & Cool Technology. Warm in winters and cool in Summers, with autopilot feature for extra - ordinary performance and up to 80% energy savings',
            onpress: 'https://www.youtube.com/watch?v=6QtAcaTGOnY',
        },
        {
            id: '3',
            imageSource: require('../../../../Assets/Image/3_thumb.jpeg'),
            title:
                'Technologically advanced Orient T3 IOT DC inverter ACs, your smartest move this summer. Chill out with our 30 seconds fastest cooling solution that can operate on up to 70 volts and autopilot feature ensures up to 80% electricity saving',
            onpress: 'https://www.youtube.com/watch?v=DyWr0AJWJqs',
        },
        {
            id: '4',
            imageSource: require('../../../../Assets/Image/4_thumb.jpeg'),
            title:
                'Orient DC Inverter Refrigerators, the perfect choice for any kitchen. Latest features with unparalleled freshness, a lifetime warranty and less than 1 unit per day electricity consumption!',
            onpress: 'https://youtu.be/IxqTLK8s3ZU',
        },
        {
            id: '5',
            imageSource: require('../../../../Assets/Image/5_thumb.jpeg'),
            title:
                'Orient Refrigerators with Direct Cool Technology ensure 40% Fastest Cooling and start making Ice in just 18 minutes and that too with a lifetime warranty and less than 1 unit per day electricity consumption!',
            onpress: 'https://youtu.be/fe0SNcMz0xI',
        },
        {
            id: '6',
            imageSource: require('../../../../Assets/Image/6_thumb.jpeg'),
            title:
                'Orient Fully Automatic One Touch Operation Washing Machine is a perfect choice for hassle free washing experience.',
            onpress: 'https://www.youtube.com/watch?v=AOg1XvzuGhA&t=10s',
        },
    ];

    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity
                onPress={() => {
                    Linking.openURL(item?.onpress);
                }}
                style={{
                    backgroundColor: Colors.White,

                    marginVertical: 5,
                    borderRadius: 5,
                    marginHorizontal: 2,
                }}>
                <Image
                    source={item?.imageSource}
                    style={{ height: 180, width: '100%' }}
                />
                <Text
                    style={{
                        color: Colors.black,
                        fontSize: 13,
                        paddingHorizontal: 5,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                    }}>
                    {item.title}
                </Text>
            </TouchableOpacity>
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
            <MaterialCommunityIcons
                name="video-image"
                style={{ alignSelf: 'center' }}
                size={26}
                color={Colors.text_Color}
            />
            <Text
                style={{
                    textAlign: 'center',
                    paddingTop: 5,
                    fontSize: 18,
                    paddingBottom: 30,
                    color: Colors.text_Color,
                }}>
                Videos
            </Text>

            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                numColumns={1}
                contentContainerStyle={{
                    paddingBottom: 35,
                    paddingTop: 28,
                    backgroundColor: '#3F6FAD',
                    borderRadius: 40,
                    alignSelf: 'center',
                    paddingHorizontal: 10,
                    width: '90%',
                }}
            />
        </ImageBackground>
    );
};

export default Videos;
