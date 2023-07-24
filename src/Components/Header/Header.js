import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text
} from "react-native";
// import { Image } from "native-base";
import React, { useState } from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
const Header = ({ title }) => {
  const [isVisible, setisVisible] = useState(false);
  const products = [
    {
      id: 1,
      name: 'Catelogues',
    },
    {
      id: 2,
      name: 'Videos',
    },
    {
      id: 3,
      name: 'Product Manuals',
    },
    {
      id: 4,
      name: 'Tutorials',
    },
    {
      id: 5,
      name: 'Policies',
    },
  ];
  const navigation = useNavigation();
  const handleModalClose = () => {
    setisVisible(false);
  }
  return (
    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
      <View>
        <TouchableOpacity onPress={() => { navigation.navigate('DrawerScreen') }}>
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
          /> : null}
      </View>
      <View style={styles.topRight}>
        <TouchableOpacity onPress={()=>{
          setisVisible(!isVisible)
        }}>
        <Image style={{ height: 40, width: 65, justifyContent: 'center', }} source={require('../../Assets/Image/read.png')} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 50 }}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('SearchCate')
          }}>
            <Image style={{ height: 35, tintColor: "white", width: 20 }} source={require('../../Assets/Image/search.png')} />
          </TouchableOpacity>
          <Image style={{ height: 35, width: 20 }} source={require('../../Assets/Image/alert1.png')} />
        </View>
      </View>
      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity style={{ flex: 1 }} onPress={handleModalClose} />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {products.map((product) => (
              <View key={product.id}>
                <Text style={{ color: 'white', fontWeight: 500, fontSize: 11, paddingVertical: 3 }}>{product.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>

  );
};

export default Header;