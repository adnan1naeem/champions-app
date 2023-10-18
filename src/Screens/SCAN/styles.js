import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
let deviceWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  manual_BatchCode: {
    paddingHorizontal: 10,
    fontSize: 17,
    color: Colors.text_Color,
    paddingVertical: Platform.OS === 'ios' ? 11 : null,
  },
  submitButton: {
    fontSize: 15,
    color: Colors.text_Color,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Login_view: {
    paddingVertical: 30,
    paddingBottom: '10%',
    width: '90%',
    backgroundColor: '#4380C3',
    marginTop: '23%',
    borderRadius: 40,
    alignSelf: 'center',
  },
  unlock_view: {
    backgroundColor: '#4279BC',
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderLeftColor: '#3DB2DE',
    borderRightColor: '#5C91D3',
    borderTopColor: '#4CACE1',
    borderBottomColor: '#4493C9',
    alignSelf: 'center'


  },

  InerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,
    borderRadius: 7,
    height: 220,
    alignItems: 'center',
    width: 294,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderLeftColor: '#3DB2DE',
    borderRightColor: '#5C91D3',
    borderTopColor: '#4CACE1',
    borderBottomColor: '#4493C9',
  },
  scanner_view: {
    backgroundColor: '#4279BC',
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1.5,
    borderLeftColor: '#3DB2DE',
    borderRightColor: '#5C91D3',
    borderTopColor: '#4CACE1',
    borderBottomColor: '#4493C9',
    width: 300,
    alignSelf: 'center'


  },
  Unlock_Icon: {
    color: Colors.text_Color,
  },
  proceed_button: {
    paddingVertical: 15,
    marginTop: 10,
    width: '39%',
    height: 50,
    borderRadius: 15,
    marginHorizontal: 5
  },
  gradient: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  text: {
    color: Colors.text_Color,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
  },

  scannerContainer: {
    // flex: 1,
    marginTop: 100,
  },
  scanner: {
    ...StyleSheet.absoluteFillObject,
  },
  scanner_sub_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});
