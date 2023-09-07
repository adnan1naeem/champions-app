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
import { Colors } from '../../../Utils/Colors';

const PaidCategory = ({ route, navigation }) => {
  const [title, setTitle] = useState(route?.params?.status);
  let batchlisting = route?.params?.list;

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
            <View style={{ width: '75%' }}>
              <Text style={[styles.flatList_text, { paddingVertical: 5 }]}>
                {item?.batchCode}
              </Text>
              <Text style={[styles.flatList_text_detail, { paddingVertical: 5 }]}>
                {item.name}{' '}
              </Text>
            </View>
            <View style={[styles.text_container, { width: '25%' }]}>
              <Text style={styles.flatList_text_qty}>
                {item?.incentiveAmount} Rs
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
            data={batchlisting}
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
