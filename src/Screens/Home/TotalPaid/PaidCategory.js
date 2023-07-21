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
const PaidCategory = ({ route }) => {
  const navigation = useNavigation();
  const [matchingRows, setMatchingRows] = useState([]);
  const [title,setTitle]=useState("");
  useEffect(() => {
    if (route?.params?.data?.screen) {
      
      if (route?.params?.data?.screen) {
        const screen = route.params.data.screen;
        console.log(route?.params?.data)
        const filteredRows = Category_Data.filter(item => item.screen === screen).map(value => value.rows).flat();{
        setMatchingRows(filteredRows);
        }
        const filteredRow = Category_Data.filter(item => item.screen === screen).map(value => value.Heading).flat();{
          setTitle(filteredRow);
          }
      }
    }
  }, [route]);
  const renderItem = ({ item }) => (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity style={styles.flatList_container}>
        <LinearGradient
          colors={['rgb(39, 174, 229)','rgb(29,138,210)','rgb(47,111,194)','rgb(64,94,171)']}
          style={styles.gradient_container}
          start={{ x: 0, y: 0 }} // Start from the left side
          end={{ x: 1, y: 0 }} // End at the right side
        >
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={styles.flatList_text}>
                {item.name}
              </Text>
              <Text style={styles.flatList_text_detail}>
                {item.title}
              </Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.flatList_text_qty}>
                {item.value}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
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
          <Ionicons name="chevron-back" size={30} color="white" onPress={() => { navigation.goBack() }} />
        </View>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.part}>{title[0]?.Title}</Text>
        </View>

        <View>
          <FlatList
            data={matchingRows}
            contentContainerStyle={{ paddingVertical: 15, gap: 10 }}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default PaidCategory;