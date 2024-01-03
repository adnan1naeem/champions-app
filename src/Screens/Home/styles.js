import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueBackground,
    paddingVertical: 10,
  },
  Chamiopm_Logo: {
    width: '48%',
    marginTop: 10,
    height: 160,
    marginBottom: -20,
    alignSelf: 'center',
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
    textAlign: 'center',
  },
  part: {
    color: Colors.text_Color,
    fontSize: 14,
    letterSpacing: 1.5,
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
    marginVertical: 10,
  },
  scan_text: {
    color: Colors.flatlist_color,
    fontSize: 17,
  },
  dropdownItemText: {
    color: Colors.text_Color,
    paddingVertical: 3,
    fontSize: 13,

  },

  dropdownItem: {
    flexDirection: 'row',
  },
  modalContainer: {
    backgroundColor: '#3a85d6',
    paddingHorizontal: 15,
    width: '98%',
    paddingVertical: 15,
    alignSelf: 'center',
    borderRadius: 15,
  },
  catmodalContainer: {
    position: 'absolute',
    start: 15,
    top: 110,
    backgroundColor: '#3a85d6',
    borderRadius: 8,
    width: 170,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  modalContent: {
    alignSelf: 'center',
    paddingVertical: 10,
    alignItems: 'center',
  },
  updateMessage: {
    color: Colors.text_Color,
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 45,
    textAlign: 'center',
  },
  UpdateHeading: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.text_Color,
    paddingVertical: 10,
    fontSize: 20,
  },
  modalContainer1: {
    backgroundColor: '#3a85d6',
    paddingHorizontal: 15,
    width: '98%',
    paddingVertical: 15,
    borderRadius: 15,
    height: 300

  },
  UpdateHeading1: {
    fontWeight: 'bold',
    color: Colors.text_Color,
    fontSize: 20,
    paddingVertical: 3
  },
  dropdownItem1: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    backgroundColor: Colors.White,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    paddingVertical: 10
  },
  container1: {
    borderWidth: 1,
    marginVertical: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderColor: Colors.White,
    marginHorizontal: 20,

  },
  crossIcon: {
    color: Colors.text_Color,
    fontSize: 25,
  },
  selectedValue: {
    paddingHorizontal: 10,
    color: Colors.text_Color
  },
  dropIcon: {
    color: Colors.text_Color,
    fontSize: 13,
  },
  checkIcon: {
    color: Colors.text_Color,
    fontSize: 16,
    marginLeft: 10
  },
  tierContainer: {
    marginTop: 15
  }
});
