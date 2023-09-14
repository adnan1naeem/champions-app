import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf';
import { Colors } from '../../../../Utils/Colors';
import Header from '../../../../Components/Header/Header';
import BackButton from '../../../../Components/BackButton';
const RefCatalogue = ({ navigation }) => {

    return (

        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground, }}
        >
            <ScrollView>
                <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>
                <>
                    <Pdf
                        trustAllCerts={false}
                        source={require("../../../../Assets/REFCatalogue.pdf")}
                        style={{ height: Dimensions.get('window').height, width: "100%" }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`number of pages: ${numberOfPages}`);
                        }}
                    />
                </>

                <View style={{ height: '15%' }} />
            </ScrollView>
        </ImageBackground>

    )
}

export default RefCatalogue

const styles = StyleSheet.create({})