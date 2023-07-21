import {
    View,
    Image,
    TouchableOpacity,
  } from "react-native";
  // import { Image } from "native-base";
  import React, { useState } from "react";
  import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
  const Header = ({title}) => {
    const navigation=useNavigation();
    return (
        <View style={{ display: 'flex', flexDirection: 'row',marginTop:15}}>
          <View>
            <TouchableOpacity onPress={()=>{navigation.navigate('DrawerScreen')}}>
            <Image  
              source={require('../../Assets/Image/drawer_icon.png')}
              style={styles.image}
            />
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            {title ?
              <Image
                source={require('../../Assets/Image/orient_main_icon.png')}
                style={styles.main_logo}
              />:null}
          </View>
          <View style={styles.topRight}>
            <Image style={{ height: 40, width: 65,justifyContent:'center', }} source={require('../../Assets/Image/read.png')} />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 50}}>
              <Image style={{ height: 35,tintColor:"white",width:20}} source={require('../../Assets/Image/search.png')} />
              <Image style={{ height: 35,width:20 }} source={require('../../Assets/Image/alert1.png')} />
            </View>
          </View>
        </View>

    );
  };
  
  export default Header;