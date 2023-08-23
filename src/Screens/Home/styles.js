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
    width: 70,
    height: 70,
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
    start: "10%",
    top: '17%',
    backgroundColor: '#1B4679',
    width: 200,
    borderRadius: 8,
  },
  modalContent: {
    alignSelf: 'center',
    padding: 16,
    alignItems: 'center',
    height: 220
  },
});


