import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf';
import { Colors } from '../../../../Utils/Colors';
import Header from '../../../../Components/Header/Header';
import BackButton from '../../../../Components/BackButton';
const RefCatalogue = ({ navigation, route }) => {

    return (

        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground, }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>
                <>
                    <Pdf
                        trustAllCerts={false}
                        source={route?.params?.index === '2' ? require('../../../../Assets/WDCatalogue.pdf') : require("../../../../Assets/REFCatalogue.pdf")}
                        style={{ height: "100%", width: "100%", paddingBottom: 200 }}
                    />
                </>

                <View style={{ height: '15%' }} />
            </ScrollView>
        </ImageBackground>

    )
}

export default RefCatalogue

const styles = StyleSheet.create({})