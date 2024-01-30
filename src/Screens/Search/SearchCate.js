import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import Header from '../../Components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../Utils/Colors';
import { API_BASE_URL } from '../../../Constants';
import BackButton from '../../Components/BackButton';
import axios from './../../Utils/axiosConfig';
const SearchCate = () => {
  const navigation = useNavigation();
  const [searchBatchlisting, setSearchBatchlisting] = useState();
  const [title, setTitle] = useState('');
  const [Active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (title === '') {
      setActive(false);
    }
  }, [title])


  const handleSearch = () => {
    if (!title) {
      Alert.alert('Please enter batchCode!');
      return;
    }
    setLoading(true);
    setActive(true);

    const data = {};
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/getBatch/${title}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };
    try {
      axios.request(config)
        .then(async (response) => {
          console.log(JSON.stringify(response?.data, null, 2));
          if (response?.data) {
            setSearchBatchlisting(response?.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          setSearchBatchlisting('');
          setLoading(false);
          console.log(JSON.stringify(error?.response?.data?.message, null, 2));
        });
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  };

  const capitalizeFirstLetter = text => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const SearchRenderItem = item => (
    <View style={{ alignItems: 'center' }}>
      <LinearGradient
        colors={Colors.gradient_color_Pair}
        style={[styles.gradient_container, styles.flatList_container]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={styles.flatList_text}>CARD NUMBER</Text>
        <Text style={styles.flatList_text_detail}>{item?.batchCode}</Text>
      </LinearGradient>
      <LinearGradient
        colors={Colors.gradient_color_Pair}
        style={[styles.gradient_container, styles.flatList_container]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={styles.flatList_text}>PRODUCT</Text>
        <Text style={styles.flatList_text_detail}>{item?.name}</Text>
      </LinearGradient>
      <LinearGradient
        colors={Colors.gradient_color_Pair}
        style={[styles.gradient_container, styles.flatList_container]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.flatList_text}>AMOUNT</Text>
          <Text style={[styles.flatList_text_detail, { paddingHorizontal: 10 }]}>
            {item?.incentiveAmount}
          </Text>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={Colors.gradient_color_Pair}
        style={[styles.gradient_container, styles.flatList_container]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.flatList_text}>STATUS</Text>
          <Text style={[styles.flatList_text_detail, { paddingHorizontal: 10 }]}>
            {capitalizeFirstLetter(item?.batchPostStatus)}
          </Text>
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
        <ScrollView contentContainerStyle={{}}>
          <View style={{ paddingHorizontal: 10 }}>
            <Header value={true} />
            <BackButton navigation={navigation} />
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
              selectionColor={Colors.text_Color}
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
            <TouchableOpacity
              style={{ width: '25%', paddingVertical: 15 }}
              onPress={() => handleSearch()}>
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
          {loading ?
            <ActivityIndicator size={30} color={Colors.text_Color}/>
            : <>
              {searchBatchlisting && SearchRenderItem(searchBatchlisting)}
              {!searchBatchlisting && Active ? (
                <View style={{ alignSelf: 'center' }}>
                  <LinearGradient
                    colors={Colors.gradient_color_Pair}
                    style={[
                      {
                        borderRadius: 20,
                        borderColor: '#98B1DD',
                        width: '98%',
                        paddingVertical: 30,
                      },
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text
                      style={{
                        color: Colors.flatlist_color,
                        fontSize: 20,
                        fontWeight: '600',
                        textAlign: 'center',
                        paddingHorizontal: 25,
                      }}>
                      No data found against this batchCode.
                    </Text>
                  </LinearGradient>
                </View>
              ) : null}
            </>}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SearchCate;
