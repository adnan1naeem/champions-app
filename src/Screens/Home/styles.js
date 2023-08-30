import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueBackground,
    paddingVertical: 10

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

  filter_view: {
    flexDirection: 'row',
    zIndex: 999,
    justifyContent: 'space-between',
    marginHorizontal: 25,


  },
  text: {
    color: Colors.text_Color,
    fontSize: 16,
  },
  performance: {
    color: Colors.text_Color,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  part: {
    color: Colors.text_Color,
    fontSize: 14,
    letterSpacing: 1.5

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

  scan_button: {
    alignItems: 'center',
    borderWidth: 2,
    width: 65,
    height: 55,
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: Colors.text_Color,
    borderRadius: 15,
    marginBottom: 15,
    marginVertical: 10
  },
  scan_text: {
    color: Colors.flatlist_color,
    fontSize: 17,

  },
  dropdownItemText: {
    color: Colors.text_Color,
    paddingVertical: 3,
    fontSize: 13
  },
  dropdownItem: {
    flexDirection: 'row',
  },
  modalContainer: {
    position: "absolute",
    start: 15,
    top: 128,
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalContent: {
    alignSelf: 'center',
    paddingVertical: 10,
    alignItems: 'center',
  },
});


