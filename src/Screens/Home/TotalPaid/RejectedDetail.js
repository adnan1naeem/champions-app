import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import Header from '../../../Components/Header/Header';
import BackButton from '../../../Components/BackButton';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { Colors } from '../../../Utils/Colors';

const RejectedDetail = ({ route, navigation }) => {
    let batchlisting = route?.params?.item;
    console.log("batchlisting: ", batchlisting);


    const formatDate = date => {
        return moment(date).format('MM-D-YYYY h:mm A');
    };

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
                            <Text style={[styles.flatList_text, { paddingVertical: 5, fontSize: 15 }]}>
                                {item?.batchCode}
                            </Text>
                            <Text style={[styles.flatList_text_detail, { paddingVertical: 5, fontSize: 14 }]}>
                                Created date: {formatDate(item.createdAt)}{' '}
                            </Text>
                        </View>
                        <View style={[styles.text_container, { width: '25%' }]}>
                            <Text style={[styles.flatList_text_qty, { fontSize: 15 }]}>
                                {item?.incentiveAmount} Rs
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={[
                        'rgb(39, 174, 229)',
                        'rgb(29,138,210)',
                        'rgb(47,111,194)',
                        'rgb(64,94,171)',
                    ]}
                    style={[styles.gradient_container, { marginTop: '5%' }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            justifyContent: 'space-between',
                            marginRight: 20,
                        }}>
                        <Text style={[styles.flatList_text, { paddingVertical: 5, fontSize: 15 }]}>
                            Status
                        </Text>

                        <Text
                            style={[
                                styles.flatList_text_qty,
                                {
                                    backgroundColor: 'red',
                                    padding: 5,
                                    borderRadius: 5,
                                    paddingHorizontal: 15,
                                    fontSize: 15
                                },
                            ]}>
                            {item?.batchPostStatus}
                        </Text>
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={[
                        'rgb(39, 174, 229)',
                        'rgb(29,138,210)',
                        'rgb(47,111,194)',
                        'rgb(64,94,171)',
                    ]}
                    style={[styles.gradient_container, { marginTop: '5%' }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            justifyContent: 'space-between',
                            marginRight: 20,
                        }}>
                        <Text style={[styles.flatList_text, { paddingVertical: 5, fontSize: 15 }]}>
                            REJECTED ON
                        </Text>

                        <Text
                            style={[
                                styles.flatList_text_qty,
                                { padding: 5, borderRadius: 5, paddingHorizontal: 15, fontSize: 14 },
                            ]}>
                            {formatDate(item.createdAt)}
                        </Text>
                    </View>
                </LinearGradient>
                <Text
                    style={{
                        marginTop: 20,
                        color: Colors.text_Color,
                        fontWeight: 'bold',
                        paddingHorizontal: 10,
                    }}>
                    REJECTED REASON
                </Text>
                <LinearGradient
                    colors={[
                        'rgb(39, 174, 229)',
                        'rgb(29,138,210)',
                        'rgb(47,111,194)',
                        'rgb(64,94,171)',
                    ]}
                    style={[styles.gradient_container, { marginTop: '5%' }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            justifyContent: 'space-between',
                            marginRight: 20,
                        }}>
                        <Text style={[styles.flatList_text, { paddingVertical: 5, fontSize: 15 }]}>
                            {item?.rejectionReason
                                ? item.rejectionReason.replace('FAILED:', '')
                                : ''}
                        </Text>
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
                    {/* <Header value={true} /> */}
                    <BackButton navigation={navigation} />
                </View>

                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={styles.part}>Details</Text>
                </View>
                <View>
                    <FlatList
                        data={[batchlisting]}
                        contentContainerStyle={{ paddingVertical: 15 }}
                        renderItem={renderItem}
                        keyExtractor={item => item?.id}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default RejectedDetail;
