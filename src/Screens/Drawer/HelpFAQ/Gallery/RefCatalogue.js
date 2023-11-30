import { ActivityIndicator, ImageBackground, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../../Utils/Colors';
import Header from '../../../../Components/Header/Header';
import BackButton from '../../../../Components/BackButton';
import { WebView } from 'react-native-webview';

const RefCatalogue = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const webViewRef = React.useRef(null);

    const onWebViewLoad = () => {
        setLoading(false);
    };

    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground, flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>

                {loading &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={Colors.text_Color} />
                    </View>
                }

                <WebView
                    ref={webViewRef}
                    nestedScrollEnabled={true}
                    source={{ uri: Platform.OS === 'ios' ? route?.params?.index?.pdf : `https://drive.google.com/viewerng/viewer?embedded=true&url=${route?.params?.index?.pdf}` }}
                    onLoad={onWebViewLoad}
                    style={{
                        flex: loading ? 0 : 1, display: loading ? 'none' : 'flex',
                        backgroundColor: 'transparent'
                    }}
                />

                <View style={{ height: '2%' }} />
            </ScrollView>
        </ImageBackground>

    )
}

export default RefCatalogue

const styles = StyleSheet.create({})












