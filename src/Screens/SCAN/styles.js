

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
  Login_view: {
    paddingVertical: 30,
    paddingBottom: "10%",
    width: '90%',
    backgroundColor: "#4380C3",
    marginTop: "33%",
    borderRadius: 40,
    alignSelf: "center",
  },
  unlock_view: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    backgroundColor: '#4279BC',
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
    alignItems: "center",
    borderWidth: 1.5,
    borderLeftColor: '#3DB2DE',
    borderRightColor: '#5C91D3',
    borderTopColor: '#4CACE1',
    borderBottomColor: '#4493C9', // Add the borderColor property

  },
  scanner_view: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    backgroundColor: '#4279BC',
    width: '80%',
    height: 180,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
    borderWidth: 1.5,
    borderLeftColor: '#3DB2DE',
    borderRightColor: '#5C91D3',
    borderTopColor: '#4CACE1',
    borderBottomColor: '#4493C9', // Add the borderColor property

  },
  scanner_sub_view: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    backgroundColor: '#4279BC',
    width: '98%',
    height: 170,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 1.5,
    gap:20,
    borderLeftColor: '#3DB2DE',
    borderRightColor: '#5C91D3',
    borderTopColor: '#4CACE1',
    borderBottomColor: '#4493C9', // Add the borderColor property

  },
  Unlock_Icon: {
    color: 'white'
  },
  proceed_button: {
    paddingVertical: 15,
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    width: "39%",
    height: 50,
    borderRadius: 15,
  },
  gradient: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 15,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize:15,
    fontWeight:'400'
  }




});


