

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
    backgroundColor: Colors.blueBackground,
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: 'center'
  },
  sub_container: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
    width: "100%"
  },
  Splash_icon: {
    height: 100,
    position: 'absolute',
    width: "85%",
    alignSelf: 'center'
  },
  startScreen_text: {
    color: "#BAD3E3",
    fontSize: 36,
    fontWeight: '300',
    paddingEnd: 10,
  },
  image: {
    height: 80,
    width: "88%"
  },

});


