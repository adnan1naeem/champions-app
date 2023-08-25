import React, { useState } from "react";
import {
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    FlatList
} from "react-native";

import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../Utils/Colors";
import BackButton from "../../../../Components/BackButton";
import Header from "../../../../Components/Header/Header";

const ProductManuals = () => {
    const [mobile, setMobile] = useState(""); // Separate state for name
    const navigation = useNavigation();

    // Sample data array
    const data = [
        {
            id: "1",
            imageSource: require("../../../../Assets/Image/ezgifcom.gif"),
            title: "Oriant T3 Dc Invertor Air Conditioner",
            views: "901K views - 9 months ago",
        },
        {
            id: "2",
            imageSource: require("../../../../Assets/Image/oriant.gif"),
            title: "Oriant T3 Dc Invertor Air Conditioner",
            views: "901K views - 9 months ago",
        },
        {
            id: "3",
            imageSource: require("../../../../Assets/Image/onfo.gif"),
            title: "Oriant T3 Dc Invertor Air Conditioner",
            views: "901K views - 9 months ago",
        },
        {
            id: "4",
            imageSource: require("../../../../Assets/Image/ezgifcom.gif"),
            title: "Oriant T3 Dc Invertor Air Conditioner",
            views: "901K views - 9 months ago",
        },

    ];

    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: Colors.White, height: 155, marginHorizontal: 5, marginVertical: 5, borderRadius: 5 }}>
            <Image style={{ width: 150, height: 120, borderRadius: 5 }} source={item.imageSource} />
            <Text style={{ color: Colors.black, fontSize: 8, fontWeight: "bold", textAlign: "center", paddingTop: 5 }}>{item.title}</Text>
            <Text style={{ color: Colors.black, fontSize: 5, fontWeight: "bold", paddingVertical: 5, paddingHorizontal: 10 }}>{item.views}</Text>
        </View>
    );

    return (
        <ImageBackground
            source={require("../../../../Assets/Image/background_image.png")}
            style={{ flex: 1, backgroundColor: Colors.blueBackground }}
        >
            <View style={{ paddingHorizontal: 20 }}>
                <Header />
                <BackButton navigation={navigation} />
            </View>
            <Image source={require("../../../../Assets/Image/Video.png")} style={{ height: 50, width: 50, resizeMode: "contain", alignSelf: "center", tintColor: Colors.White }} />
            <Text style={{ textAlign: "center", paddingTop: 5, fontSize: 10, color: Colors.text_Color }}>Videos</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={[styles.Login_view, { paddingBottom: 40, paddingTop: 30 }]}
            />
        </ImageBackground>
    );
};

export default ProductManuals;
