import {
  Text,
  Button,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SelectList } from "react-native-dropdown-select-list";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PieChart from "react-native-pie-chart";
import Modal from "react-native-modal";
import { Colors } from "../../Utils/Colors";
import CustomButton from "../../Components/CustomButton";
import { styles } from "./styles";
const Home = () => {
  const [selected, setSelected] = React.useState("");
  const [payment, setpayment] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Selected_Date, setSelected_Date] = useState();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (date !== undefined) {
      var currentDate = date || Selected_Date;
      setSelected_Date(currentDate);
    }
    setSelected_Date(currentDate);
    hideDatePicker();
  };

  const data = [
    { key: "1", value: "Ac" },
    { key: "2", value: "Fridge" },
    { key: "3", value: "Cooler" },
  ];

  const searchFilterFunction = (text) => {
    const filteredData = data.filter((item) => {
      return item.value.toLowerCase().includes(text.toLowerCase());
    });
    setSearchResults(filteredData);
  };

  const widthAndHeight = 80;
  const series = [123, 323];
  const sliceColor = ["red", Colors.borderColor];

  return (
    <ScrollView style={styles.MainContainer}>
      <View style={styles.HeaderContainer}>
        <View style={styles.DrawerButton}>
          <Ionicons
            name="settings-outline"
            color={Colors.borderColor}
            size={30}
          />
        </View>

        <View style={styles.DrawerButton}>
          <Fontisto
            name="search"
            color={Colors.borderColor}
            size={26}
            style={{ paddingTop: 10 }}
          />
        </View>
      </View>
      <View style={styles.headerView}>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
          inputStyles={{ color: Colors.Half_white }}
          dropdownTextStyles={{ color: Colors.Half_white }}
          searchicon={
            <FontAwesome name="search" sstyle={styles.searchIconHeader} />
          }
          arrowicon={
            <FontAwesome name="chevron-down" style={styles.ArrowDown} />
          }
          dropdownItemStyles={{ color: Colors.Half_white }}
          boxStyles={styles.boxstyleDropdown}
          search={false}
        />

        <View style={styles.timeContainer}>
          <Text
            style={{ color: Colors.Half_white }}
            onPress={() => setDatePickerVisibility(true)}
          >
            {moment(Selected_Date).format("L")}
          </Text>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <LinearGradient
        colors={[
          "#005099",
          "#005099",
          "#4569c8",
          "#4569c8",
          "#6f76dc",
          "#6f76dc",
          "#9983f9",
        ]}
        start={{ x: 1.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.grediantRoundView}
      >
        <TouchableOpacity
          onPress={() => setpayment(!payment)}
          style={styles.AvailableBalance}
        >
          {payment ? (
            <View style={styles.hiddenBalance}>
              <Text style={styles.hiddenBalnceValue}>123456</Text>
            </View>
          ) : (
            <View style={styles.hiddenBalance} />
          )}
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.chart_Container}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.85}
          textStyle={{ color: "red" }}
        />
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.85}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <CustomButton
          Notification
          title={"Available Stock"}
          ContainerStyle={{ marginVertical: 20 }}
          onPress={() => setisModalVisible(true)}
        />
        <CustomButton
          title={"Available Stock"}
          ContainerStyle={{}}
          onPress={() => alert("Dev Testing")}
        />
      </View>
      <Modal
        isVisible={isModalVisible}
        transparent={true}
        backdropOpacity={0.1}
        onBackdropPress={() => setisModalVisible(false)}
        style={{ alignItems: "center", alignContent: "center" }}
        animationIn={"zoomIn"}
      >
        <View
          style={{
            backgroundColor: Colors.borderColor,
            width: "90%",
            borderRadius: 15,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <TextInput
            placeholder="search"
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
              searchFilterFunction(text);
            }}
            style={{
              backgroundColor: Colors.Half_white,
              height: 40,
              borderRadius: 15,
              paddingHorizontal: 10,
            }}
          />

          <FlatList
            data={searchResults}
            style={{ width: "100%" }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <>
                <Text style={{ color: Colors.Half_white, fontSize: 20 }}>
                  {item.value}
                </Text>
              </>
            )}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Home;
