

// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { colors } from "react-native-elements";
let deviceWidth = Dimensions.get("window").width;



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  topRight: {
    flexDirection: 'column',
    justifyContent:'flex-end',
  },
  image: {
    height: 40,
    width: 50,
  },
  main_logo: {
    width: '90%',
    height: 50,
  },

});


