import { ScrollView, PermissionsAndroid , Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
 
import { launchCamera } from "react-native-image-picker";
 

const Testing = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const requestCameraPermission = async () => {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Camera Permission",
                        message: "App needs camera permission",
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "External Storage Write Permission",
                        message: "App needs write permission",
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.log(err);
            }
            return false;
        } else return true;
    };

    const captureImage = async (type) => {
        let options = {
            mediaType: "image",
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: "low",
            durationLimit: 30,
            saveToPhotos: true,
            cameraType: "front",
        };

        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {

                if (response.didCancel) {
                    console.log("Command Cancelled");
                    return;
                } else if (response.errorCode == "camera_unavailable") {
                    console.log("Camera not available on device");
                    return;
                } else if (response.errorCode == "permission") {
                    console.log("Permission not satisfied");
                    return;
                } else if (response.errorCode == "others") {
                    console.log("Command Cancelled");
                    return;
                } else {
                    console.log(response.assets[0]?.uri);
                    setSelectedImage(response.assets[0]?.uri);
                }
            });
        }
    };
    return (
        <View style={{  flex: 1 }}>
                <TouchableOpacity onPress={captureImage} style={{ alignSelf: 'center',marginTop:50 }}>
                <Text>camera button</Text>
                </TouchableOpacity>
        </View>
    )
}

export default Testing