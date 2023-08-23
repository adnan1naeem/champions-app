import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ImageBackground,
    TextInput
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import Header from "../../Components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../Utils/Colors";
import BackButton from "../../Components/BackButton";
const SearchCate = ({ route }) => {
    const navigation = useNavigation();
    const [matchingRows, setMatchingRows] = useState([]);
    const [title, setTitle] = useState("");
    const data = [
        { id: 1, name: 'ac', code: 'BQ5001001002', title: 'Air Conditioner', value: '50' },
        { id: 2, name: 'tv', code: 'BQ5001001005', title: 'Television', value: '30' },
        { id: 3, name: 'tv', code: 'BQ5001001005', title: 'Television', value: '30' },
        { id: 4, name: 'tv', code: 'BQ5001001005', title: 'Television', value: '30' },
        { id: 5, name: 'ac', code: 'BQ5001001002', title: 'Air Conditioner', value: '50' },
        { id: 6, name: 'ac', code: 'BQ5001001002', title: 'Air Conditioner', value: '50' },
        { id: 7, name: 'ac', code: 'BQ5001001002', title: 'Air Conditioner', value: '50' },

    ];
    const handleSearch = () => {
        const filteredRows = data.filter(item => item.name.toLowerCase().includes(title.toLowerCase()));
        setMatchingRows(filteredRows);
        if (filteredRows.length === 0) {
            alert("No results found");
        }
    };
    const renderItem = ({ item }) => (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.flatList_container}>
                <LinearGradient
                    colors={['rgb(39, 174, 229)', 'rgb(41,128,201)', 'rgb(50,107,194)', 'rgb(59,90,183)']}
                    style={styles.gradient_container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={styles.flatList_text}>
                                {item.code}
                            </Text>
                            <Text style={styles.flatList_text_detail}>
                                {item.title}
                            </Text>
                        </View>
                        <View style={styles.text_container}>
                            <Text style={styles.flatList_text_qty}>
                                {item.value}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1,backgroundColor: Colors.blueBackground }}>
            <ImageBackground
                source={require('../../Assets/Image/background_image.png')}
                style={styles.container}
                resizeMode="cover"
            >
                <View style={{ paddingHorizontal: 15 }}>
                    <Header value={true} />
                    <BackButton navigation={navigation} />
                </View>

                <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <TextInput
                        style={[styles.input, { textAlign: 'center', textAlignVertical: 'center', borderColor: '#17b8f5', color: Colors.text_Color, marginTop: 30 }]}
                        placeholder="Search"
                        placeholderTextColor={Colors.text_Color}
                        onChangeText={text => setTitle(text)}
                    />
                    <TouchableOpacity style={{ width: '25%', paddingVertical: 15 }} onPress={() => { handleSearch() }}>
                        <LinearGradient
                            colors={['rgb(39, 174, 229)', 'rgb(59,90,183)']}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 7, }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.itemText}>GO</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={matchingRows}
                        contentContainerStyle={{ paddingVertical: 50, gap: 10 }}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

export default SearchCate;