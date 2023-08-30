import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  Platform
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../Utils/Colors";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
const Header = ({ Logo }) => {
  const [isVisible, setisVisible] = useState(false);

  const navigation = useNavigation();
  const handleModalClose = () => {
    setisVisible(false);
  }
  return (
    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15, paddingTop: Platform.OS === 'ios' && 30 }}>
      <View>
        <TouchableOpacity onPress={() => { navigation.navigate('DrawerScreen') }}>
          <Image
            source={require('../../Assets/Image/drawer_icon.png')}
            style={[styles.image, { tintColor: Colors.text_Color }]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <Image
          source={require('../../Assets/Image/chapmion_icon.png')}
          style={styles.main_logo}
        />
      </View>
      <View style={styles.topRight}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Gallery')
        }}>
          <Image style={{ height: 40, width: 70, justifyContent: 'center', tintColor: Colors.text_Color }} source={require('../../Assets/Image/read.png')} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 57, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('SearchCate')
          }}>
            <Fontisto style={{ fontSize: 18, color: Colors.text_Color, marginLeft: 14 }} name="search" />
          </TouchableOpacity>
          <FontAwesome style={{ fontSize: 18, color: Colors.text_Color }} name="bell-o" />
        </View>
      </View>
      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity style={{ flex: 1 }} onPress={handleModalClose} />
        <View style={styles.modalContainer}>
        </View>
      </Modal>
    </View>

  );
};

export default Header;


  // <View style={styles.modalContent}>
          //   {products.map((product) => (
          //     <View key={product.id}>
          //       <Text style={{ color: Colors.text_Color, fontWeight: 500, fontSize: 11, paddingVertical: 3 }}>{product.name}</Text>
          //     </View>
          //   ))}
          // </View>