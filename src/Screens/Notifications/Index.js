import React, { useCallback, useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ImageBackground,
    Alert,
    RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header/Header';
import BackButton from '../../Components/BackButton';
import { API_BASE_URL } from '../../../Constants';
import { Colors } from '../../Utils/Colors';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Index = ({ route, navigation }) => {
    const [Notifications, setNotifications] = useState();
    const [loading, setLoading] = useState(true);
    const scrollViewRef = React.useRef(null);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, []),
    );

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            fetchData()
        }, 1000);
    }, []);


    const fetchData = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('USER'));
        if (user) {
            try {
                const apiUrl = `${API_BASE_URL}/notificationsList?page=1&limit=20`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const filteredData = data?.data?.filter(item => {
                        return item?.data !== null && item?.data !== undefined;
                    });
                    setNotifications(filteredData);
                } else {
                    console.log('Notifications response was not ok');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        } else {
            console.log('USER NOT FOUND');
            setLoading(false);
        }
    };

    const handleNavigate = async item => {
        const user = JSON.parse(await AsyncStorage.getItem('USER'));

        if (user) {
            fetch(`http://16.24.45.175:5000/changeSeenStatus/${item?._id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            })
                .then(response => {
                    console.log('Status code:', response.status);
                    if (response.status === 204) {
                        if (item?.data?.batchPostStatus === 'rejected') {
                            navigation.navigate('RejectedDetail', { item: item?.data });
                        } else {
                            navigation.navigate('PaidCategory', {
                                item: item?.data,
                                Notifications: item?.data?.batchPostStatus,
                                // Notifications: 'paid',
                            });
                        }
                    } else if (!response.ok) {
                        throw new Error(`HTTP error Status: ${response?.status}`);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            console.log('USER NOT FOUND');
        }
    };

    return (
        <ImageBackground
            source={require('../../Assets/Image/background_image.png')}
            style={styles.container}
            resizeMode="cover">
            <View style={{ paddingHorizontal: 10 }}>
                <Header value={true} />
                <BackButton navigation={navigation} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                ref={scrollViewRef}
                refreshControl={
                    <RefreshControl
                        tintColor="#fff"
                        color={'red'}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View>
                    {loading ? (
                        <ActivityIndicator color={Colors.text_Color} />
                    ) : (
                        <FlatList
                            data={Notifications}
                            contentContainerStyle={{ paddingVertical: 15 }}
                            keyExtractor={item => item?._id}
                            renderItem={({ item }) => (
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => handleNavigate(item)}
                                        style={styles.flatList_container}>
                                        {console.log(item?.seen)}
                                        <LinearGradient
                                            colors={
                                                item?.seen === true
                                                    ? ['#014182', '#014182']
                                                    : Colors.gradient_color_Pair
                                            }
                                            style={styles.gradient_container}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: '75%' }}>
                                                    <Text
                                                        style={[
                                                            styles.flatList_text,
                                                            { paddingVertical: 5 },
                                                        ]}>
                                                        {item?.data?.batchCode}
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            styles.flatList_text_detail,
                                                            {
                                                                paddingVertical: 4,
                                                                paddingBottom: 7,
                                                                fontWeight: 'bold',
                                                                color:
                                                                    item?.data?.batchPostStatus.toLowerCase() === 'rejected'
                                                                        ? 'red'
                                                                        : item?.data?.batchPostStatus.toLowerCase() === 'pending'
                                                                            ? '#DEC20B'
                                                                            : item?.data?.batchPostStatus.toLowerCase() === 'approved'
                                                                                ? 'green'
                                                                                : Colors.flatlist_color,
                                                            },
                                                        ]}>
                                                        {item?.data?.batchPostStatus.toUpperCase()}
                                                    </Text>
                                                </View>
                                                <View style={[styles.text_container, { width: '25%' }]}>
                                                    <Text style={styles.flatList_text_qty}>
                                                        {item?.data?.incentiveAmount
                                                            ? item?.data?.incentiveAmount
                                                            : '0'}
                                                        Rs
                                                    </Text>
                                                </View>
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    )}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Index;
