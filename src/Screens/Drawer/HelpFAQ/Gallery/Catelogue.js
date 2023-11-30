import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../../Utils/Colors';
import BackButton from '../../../../Components/BackButton';
import Header from '../../../../Components/Header/Header';
import { API_BASE_URL } from '../../../../../Constants';

const ProductManuals = () => {
    const navigation = useNavigation();
    const [catalogue, setCatalogue] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        try {
            const response = await fetch(`${API_BASE_URL}/pdfNames`, requestOptions);
            if (response.ok) {
                const result = await response.json();
                setCatalogue(result);
            } else {
                console.log('Error:', response.statusText);
            }
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
            <ScrollView>
                <View style={{ paddingHorizontal: 10 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>
                <MaterialIcon
                    name="menu-book"
                    style={{ alignSelf: 'center' }}
                    size={26}
                    color={Colors.text_Color}
                />
                <Text
                    style={{ textAlign: 'center', fontSize: 18, color: Colors.text_Color }}>
                    Catalogue
                </Text>

                {loading ? (
                    <ActivityIndicator size="large" style={styles.Activity_Indicator} />
                ) : (
                    catalogue && catalogue.length > 0 && (
                        <FlatList
                            data={catalogue}
                            keyExtractor={item => item.id}
                            contentContainerStyle={[styles.Login_view, { paddingBottom: 15, paddingTop: 15 }]}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigation.navigate('RefCatalogue', { index: item })}>
                                    <Image
                                        style={styles.catalogueTitleImage}
                                        source={{ uri: item?.image }}
                                    />
                                </TouchableOpacity>
                            )}
                            numColumns={1}
                        />
                    )
                )}


            </ScrollView>
        </ImageBackground>
    );
};

export default ProductManuals;
