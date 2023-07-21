

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
  },
  image: {
    height: 40,
    width: 50,
  },
  main_logo: {
    width: '90%',
    height: 50,
  },
  back_icon_view: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: "5%",
  },
  filter_view: {
    marginHorizontal: '10%',
    marginVertical: "5%",
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  performance: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  part: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
  },
  item: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
  },
  flatList_container: {
    width: '90%',
    height: 45,
    borderWidth: 2,
    borderColor: '#98B1DD',
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 8,
  },
  flatList_text: {
    marginLeft: 20,
    color: Colors.flatlist_color,
    fontSize: 20,
  },
  scan_button: {
    alignItems: 'center',
    borderWidth: 2,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor:Colors.flatlist_color,
    borderRadius:20,
    marginBottom:20,
  },
  scan_text:{
    color:Colors.flatlist_color,
    fontSize:17,

  },
  modalContainer: {
    // flex: 1,
    // justifyContent: "flex-start",
    position:"absolute",
    start:"10%",
    top:'17%' ,// Align the modal content to the bottom of the screen
    backgroundColor: '#1B4679',
    width: "33%",
    borderRadius: 8,
  },
  modalContent: { 
    alignSelf: 'center', 
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
});


