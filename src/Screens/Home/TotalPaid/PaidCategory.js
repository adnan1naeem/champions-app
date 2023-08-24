import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import Header from '../../../Components/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import BackButton from '../../../Components/BackButton';
import { Colors } from '../../../Utils/Colors';
import { API_BASE_URL } from '../../../../Constants';

const PaidCategory = ({ route, navigation }) => {
  const [title, setTitle] = useState(route?.params?.status);
  const [batchlisting, setbatchlisting] = useState();



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
          if (route?.params?.status === 'Paid Cards') {
            const paidBatches = data?.batchList?.filter(
              batch => batch?.batchPostStatus === 'paid',
            );
            setbatchlisting(paidBatches);
            return;
          } else if (route?.params?.status === 'Approved Cards') {
            const approvedBatches = data?.batchList?.filter(
              batch => batch?.batchPostStatus === 'approved',
            );
            setbatchlisting(approvedBatches);
            return;
          } else if (route?.params?.status === 'Verified Cards') {
            const verifiedBatches = data?.batchList?.filter(
              batch => batch?.batchPostStatus === 'verified',
            );
            setbatchlisting(verifiedBatches);
            return;
          } else if (route?.params?.status === 'Pendig Cards') {
            const pendingBatches = data?.batchList?.filter(
              batch => batch?.batchPostStatus === 'pending',
            );
            setbatchlisting(pendingBatches);
            return;
          } else if (route?.params?.status === 'Rejected Cards') {
            const rejectedBatches = data?.batchList?.filter(
              batch => batch?.batchPostStatus === 'rejected',
            );
            setbatchlisting(rejectedBatches);
            return;
          }
        } else {
          console.log('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    })();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity style={styles.flatList_container} disabled={true}>
        <LinearGradient
          colors={[
            'rgb(39, 174, 229)',
            'rgb(29,138,210)',
            'rgb(47,111,194)',
            'rgb(64,94,171)',
          ]}
          style={styles.gradient_container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={styles.flatList_text}>{item?.batchCode}</Text>
              <Text style={styles.flatList_text_detail}>{item.name}</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.flatList_text_qty}>
                {item?.incentiveAmount} rs
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
        source={require('../../../Assets/Image/background_image.png')}
        style={styles.container}
        resizeMode="cover">
        <View style={{ paddingHorizontal: 15 }}>
          <Header value={true} />
          <BackButton navigation={navigation} />
        </View>

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.part}>{title?.toUpperCase()}</Text>
        </View>
        <View>
          <FlatList
            data={batchlisting}
            contentContainerStyle={{ paddingVertical: 15 }}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default PaidCategory;
