import {
    Image,
    Text,
    View,
    ImageBackground,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../../../Utils/Colors";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import BackButton from "../../../../Components/BackButton";
import Header from "../../../../Components/Header/Header";
const TermsAndCondition = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground }}
        >
            <ScrollView>
                <View style={{ paddingHorizontal: 10 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>
                <View style={styles.unlock_view}>
                    <Text style={{ color: Colors.text_Color, fontSize: 20, fontWeight: '600' }}>
                        Terms and Conditions
                    </Text>
                </View>
                <View style={styles.Login_view}>

                    <View style={{ width: "85%", alignSelf: 'center', paddingVertical: 20 }}>
                        <View style={styles.container}>
                            <Text style={styles.about_text}>
                                1. The effective date of the incentive policy is the 1st of every month till month-end.
                            </Text>
                            <Text style={styles.about_text}>
                                2. Any pending cards can be scanned till the 3rd of the new month.
                            </Text>
                            <Text style={styles.about_text}>
                                3. Warrenty cards must be submitted to the concerned
                                branch for incentive approval, no incentives will be approved without warrenty cards
                            </Text>
                            <Text style={[styles.about_text, { marginBottom: -4 }]}>
                                4. Warranty cards will be rejected if any or all of the below-mentioned information is missing;
                            </Text>

                            <Text style={[styles.about_text, { marginHorizontal: 15, }]}>
                                i. Dealer sales stamp
                            </Text>
                            <Text style={[styles.about_text, { marginHorizontal: 15 }]}>
                                ii. Customer Name
                            </Text>
                            <Text style={[styles.about_text, { marginHorizontal: 15 }]}>
                                iii. Customer mobile number
                            </Text>
                            <Text style={[styles.about_text, { marginHorizontal: 15 }]}>
                                iv. Purchase Date
                            </Text>
                            <Text style={styles.about_text}>
                                5. The Incentiver posting date  to Champions will be 20th of every month
                            </Text>
                            <Text style={styles.about_text}>
                                6. Floor Saleman is liable to submit the card to branch accountant within 30 days of sales date.
                            </Text>
                            <Text style={styles.about_text}>
                                7.Only easypaisa account will be used for incentive payment.
                            </Text>
                            <Text style={styles.about_text}>
                                8. The company has the rights to change or withdraw.
                            </Text>
                            <Text style={styles.about_text}>
                                9. FSM policy without any prior notice.
                            </Text>
                            <Text style={styles.about_text}>
                                10. The decision of the company regarding incentive policy and procedures cannot be challenged in any court of law.
                            </Text>
                            <Text style={styles.about_text}>
                                11. In case of wrong information,your account will be terminated.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default TermsAndCondition;