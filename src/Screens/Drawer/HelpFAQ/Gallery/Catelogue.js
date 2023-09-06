import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView, FlatList, Linking
} from "react-native";
import React, { useState } from "react";
import { styles } from "./style";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../Utils/Colors";
import BackButton from "../../../../Components/BackButton";
import Header from "../../../../Components/Header/Header";
const ProductManuals = () => {
    const navigation = useNavigation();
    const imageList = [
        { id: '1', source: require('../../../../Assets/Image/Freezer_image.jpeg'), onpress: 'https://1drv.ms/b/s!AknL1jKZuWmfgSphLHI3d0Zc-kK5?e=GwHPk0' },
        { id: '2', source: require('../../../../Assets/Image/Dispancer_image.jpeg'), onpress: 'https://1drv.ms/b/s!AknL1jKZuWmfgStFgJuqBQVIlScK?e=rQptPl' },
    ];

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
                <MaterialIcon name="menu-book" style={{ alignSelf: 'center' }} size={26} color={Colors.text_Color} />
                <Text style={{ textAlign: 'center', fontSize: 18, color: Colors.text_Color }}>Catalogue</Text>
                <View style={[styles.Login_view, { paddingBottom: 25 }]}>
                    <FlatList
                        data={imageList}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ marginHorizontal: 10, paddingTop: 10 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => Linking.openURL(item?.onpress)}
                            // onPress={() => navigation.navigate('Catalouge_PDF', { ID: item?.id })}
                            >
                                <Image
                                    style={{ width: '95%', resizeMode: 'stretch', height: 300, marginVertical: 5, marginHorizontal: 5 }}
                                    source={item.source}
                                />
                            </TouchableOpacity>

                        )}
                        numColumns={1}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default ProductManuals;