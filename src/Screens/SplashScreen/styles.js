

// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
let deviceWidth = Dimensions.get("window").width;



export const styles = StyleSheet.create({
  StartScreen_main: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: 'center'
  },
  sub_container: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: "100%"
  },
  Splash_icon: {
    height: 100,
    width: "85%",
    alignSelf: 'center'
  },
  startScreen_text: {
    color: "#BAD3E3",
    fontSize: 36,
    fontWeight: 300,
    paddingEnd: 10,
  },
  image: {
    height: 80,
    width: "88%"
  },

});


