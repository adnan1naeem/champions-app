import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
let deviceWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.blueBackground
  },
  flatList_container: {
    width: '90%',
    borderRadius: 20,
    borderColor: '#98B1DD',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gradient_container: {
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
  },
  flatList_text: {
    color: Colors.flatlist_color,
    fontSize: 15,
  },


});


