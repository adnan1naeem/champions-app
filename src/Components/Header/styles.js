

import { StyleSheet } from "react-native";

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
    justifyContent: 'flex-end',
  },
  image: {
    height: 40,
    width: 50,
  },
  main_logo: {
    width: 235,
    height: 50,
    resizeMode: 'contain'
  },
  modalContainer: {
    paddingVertical: 35,
    position: "absolute",
    end: "2%",
    top: '3%',
    backgroundColor: '#1B4679',
    width: "33%",
    borderRadius: 8,
  },
  modalContent: {
    alignSelf: 'center',
    padding: 16,
    alignItems: 'center',
  },

});


