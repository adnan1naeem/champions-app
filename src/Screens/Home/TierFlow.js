import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import Entypo from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modal'
import { styles } from './styles'
import LinearGradient from 'react-native-linear-gradient'

const TierFlow = ({ completeDataList, title, data, onPress, selectedVal, disabled }) => {
    const [isVisible, setisVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([...data]);

    useEffect(() => {
        setFilteredData([...data]);
    }, [data]);

    const setSearchFun = (text) => {
        let filtered = [];
        if (title === "Branch" && text !== "") {
            const branches = data?.length > 0 ? data : completeDataList?.map(item => item?.branches)?.flat()
            filtered = branches
                ?.filter(item =>
                    item?.code?.toLowerCase()?.includes(text?.toLowerCase())
                )
                ?.reduce((unique, item) => {
                    const existingItem = unique?.find(u => u && u?.code === item?.code);
                    if (!existingItem) {
                        unique?.push(item);
                    }
                    return unique;
                }, []);
        } else if (title === "Dealer" && text !== "") {
            const dealers = data?.length > 0 ? data : completeDataList;
            filtered = dealers?.filter(item =>
                item?.name?.toLowerCase()?.includes(text?.toLowerCase())
            );
        } else {
            filtered = data?.filter(item =>
                item?.name?.toLowerCase()?.includes(text?.toLowerCase())
            );
        }
        if (text === "" && (title !== "Zone" && title !== "Branch" && title !== "Dealer")) {
            setFilteredData([]);
        } else {
            setFilteredData([...filtered]);
        }
        setSearchText(text)
    }



    const renderItem = ({ item }) => {
        const handlePress = () => {
            onPress(item);
            setisVisible(false);
        };
        let name = title === "Branch" ? item?.code : item?.name;
        return (
            <TouchableOpacity
                onPress={handlePress}
                style={styles.dropdownItem1}>
                <Text style={styles.UpdateHeading1}>
                    {name}
                </Text>
                {selectedVal?.name === item?.name && (
                    <Entypo
                        name="check"
                        style={styles.checkIcon}
                    />
                )}
            </TouchableOpacity>
        );
    };

    const backHandler = () => {
        setisVisible(!isVisible)
        setSearchText("")
    }

    return (
        <View style={styles.container1}>
            <TouchableOpacity disabled={disabled}
                onPress={backHandler} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                    color: Colors.flatlist_color,
                    fontSize: 15,

                }}>{title}</Text>
                <Entypo
                    name={'chevron-down'}
                    style={styles.dropIcon}
                />
                <Text style={styles.selectedValue}>{title === "Branch" ? selectedVal?.code ? selectedVal?.code : "All" : selectedVal?.name || "All"}</Text>
            </TouchableOpacity>

            <Modal visible={isVisible} transparent animationType="slide">
                <View style={[styles.modalContainer1, { height: 300 }]}>
                    <TouchableOpacity style={{ alignItems: 'flex-end', }} onPress={backHandler}>
                        <Entypo name="cross" style={styles.crossIcon} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'flex-end', }}>
                        <TextInput
                            placeholder="Search..."
                            style={styles.input}
                            value={searchText}
                            onChangeText={text => setSearchFun(text)}
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
                                    {`${searchText === '' ? `Search to get the ${title} based on selected hierarchy` : `No record found against your search`}`}
                                </Text>
                            </LinearGradient>
                        </View>
                        : <>
                            <FlatList
                                data={filteredData}
                                renderItem={renderItem}
                                keyExtractor={item => item?._id}
                            />
                        </>
                    }

                </View>
            </Modal>
        </View>
    )
}

export default TierFlow