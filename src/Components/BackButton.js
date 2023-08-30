import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors } from '../Utils/Colors'

const BackButton = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <View>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <LinearGradient
                    colors={[
                        'rgb(39, 174, 229)',
                        'rgb(41,128,201)',
                        'rgb(50,107,194)',
                        'rgb(59,90,183)',
                    ]}
                    style={styles.backIcon_style}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Ionicons
                        name="chevron-back"
                        size={25}
                        color={Colors.text_Color}
                        style={styles.Icon}
                    />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default BackButton

const styles = StyleSheet.create({
    backButton: {
        marginTop: 10,
        marginBottom: 0,
        marginLeft: 5,
        width: 70,
        paddingVertical: 5
    },
    backIcon_style: {
        width: 30,
        borderRadius: 20
    },
})