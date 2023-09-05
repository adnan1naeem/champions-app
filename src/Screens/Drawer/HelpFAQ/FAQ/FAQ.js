import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ImageBackground,
    ScrollView,
    FlatList,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../../../Utils/Colors";
import CustomButton from "../../../../Components/CustomButton";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../../../Components/Header/Header";
import BackButton from "../../../../Components/BackButton";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';


const FAQ = () => {

    const navigation = useNavigation();
    const data = [

        {
            id: '2',
            icon: require('../../../../Assets/Image/WashingMachine.png'),
            text: 'Washing Machine',
            onPress: 'Washing Machine',
        },
        {
            id: '3',
            icon: require('../../../../Assets/Image/Freezer.png'),
            text: 'Refrigerators',
            onPress: 'Refrigerators',
        },
        {
            id: '4',
            icon: require('../../../../Assets/Image/Owan.png'),
            text: 'Microwave Oven',
            onPress: 'Microwave Oven',
        },
        {
            id: '5',
            icon: require('../../../../Assets/Image/Led.png'),
            text: 'LED',
            onPress: 'LED TV',
        },

        {
            id: '6',
            icon: require('../../../../Assets/Image/Dispancer.png'),
            text: 'Water Dispenser',
            onPress: 'Water Dispenser',
        },
        {
            // id: '1',
            // icon: require('../../../../Assets/Image/AirCondition.png'),
            // text: 'Air Conditioners',
            // onPress: 'Air Conditioners',
            id: '11',
            icon: '',
            text: ' ',
            onPress: ' ',

        },


    ];

    const CustomListItem = ({ item, navigation }) => {

        const HandleNavigate = () => {
            if (item?.id === '11') {
                return
            }
            else {
                navigation.navigate('ProductFaq', { FAQs: item?.onPress })
            }
        }

        return (
            <TouchableOpacity
                onPress={HandleNavigate}
                style={{ alignItems: 'center', flex: 1, paddingVertical: 15 }}>
                <Image tintColor={Colors.text_Color} source={item.icon} style={{ height: 30, width: 30 }} />
                <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                    {item.text}
                </Text>
            </TouchableOpacity>
        );
    };


    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground }}
        >
            <ScrollView>
                <View style={{ paddingHorizontal: 10 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>


                <View style={styles.unlock_view}>
                    <Text style={{ color: Colors.text_Color, fontSize: 20, fontWeight: "600" }}>
                        FAQs
                    </Text>

                </View>
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

export default FAQ;