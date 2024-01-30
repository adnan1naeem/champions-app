import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import Entypo from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modal'
import { styles } from './styles'
import LinearGradient from 'react-native-linear-gradient'

const TierFlow = ({ data, title, onPress, selectedValue }) => {
    const [isVisible, setisVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const filtered = data?.filter(item =>
            item?.name?.toLowerCase().includes(searchText?.toLowerCase())
        );
        setFilteredData(filtered);
    }, [data, searchText]);



    const renderItem = ({ item }) => {
        const handlePress = () => {
            onPress(item);
            setisVisible(false);
        };
        return (
            <TouchableOpacity
                onPress={handlePress}
                style={styles.dropdownItem1}>
                <Text style={styles.UpdateHeading1}>
                    {item?.name}
                </Text>
                {selectedValue === item?.name && (
                    <Entypo
                        name="check"
                        style={styles.checkIcon}
                    />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container1}>
            <TouchableOpacity onPress={() => setisVisible(!isVisible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                    color: Colors.flatlist_color,
                    fontSize: 15,

                }}>{title}</Text>
                <Entypo
                    name={'chevron-down'}
                    style={styles.dropIcon}
                />
                <Text style={styles.selectedValue}>{selectedValue}</Text>
            </TouchableOpacity>

            <Modal visible={isVisible} transparent animationType="slide">
                <View style={styles.modalContainer1}>
                    <View style={{ alignItems: 'flex-end', }}>
                        <TouchableOpacity onPress={() => setisVisible(!isVisible)}>
                            <Entypo name="cross" style={styles.crossIcon} />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Search..."
                            style={styles.input}
                            value={searchText}
                            onChangeText={text => setSearchText(text)}
                        />
                    </View>
                    {filteredData?.length <= 0 ?
                        <View style={styles.EmptyContainer}>
                            <LinearGradient
                                colors={Colors.gradient_color_Pair}
                                style={styles.LinerGradiant}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}>
                                <Text
                                    style={styles.emptyMessage}>
                                    Sorry, no records found
                                </Text>
                            </LinearGradient>
                        </View>
                        :
                        <FlatList
                            data={filteredData}
                            renderItem={renderItem}
                            keyExtractor={item => item?._id}
                        />
                    }

                </View>
            </Modal>
        </View>
    )
}

export default TierFlow