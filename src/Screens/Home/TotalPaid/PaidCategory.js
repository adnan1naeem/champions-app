import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { styles } from './styles';
import Header from '../../../Components/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import BackButton from '../../../Components/BackButton';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '../../../Utils/Colors';

const PaidCategory = ({ route, navigation, item, Notifications }) => {

  const [batches, setbatches] = useState();
  let batchlisting = route?.params?.list
    ? route?.params?.list
    : route?.params?.item;
  const [title, setTitle] = useState();
  let heading = route?.params?.Notifications;

  useFocusEffect(
    React.useCallback(() => {
      titleHandle()
      if (typeof batchlisting === 'object' && !Array.isArray(batchlisting)) {
        const myArray = [];
        myArray.push(batchlisting);
        console.log(myArray);
        setbatches(myArray);
      } else {
        setbatches(batchlisting);
      }
    }, [batchlisting]),
  );

  const titleHandle = () => {
    let Heading_title = '';
    if (route?.params?.status) {
      setTitle(route?.params?.status);
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


  const renderItem = ({ item, index }) => (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('RejectedDetail', { item: item })}
        style={styles.flatList_container}
        disabled={!(route?.params?.status === 'Rejected Cards')}>
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
        <View>
          <FlatList
            data={batches}
            contentContainerStyle={{ paddingVertical: 15 }}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default PaidCategory;
