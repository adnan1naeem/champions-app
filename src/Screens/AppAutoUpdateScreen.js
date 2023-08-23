import React, { useEffect } from "react";
import { ScrollView, View,StyleSheet ,TouchableOpacity} from "react-native";
// import { reloadAsync, fetchUpdateAsync } from "expo-updates";
// import {  } from "react-native-web";


const AppAutoUpdateScreen = () => {

  // useEffect(() => {
  //   Updates();
  // }, []);

  // const Updates = async () => {
  //   try {
  //     await fetchUpdateAsync();
  //     await reloadAsync();
  //     setLoading(false);
  //   } catch (e) {
  //     await reloadAsync();
  //   }
  // };

  // const onPress = async () => {
  //   setLoading(true);
  //   await reloadAsync();
  // };

  return (
    <View style={styles.updateContainer}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // backgroundColor:'',
        }}
        bounces={false}
      >
        <View style={{ marginTop: 71 }}>
          <Text style={styles.updateOnboardingText}>
            Please wait...{"\n"}The app is about to {"\n"} update to the latest{" "}
            {"\n"}Version.
          </Text>
        </View>

        <TouchableOpacity
        
          style={styles.reloadButton}
          // onPress={onPress}
        >
          <Text>Please Reload....</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AppAutoUpdateScreen;

const styles = StyleSheet.create({
  updateContainer: {
    flex: 1,
  },

  updateOnboardingText: {
    textAlign: "center",
    color: 'red',
    marginHorizontal: 26,
    textTransform: "none",
  },
  reloadButton: {
    width: "88%",
    alignSelf: "center",
    backgroundColor: 'yellow',
    position: "absolute",
    bottom: 52,
  },
});
