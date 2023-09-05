import { FlatList, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import Header from '../../../../Components/Header/Header';
import { Colors } from '../../../../Utils/Colors';
import BackButton from '../../../../Components/BackButton';
import { TouchableOpacity } from 'react-native';

const Catalouge_PDF = ({ navigation, route }) => {
    const Freezer = [
        { id: '1', source: require('../../../../Assets/Image/C1.png') },
        { id: '2', source: require('../../../../Assets/Image/C2.png') },
        { id: '3', source: require('../../../../Assets/Image/C3.png') },
        { id: '4', source: require('../../../../Assets/Image/C4.png') },
        { id: '5', source: require('../../../../Assets/Image/C5.png') },
        { id: '6', source: require('../../../../Assets/Image/C6.png') },
        { id: '7', source: require('../../../../Assets/Image/C7.png') },
        { id: '8', source: require('../../../../Assets/Image/C8.png') },
        { id: '9', source: require('../../../../Assets/Image/C9.png') },
        { id: '11', source: require('../../../../Assets/Image/C11.png') },
        { id: '12', source: require('../../../../Assets/Image/C12.png') },
        { id: '13', source: require('../../../../Assets/Image/C13.png') },
        { id: '14', source: require('../../../../Assets/Image/C14.png') },
        { id: '15', source: require('../../../../Assets/Image/C15.png') },
        { id: '16', source: require('../../../../Assets/Image/C16.png') },
        { id: '17', source: require('../../../../Assets/Image/C17.png') },
        { id: '18', source: require('../../../../Assets/Image/C18.png') },
        { id: '19', source: require('../../../../Assets/Image/C_19.png') },
    ];
    const Dispancer = [
        { id: '1', source: require('../../../../Assets/Image/D1.png') },
        { id: '2', source: require('../../../../Assets/Image/D2.png') },
        { id: '3', source: require('../../../../Assets/Image/D3.png') },
        { id: '4', source: require('../../../../Assets/Image/D4.png') },
        { id: '5', source: require('../../../../Assets/Image/D5.png') },
        { id: '6', source: require('../../../../Assets/Image/D6.png') },
        { id: '7', source: require('../../../../Assets/Image/D7.png') },
        { id: '8', source: require('../../../../Assets/Image/D8.png') },
        { id: '9', source: require('../../../../Assets/Image/D9.png') },
        { id: '10', source: require('../../../../Assets/Image/D10.png') },
        { id: '11', source: require('../../../../Assets/Image/D11.png') },
        { id: '12', source: require('../../../../Assets/Image/D13.png') },

    ];
    return (
        <View style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
            <View style={{ paddingHorizontal: 10 }}>
                <Header />
                <BackButton navigation={navigation} />
            </View>
            <FlatList
                data={route?.params?.ID === '1' ? Freezer : Dispancer}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingTop: 10 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        disabled={true}
                        onPress={() => navigation.navigate('Catalouge_PDF')}>
                        <Image
                            style={{
                                width: Dimensions.get('screen').width,
                                resizeMode: 'stretch',
                                height: 350,
                                marginVertical: 5,
                                marginHorizontal: 5,
                            }}
                            source={item.source}
                        />
                    </TouchableOpacity>
                )}
                numColumns={1}
            />
        </View>
    );
};

export default Catalouge_PDF;

const styles = StyleSheet.create({});
