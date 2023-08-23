

// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
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
    marginLeft: 10,
    marginVertical: 20,
  },
  filter_view: {
    marginHorizontal: '15%',
    marginVertical: 20,
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    color: Colors.text_Color,
    fontSize: 16,
  },
  performance: {
    color: Colors.text_Color,
    fontSize: 20,
    fontWeight: '600',
  },
  part: {
    color: Colors.text_Color,
    fontSize: 20,
    fontWeight: '400',
  },
  item: {
    borderWidth: 2,
    borderColor: Colors.text_Color,
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  itemText: {
    color: Colors.text_Color,
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
  },
  scan_text:{
    color:Colors.flatlist_color,
    fontSize:17,

  },




});


