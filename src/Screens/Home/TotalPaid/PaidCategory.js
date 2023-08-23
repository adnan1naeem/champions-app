import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  StatusBar
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import Header from "../../../Components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import Category_Data from '../Data'
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { Colors } from "../../../Utils/Colors";

const PaidCategory = ({ route, navigation }) => {
  const [title, setTitle] = useState(route?.params?.status);

  const data = [
    {
      name: 'MIGHTY 1 TON OUTDOOR',
      value: 'BQ5001002',
      Num: '400 rs',
      id: '1'
    },
    {
      name: 'MIGHTY 1 TON OUTDOOR',
      value: 'BQ5001002',
      Num: '400 rs',
      id: '2'
    },
    {
      name: 'MIGHTY 1 TON OUTDOOR',
      value: 'BQ5001002',
      Num: '400 rs',
      id: '3'
    },
    {
      name: 'MIGHTY 1 TON OUTDOOR',
      value: 'BQ5001002',
      Num: '400 rs',
      id: '4'
    },
    {
      name: 'MIGHTY 1 TON OUTDOOR',
      value: 'BQ5001002',
      Num: '400 rs',
      id: '5'
    },
    {
      name: 'MIGHTY 1 TON OUTDOOR',
      value: 'BQ5001002',
      Num: '400 rs',
      id: '6'
    },
  ]



  // const navigation = useNavigation();
  // const [matchingRows, setMatchingRows] = useState([]);
  // const [title, setTitle] = useState("");

  // const fetchData = (batchPostStatus) => {
  //   axios
  //     .get("http://16.24.45.175:8000/BatchScan")
  //     .then((response) => {
  //       const filteredData = response?.data?.filter(
  //         (item) => item.batchPostStatus === batchPostStatus
  //       );
  //       setMatchingRows(filteredData);
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with the request:", error);
  //     });
  // };

  // useEffect(() => {
  //   if (route?.params?.data?.screen) {
  //     const screen = route.params.data.screen;
  //     const matchingCategory = Category_Data.find((item) => item.screen === screen);
  //     if (matchingCategory) {
  //       const filteredHeading = matchingCategory.Heading.flat();
  //       setTitle(filteredHeading);
  //       if (filteredHeading[0]?.Title === "VERIFIED CARDS") {
  //         fetchData("approved");
  //       } else if (filteredHeading[0]?.Title === "PAID CARDS") {
  //         fetchData("paid");
  //       }
  //     }
  //   }
  // }, [route]);

  const renderItem = ({ item, index }) => (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity style={styles.flatList_container}>
        <LinearGradient
          colors={['rgb(39, 174, 229)', 'rgb(29,138,210)', 'rgb(47,111,194)', 'rgb(64,94,171)']}
          style={styles.gradient_container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={styles.flatList_text}>
                {item.value}
              </Text>
              <Text style={styles.flatList_text_detail}>
                {item.name}
              </Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.flatList_text_qty}>
                {item.Num}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* <View key={index} style={[styles.flatList_container, { width: '90%', height: 150, alignSelf: 'center', }]}>
          <LinearGradient
            colors={['rgb(39, 174, 229)', 'rgb(29,138,210)', 'rgb(47,111,194)', 'rgb(64,94,171)']}
            style={styles.gradient_container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ textAlign: 'center', fontSize: 18, color: Colors.text_Color, paddingHorizontal: 50 }}>
              {`There is no any ${title[0]?.Title} record`}
            </Text>
          </LinearGradient>

        </View> */}

    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
        source={require('../../../Assets/Image/background_image.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <StatusBar hidden={true} />
        <Header value={true} />
        <View style={styles.back_icon_view}>
          <Ionicons name="chevron-back" size={30} color={Colors.text_Color} onPress={() => { navigation.goBack() }} />
        </View>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.part}>{title?.toUpperCase()}</Text>
        </View>
        <View>
          <FlatList
            data={data}
            contentContainerStyle={{ paddingVertical: 15, }}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default PaidCategory;
