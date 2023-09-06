import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import Header from '../../Components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../Utils/Colors';
import { API_BASE_URL } from '../../../Constants';
import BackButton from '../../Components/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchCate = () => {
  const navigation = useNavigation();
  const [batchlisting, setbatchlisting] = useState([]);
  const [searchBatchlisting, setSearchBatchlisting] = useState();
  const [title, setTitle] = useState('');

  useEffect(() => {

    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem("USER"));
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
            cnic: user?.cnic,
          }),
        };
        const response = await fetch(`${API_BASE_URL}/BatchListing`, config);
        if (response) {
          const data = await response.json();
          setbatchlisting(data?.batchList);
        } else {
          console.log('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    })();
  }, []);

  const handleSearch = () => {
    const filteredRows = batchlisting?.find(item =>
      item?.batchCode?.toLowerCase() === title?.toLowerCase()
    );
    setSearchBatchlisting(filteredRows);
  };


  const SearchRenderItem = (item) => (
    <View style={{ alignItems: 'center' }}>
      <LinearGradient
        colors={[
          'rgb(39, 174, 229)',
          'rgb(41,128,201)',
          'rgb(50,107,194)',
          'rgb(59,90,183)',
        ]}
        style={[styles.gradient_container, styles.flatList_container]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={styles.flatList_text}>CARD NUMBER</Text>
        <Text style={styles.flatList_text_detail}>{item?.batchCode}</Text>
      </LinearGradient>
      <LinearGradient
        colors={[
          'rgb(39, 174, 229)',
          'rgb(41,128,201)',
          'rgb(50,107,194)',
          'rgb(59,90,183)',
        ]}
        style={[styles.gradient_container, styles.flatList_container]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={styles.flatList_text} >PRODUCT</Text>
        <Text style={styles.flatList_text_detail}>{item?.name}</Text>
      </LinearGradient>
      <LinearGradient
        colors={[
          'rgb(39, 174, 229)',
          'rgb(41,128,201)',
          'rgb(50,107,194)',
          'rgb(59,90,183)',
        ]}
        style={[styles.gradient_container, styles.flatList_container]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={styles.flatList_text} >AMOUNT</Text>
          <Text style={[styles.flatList_text_detail, { paddingHorizontal: 10 }]}>{item?.incentiveAmount}</Text>
        </View>

      </LinearGradient>
      <LinearGradient
        colors={[
          'rgb(39, 174, 229)',
          'rgb(41,128,201)',
          'rgb(50,107,194)',
          'rgb(59,90,183)',
        ]}
        style={[styles.gradient_container, styles.flatList_container]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={styles.flatList_text} >STATUS</Text>
          <Text style={[styles.flatList_text_detail, { paddingHorizontal: 10 }]}>{item?.batchPostStatus}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={{ backgroundColor: Colors.blueBackground, flex: 1 }}>
      <ImageBackground
        source={require('../../Assets/Image/background_image.png')}
        style={styles.container}
        resizeMode="cover">
        <ScrollView
          contentContainerStyle={{


          }}>
          <View style={{ paddingHorizontal: 10 }}>
            <Header value={true} />
            <BackButton navigation={navigation} />
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
              value={title}
              placeholderTextColor={Colors.text_Color}
              onChangeText={text => setTitle(text)}
            />
            <TouchableOpacity style={{ width: '25%', paddingVertical: 15 }} onPress={() => handleSearch()}>
              <LinearGradient
                colors={['rgb(39, 174, 229)', 'rgb(59,90,183)']}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 7,
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text style={styles.itemText}>GO</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {searchBatchlisting ?
            SearchRenderItem(searchBatchlisting) : null
          }
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SearchCate;
