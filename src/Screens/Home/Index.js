import {
  Text,
  Button,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  Modal
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import NavigateIcon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";
import Header from "../../Components/Header/Header";
import { useNavigation } from "@react-navigation/native";
const Home = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState("");
  const [payment, setpayment] = useState(false);
  const [scanData, setScanData] = useState([]);
  const [isVisible, setisVisible] = useState(false)
  const newScanData = [
    { id: 1, RS: "123,123", value: "Total Outstanding", number: 50, screen: 'verified' },
    { id: 2, RS: "123,123", value: "Total Paid", number: 100, screen: 'PaidCategory' },
    { id: 3, RS: "123,123", value: "Total Approved", number: 500, screen: 'Approved' },
  ];
  const renderItem = ({ item: listItem }) => (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity style={styles.flatList_container}
        // onPress={() => {
        //   navigation.navigate('Paid')
        // }}
        onPress={() => {
          navigation.navigate('PaidCategory',
            {
              data: {
                screen: listItem?.screen
              }
            })
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.flatList_text}>
            {listItem.value}
          </Text>
          <View style={{ flex: 1, alignItems: 'flex-end', marginRight: "6%" }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#D0D3E2', fontSize: 20 }}>{listItem?.number}</Text>
              <NavigateIcon name="navigate-next" size={20} color={"#D0D3E2"} marginTop={5} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const products = [
    {
      id: 1,
      name: 'Air Conditioner',
    },
    {
      id: 2,
      name: 'Refrigerator',
    },
    {
      id: 3,
      name: 'Water Dispenser',
    },
    {
      id: 4,
      name: 'Microwave Oven',
    },
    {
      id: 5,
      name: 'Washing Machine',
    },
    {
      id: 6,
      name: 'LED',
    },
  ];
  const handleScanButton = () => {
    // Simulating scan button functionality by adding new data to the scanData state
    setScanData(newScanData);
  };
  const handleNavigation = (item) => {
    // navigation.navigate('PaidCategory')
  }
  const data = [
    {
      rows: [
        { RS: "123,123", value: "Total Outstanding", },
      ],
      row2: [
        { RS: "123,123", value: "Total Paid" },
        { RS: "123,123", value: "Total Approved" },
      ]
    }
  ];

  const handleModalClose = () => {
    setisVisible(false);
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
        source={require('../../Assets/Image/background_image.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <Header title={true} value={true} />
        <View style={styles.back_icon_view}>
          <View style={styles.filter_view}>
            {isVisible ?
              <View style={[{ backgroundColor: isVisible ? "#1B4679" : "transparent", paddingLeft: isVisible ? "3%" : "6%" }, { marginRight: "30%", color: 'white', fontSize: 16, fontWeight: '500', width: "41.5%", }]}
                onPress={() => { setisVisible(!isVisible) }}>
                <Modal visible={isVisible} transparent animationType="fade" style={{ marginTop: "15%" }}>
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
              </View> :
              <Text style={[{ backgroundColor: isVisible ? "#1B4679" : "transparent", paddingLeft: isVisible ? "3%" : "6%" }, { marginRight: "30%", color: 'white', fontSize: 16, fontWeight: '500', width: "41.5%", }]}
                onPress={() => { setisVisible(!isVisible) }}>
                All
                <Entypo name="chevron-small-down" size={20} />
              </Text>}
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', }} onPress={() => { }}>Date
              <Entypo name="chevron-small-down" size={16} />
            </Text>
          </View>
        </View>
        {data?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={styles.performance}>RS. {item?.rows[0]?.RS}</Text>
                <Text style={styles.part}>{item?.rows[0]?.value}</Text>
              </View>
              <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-around' }}>
                {item?.row2?.map((value, valueIndex) => {
                  return (
                    <View style={{ alignItems: 'center' }} key={valueIndex}>
                      <Text style={styles.performance}>RS.{value?.RS}</Text>
                      <Text style={styles.part}>{value?.value}</Text>
                    </View>
                  );
                })}
              </View>
            </React.Fragment>
          );
        })}
        <TouchableOpacity style={{ marginTop: 10, alignItems: 'center', height: 180 }} onPress={() => {
          navigation.navigate('SearchCate')
        }} >
          <Image style={{ height: '100%', width: "48%", }} resizeMode="contain" source={require('../../Assets/Image/Orient_icon.png')} />
        </TouchableOpacity>
        <View>
          <FlatList
            data={newScanData}
            contentContainerStyle={{ paddingVertical: 15, gap: 10 }}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <TouchableOpacity style={styles.scan_button} onPress={() => {
          navigation.navigate('Scan')
        }}>
          <Ionicons name="add" color={"white"} size={16} fontWeight={400} />
          <Text style={styles.scan_text}>SCAN</Text>
        </TouchableOpacity>
      </ImageBackground>
      <Modal visible={isVisible} transparent animationType="fade" style={{ marginTop: "15%" }}>
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
    </ScrollView>
  );
};

export default Home;