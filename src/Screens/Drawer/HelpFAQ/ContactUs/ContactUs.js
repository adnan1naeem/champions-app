import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Linking,
} from 'react-native';
import React from 'react';
import { styles } from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../Components/Header/Header';
import { Colors } from '../../../../Utils/Colors';
import BackButton from '../../../../Components/BackButton';

const ContactUs = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 10 }}>
          <Header />
          <BackButton navigation={navigation} />
        </View>
        <Text
          style={{
            color: Colors.text_Color,
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
            paddingTop: 5,
          }}>
          Complaints and Issues
        </Text>
        <View style={[styles.Login_view, { paddingBottom: 25 }]}>
          <View style={styles.unlock_view}>
            <Text
              style={{
                color: Colors.text_Color,
                fontSize: 16,
                fontWeight: '600',
              }}>
              For App Related
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
            }}>
            <TouchableOpacity
              onPress={() => Linking.openURL('tel:0300 – 0 567 343')}
              style={{ alignItems: 'center', width: '50%' }}>
              <Ionicons
                name="call-outline"
                size={26}
                color={Colors.text_Color}
              />
              <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                0300–0567343
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('whatsapp://send?phone=0300 - 0 567 343')
              }
              style={{ alignItems: 'center', width: '50%' }}>
              <Ionicons
                name="logo-whatsapp"
                size={26}
                color={Colors.text_Color}
                style={{ textAlign: 'center' }}
              />
              <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                0300 056 73 43
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL('mailto: help.champions@orient.com.pk')
            }
            style={{ alignItems: 'center', width: '100%' }}>
            <Ionicons name="mail-outline" size={26} color={Colors.text_Color} />
            <Text
              style={{
                textAlign: 'center',
                color: Colors.text_Color,
                fontSize: 11,
              }}>
              help.champions@orient.com.pk
            </Text>
          </TouchableOpacity>

          <View style={styles.unlock_view}>
            <Text
              style={{
                width: '100%',
                marginTop: 13,
                color: Colors.text_Color,
                fontSize: 16,
                fontWeight: '600',
                paddingBottom: 15,
              }}>
              For Product Functionality
            </Text>
          </View>
          <View style={{ gap: 20, marginTop: 20 }}>
            <View style={styles.ContainerView}>
              <TouchableOpacity
                style={{ alignItems: 'center', width: '50%' }}
                onPress={() => Linking.openURL('tel: 042 111 635 635')}>
                <Ionicons
                  name="call-outline"
                  size={26}
                  color={Colors.text_Color}
                />
                <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                  042 111 635 635
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: 'center', width: '50%' }}
                onPress={() => Linking.openURL('tel:0800 – 11 635')}>
                <Ionicons
                  name="call-outline"
                  size={26}
                  color={Colors.text_Color}
                />
                <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                  0800 – 11 635
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ContainerView}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('whatsapp://send?phone=0312 – 9 635 635')
                }
                style={{ alignItems: 'center', width: '50%' }}>
                <Ionicons
                  name="logo-whatsapp"
                  size={26}
                  color={Colors.text_Color}
                  style={{ textAlign: 'center' }}
                />
                <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                  0312–9635635
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL('mailto: care@orient.com.pk')}
                style={{ width: '50%' }}>
                <Ionicons
                  name="mail-outline"
                  size={26}
                  color={Colors.text_Color}
                  style={{ textAlign: 'center' }}
                />
                <Text
                  style={{
                    color: Colors.text_Color,
                    fontSize: 10,
                    textAlign: 'center',
                  }}>
                  care@orient.com.pk
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.unlock_view, { paddingVertical: 20 }]}>
            <Text
              style={{
                color: Colors.text_Color,
                fontSize: 16,
                fontWeight: '600',
              }}>
              For Information about Online Orders
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => Linking.openURL('tel: 042 – 3810 74 05')}
              style={{ alignItems: 'center', alignSelf: 'center', width: '50%' }}>
              <Ionicons
                name="call-outline"
                size={26}
                color={Colors.text_Color}
              />
              <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                042 – 3810 74 05
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('whatsapp://send?phone=0301 – 1 005 017')
              }
              style={{ alignItems: 'center', width: '50%' }}>
              <Ionicons
                name="logo-whatsapp"
                size={26}
                color={Colors.text_Color}
                style={{ textAlign: 'center' }}
              />
              <Text style={{ color: Colors.text_Color, fontSize: 10 }}>
                0301-1005017
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:onlinesales@orient.com.pk')}
            style={{ alignItems: 'center', width: '100%' }}>
            <Ionicons name="mail-outline" size={26} color={Colors.text_Color} />
            <Text
              style={{
                color: Colors.text_Color,
                fontSize: 10,
              }}>
              onlinesales@orient.com.pk
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ContactUs;
