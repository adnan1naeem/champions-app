

// import typography from "native-base/lib/typescript/theme/base/typography";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
let deviceWidth = Dimensions.get("window").width;



export const styles = StyleSheet.create({

  MainContainer: {
    backgroundColor: Colors.theme,
    flex: 1,
    paddingHorizontal: 15,
  },
  headerView: {
    paddingHorizontal: 10,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchIconHeader: {
    fontSize: 15,
    alignItems: "center",
    paddingHorizontal: 5,
    color: Colors.white,
    paddingTop: 2,
  },
  ArrowDown: {
    fontSize: 15,
    alignItems: "center",
    paddingHorizontal: 5,
    color: Colors.white,
    paddingTop: 2,
  },
  boxstyleDropdown: {
    borderRadius: 10,
    width: 140,
    height: 50,
    borderColor: Colors.borderColor,
    borderWidth: 2,
  },
  grediant: {
    top: 30,
    height: 70,
    width: 70,
    justifyContent: "center",
    alignSelf: "center",
  },
  grediantRoundView: {
    height: 220,
    width: 220,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 110,
    marginTop: 100,
  },
  buttonContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: Colors.theme,
    width: "95%",
    margin: 2.5,
    paddingHorizontal: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#4C64FF",
    alignSelf: "center",
  },
  DrawerButton: {
    backgroundColor: "#28262f",
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: "center",
    paddingTop: 8,
  },
  HeaderContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  timeContainer: {
    width: 140,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: "center",
    paddingTop: 10,
    borderColor: Colors.borderColor,
    height: 50,
  },
  AvailableBalance: {
    backgroundColor: Colors.theme,
    height: 206,
    width: 206,
    borderRadius: 113,
    alignSelf: "center",
  },
  hiddenBalance: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: "100%",
  },
  hiddenBalnceValue: {
    paddingHorizontal: 30,
    textAlign: "center",
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  userIcon: {
    fontSize: 30,
    textAlign: "center",
    color: Colors.white,
    marginTop: 80,
  },
  chart_Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
});


 