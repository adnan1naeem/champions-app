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
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigateIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import Header from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../Utils/Colors';
const Approved = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState('');
  const [payment, setpayment] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Selected_Date, setSelected_Date] = useState();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(data);
  const [scanData, setScanData] = useState([]);
  const newScanData = [
    {id: 1, RS: '123,123', value: 'Total Outstanding', number: 50},
    {id: 2, RS: '123,123', value: 'Total Paid', number: 100},
    {id: 3, RS: '123,123', value: 'Total Approved', number: 500},
  ];
  const renderItem = ({item: listItem}) => (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        style={styles.flatList_container}
        onPress={() => {
          navigation.navigate('Paid');
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.flatList_text}>{listItem.value}</Text>
          <View style={{flex: 1, alignItems: 'flex-end', marginRight: '6%'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: Colors.text_Color, fontSize: 20}}>
                {listItem?.number}
              </Text>
              <NavigateIcon
                name="navigate-next"
                size={20}
                color={'#D0D3E2'}
                marginTop={5}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const handleScanButton = () => {
    // Simulating scan button functionality by adding new data to the scanData state
    setScanData(newScanData);
  };
  const handleNavigation = item => {
    navigation.navigate('PaidCategory');
  };
  const data = [
    {
      rows: [{RS: '123,123', value: 'Total Outstanding'}],
      row2: [
        {RS: '123,123', value: 'Total Paid'},
        {RS: '123,123', value: 'Total Approved'},
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground
        source={require('../../Assets/Image/background_image.png')}
        style={styles.container}
        resizeMode="cover">
        <Header value={true} />
        <View style={styles.back_icon_view}>
          <Ionicons
            name="chevron-back"
            size={30}
            color={Colors.text_Color}
            onPress={() => {
              navigation.navigate('PaidCategory');
            }}
          />
          <View style={styles.filter_view}>
            <Text
              style={{
                marginRight: '60%',
                color: Colors.text_Color,
                fontSize: 16,
                fontWeight: '500',
              }}>
              All
              <Entypo name="chevron-small-down" size={20} />
            </Text>
            <Text
              style={{
                color: Colors.text_Color,
                fontSize: 16,
                fontWeight: '500',
              }}>
              Date
              <Entypo name="chevron-small-down" size={16} />
            </Text>
          </View>
        </View>
        {data?.map(item => {
          return (
            <>
              <View style={{alignItems: 'center', marginBottom: 20}}>
                <Text style={styles.performance}>RS. {item?.rows[0]?.RS}</Text>
                <Text style={styles.part}>{item?.rows[0]?.value}</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                {item?.row2?.map(value => {
                  return (
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.performance}>RS.{value?.RS}</Text>
                      <Text style={styles.part}>{value?.value}</Text>
                    </View>
                  );
                })}
              </View>
            </>
          );
        })}
        <View style={{marginTop: 10, alignItems: 'center', height: 170}}>
          <Image
            style={{height: '100%', width: '41%'}}
            source={require('../../Assets/Image/Orient_icon.png')}
          />
        </View>
        <View>
          <FlatList
            data={newScanData}
            contentContainerStyle={{paddingVertical: 15, gap: 10}}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <TouchableOpacity
          style={styles.scan_button}
          onPress={() => {
            navigation.navigate('Scan');
          }}>
          <Ionicons
            name="add"
            color={Colors.text_Color}
            size={16}
            fontWeight={400}
          />
          <Text style={styles.scan_text}>SCAN</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

export default Approved;
