import { ImageBackground, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Pdf from 'react-native-pdf';
import { Colors } from '../../../../Utils/Colors';
import Header from '../../../../Components/Header/Header';
import BackButton from '../../../../Components/BackButton';
const RefCatalogue = ({ navigation, route }) => {
    const [fileName, setFileName] = useState("");
    useEffect(() => {
        if (Platform.OS === 'ios') {
            let fileNameIs = route?.params?.index === '2' ? require('../../../../Assets/WDCatalogue.pdf') : require("../../../../Assets/REFCatalogue.pdf")
            setFileName(fileNameIs);
        } else {
            let fileNameIs = route?.params?.index === '2' ? { uri: 'bundle-assets://WDCatalogue.pdf' } : { uri: 'bundle-assets://REFCatalogue.pdf' }
            setFileName(fileNameIs);
        }
    }, [])

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
                    {fileName !== '' ?
                        <Pdf
                            trustAllCerts={false}
                            source={fileName}
                            style={{ height: "100%", width: "100%", paddingBottom: 200 }}
                        /> : null}
                </>

                <View style={{ height: '15%' }} />
            </ScrollView>
        </ImageBackground>

    )
}

export default RefCatalogue

const styles = StyleSheet.create({})












