import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Header from '../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utils/Colors';
import {API_BASE_URL} from '../../../Constants';
import BackButton from '../../Components/BackButton';

const SearchCate = ({route}) => {
  const navigation = useNavigation();
  const [batchlisting, setbatchlisting] = useState([]);
  const [searchBatchlisting, setSearchBatchlisting] = useState([]);
  const [matchingRows, setMatchingRows] = useState([]);
  const [title, setTitle] = useState('');
  const data = [
    {
      id: 1,
      name: 'ac',
      code: 'BQ5001001002',
      title: 'Air Conditioner',
      value: '50',
    },
    {id: 2, name: 'tv', code: 'BQ5001001005', title: 'Television', value: '30'},
    {id: 3, name: 'tv', code: 'BQ5001001005', title: 'Television', value: '30'},
    {id: 4, name: 'tv', code: 'BQ5001001005', title: 'Television', value: '30'},
    {
      id: 5,
      name: 'ac',
      code: 'BQ5001001002',
      title: 'Air Conditioner',
      value: '50',
    },
    {
      id: 6,
      name: 'ac',
      code: 'BQ5001001002',
      title: 'Air Conditioner',
      value: '50',
    },
    {
      id: 7,
      name: 'ac',
      code: 'BQ5001001002',
      title: 'Air Conditioner',
      value: '50',
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const config = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            start_date: '',
            end_date: '',
            divCode: '',
            cnic: '1111111111111',
          }),
        };
        const response = await fetch(`${API_BASE_URL}/BatchListing`, config);
        if (response) {
          const data = await response.json();
          setSearchBatchlisting(data?.batchList);
          setbatchlisting(data?.batchList);
        } else {
          console.log('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    })();
  }, []);

  const handleSearch = text => {
    setTitle(text);
    const filteredRows = batchlisting?.filter(item =>
      item?.batchCode?.toLowerCase().includes(text?.toLowerCase()),
    );
    setSearchBatchlisting(filteredRows);
  };

  const renderItem = ({item}) => (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={styles.flatList_container}>
        <LinearGradient
          colors={[
            'rgb(39, 174, 229)',
            'rgb(41,128,201)',
            'rgb(50,107,194)',
            'rgb(59,90,183)',
          ]}
          style={styles.gradient_container}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.flatList_text}>{item?.batchCode}</Text>
              <Text style={styles.flatList_text_detail}>{item?.name}</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.flatList_text_qty}>
                {item?.incentiveAmount}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.blueBackground,
      }}>
      <ImageBackground
        source={require('../../Assets/Image/background_image.png')}
        style={styles.container}
        resizeMode="cover">
        <View style={{paddingHorizontal: 15}}>
          <Header value={true} />
          <BackButton navigation={navigation} />
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            style={[
              styles.input,
              {
                textAlign: 'center',
                textAlignVertical: 'center',
                borderColor: '#17b8f5',
                color: Colors.text_Color,
                marginTop: 30,
              },
            ]}
            placeholder="Search"
            placeholderTextColor={Colors.text_Color}
            onChangeText={text =>  handleSearch(text)}
          />
          <TouchableOpacity style={{width: '25%', paddingVertical: 15}}>
            <LinearGradient
              colors={['rgb(39, 174, 229)', 'rgb(59,90,183)']}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.itemText}>GO</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={searchBatchlisting}
            contentContainerStyle={{paddingVertical: 50, gap: 10}}
            renderItem={renderItem}
            keyExtractor={item => item?._id?.toString()}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default SearchCate;
