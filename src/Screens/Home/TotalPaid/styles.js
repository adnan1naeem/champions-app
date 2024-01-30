

// import typography from "native-base/lib/typescript/theme/base/typography";
import { StyleSheet } from "react-native";
import { Colors } from "../../../Utils/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.blueBackground
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
    fontWeight: '600',
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
    // height: 60,
    borderRadius: 20,
    borderColor: '#98B1DD',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gradient_container: {
    width: '100%',
    // height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
  },
  text_container: {
    flex: 1,
    // alignItems: 'flex-end',
    // marginRight: "2%",
    justifyContent: 'center',
    textAlign: 'right'
  },
  flatList_text: {
    marginLeft: 20,
    color: Colors.flatlist_color,
    fontSize: 20,
    // fontWeight: 600,
  },
  flatList_text_qty: {
    marginLeft: 20,
    color: Colors.flatlist_color,
    fontSize: 16,
    // fontWeight: 200,
  },
  flatList_text_detail: {
    marginLeft: 20,
    color: Colors.flatlist_color,
    fontSize: 16,
    // fontWeight: 400,
  },
  scan_button: {
    alignItems: 'center',
    borderWidth: 2,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: Colors.flatlist_color,
    borderRadius: 20,
  },
  scan_text: {
    color: Colors.flatlist_color,
    fontSize: 17,

  },




});


