import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { styles } from './styles';
import Header from '../../../Components/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import BackButton from '../../../Components/BackButton';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '../../../Utils/Colors';
import { API_BASE_URL } from '../../../../Constants';
import axios from './../../../Utils/axiosConfig'
import CustomButton from '../../../Components/CustomButton';

const PaidCategory = ({ route, navigation }) => {
  const [batches, setbatches] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  let batchlisting = route?.params?.data?.list
    ? route?.params?.data?.list
    : route?.params?.data?.item;
  const [title, setTitle] = useState();
  let heading = route?.params?.data?.Notifications;
  let tierExist = route?.params?.data?.tier;

  useFocusEffect(
    React.useCallback(() => {
      titleHandle()
      if (!tierExist) {
        if (typeof batchlisting === 'object' && !Array.isArray(batchlisting)) {
          const myArray = [];
          myArray.push(batchlisting);
          setbatches(batchlisting);
        } else {
          setbatches(batchlisting);
        }
      }
    }, [batchlisting]),
  );

  useEffect(() => {
    if (route?.params?.data?.tier) {
      getBatchList();
    } else {
      getDefaultBatchList();
    }
  }, [route])

  const getDefaultBatchList = async () => {
    if (!hasMoreData) return;

    setLoading(true);
    const data = {
      status: route?.params?.data?.name?.toLowerCase(),
      startDate: route?.params?.data?.startDate,
      endDate: route?.params?.data?.endDate,
      divCode: route?.params?.data?.divCode
    };
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/BatchListing?limit=25&page=${page}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };

    try {
      axios.request(config)
        .then(async (response) => {
          if (response?.data?.batchList) {
            if (batches?.length > 0) {
              setbatches((prevBatches) => [...prevBatches, ...response?.data?.batchList]);
            } else {
              setbatches([...response?.data?.batchList]);
            }
            if (response?.data?.batchList?.length < 25) {
              setHasMoreData(false);
            }
            setPage(page + 1);
          } else {
            setHasMoreData(false);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setHasMoreData(false);
          console.log(JSON.stringify(error, null, 2));
        });
    } catch (error) {
      setLoading(false);
      setHasMoreData(false);
      console.error('Error:', error);
    }
  };

  const getBatchList = async () => {
    if (!hasMoreData) return;
    setLoading(true);
    const data = {
      status: route?.params?.data?.name?.toLowerCase(),
      zoneId: route?.params?.data?.zone?._id,
      branchId: route?.params?.data?.barnch?._id,
      dealerId: route?.params?.data?.dealer?._id,
      fsmId: route?.params?.data?.fsm?._id,
      startDate: route?.params?.data?.startDate,
      endDate: route?.params?.data?.endDate,
      divCode: route?.params?.data?.divCode
    };
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/filteredBatchesList?limit=25&page=${page}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };

    try {
      axios.request(config)
        .then(async (response) => {
          if (response?.data) {
            if (batches?.length > 0) {
              setbatches((prevBatches) => [...prevBatches, ...response?.data?.data]);
            } else {
              setbatches([...response?.data?.data]);
            }
            if (response?.data?.data?.length < 25) {
              setHasMoreData(false);
            }
            setPage(page + 1);
          } else {
            alert('test')
            setHasMoreData(false);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setHasMoreData(false);
          console.log(JSON.stringify(error, null, 2));
        });
    } catch (error) {
      setLoading(false);
      setHasMoreData(false);
      console.error('Error:', error);
    }
  };

  const titleHandle = () => {
    let Heading_title = '';
    if (route?.params?.data?.status) {
      setTitle(route?.params?.data?.status);
    } else {
      const uppercaseHeading = heading?.toUpperCase();
      switch (uppercaseHeading) {
        case 'PENDING':
          Heading_title = 'PENDING CARD';
          break;
        case 'REJECTED':
          Heading_title = 'REJECTED CARD';
          break;
        case 'VERIFIED':
          Heading_title = 'VERIFIED CARD';
          break;
        case 'PAID':
          Heading_title = 'PAID CARD';
          break;
        case 'APPROVED':
          Heading_title = 'APPROVED CARD';
          break;
        default:
          Heading_title = '';
      }
      setTitle(Heading_title);
    }
  };

  const handleLoadMore = () => {
    getBatchList();
  };

  const renderItem = ({ item, index }) => (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('RejectedDetail', { item: item })}
        style={styles.flatList_container}
        disabled={!(route?.params?.data?.status === 'Rejected Cards')}>
        <LinearGradient
          colors={Colors.gradient_color_Pair}
          style={styles.gradient_container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '75%' }}>
              <Text style={[styles.flatList_text, { paddingVertical: 5 }]}>
                {item?.batchCode}
              </Text>
              <Text style={[styles.flatList_text_detail, { paddingVertical: 5 }]}>
                {item.name}
              </Text>
            </View>
            <View style={[styles.text_container, { width: '25%' }]}>
              <Text style={styles.flatList_text_qty}>
                {item?.incentiveAmount == null ||
                  item?.incentiveAmount == undefined
                  ? '0'
                  : item?.incentiveAmount}{' '}
                Rs
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={styles.container}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Header value={true} />
          <BackButton navigation={navigation} />
        </View>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.part}>{title?.toUpperCase()}</Text>
        </View>
        {route?.params?.data?.dataCount &&
          <Text style={styles.pagesText}>{`Pages (${page - 1}/${Math.ceil(route?.params?.data?.dataCount / 25)})`}</Text>
        }
        {loading ?
          <ActivityIndicator size={30} color={Colors.text_Color} style={{}} />
          :
          <FlatList
            data={batches}
            contentContainerStyle={{ paddingVertical: 15 }}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
          />}
        {batches?.length > 0 && hasMoreData && (
          <CustomButton
            onPress={handleLoadMore}
            ContainerStyle={{
              paddingVertical: 15,
              marginVertical: 10,
              justifyContent: 'center',
              alignSelf: 'center',
              height: 50,
              width: '80%',
              borderRadius: 15,
            }}
            textStyle={{ color: Colors.text_Color, textAlign: 'center' }}
            title="Load More!"
            disabled={loading} />
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default PaidCategory;
