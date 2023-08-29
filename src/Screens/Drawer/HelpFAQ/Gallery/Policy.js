import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../Utils/Colors";
import BackButton from "../../../../Components/BackButton";
import Header from "../../../../Components/Header/Header";
const ProductManuals = () => {
    const [mobile, setMobile] = useState(""); // Separate state for name
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
                <Image source={require('../../../../Assets/Image/Catalogue.png')} style={{ height: 70, width: 70, resizeMode: 'contain', alignSelf: 'center', zIndex: 1, marginTop: -35, }} />
                <Text style={{ textAlign: 'center', fontSize: 17, color: Colors.text_Color, marginTop: -20, fontWeight: 'bold' }}>Policy</Text>

                <View style={[styles.Login_view, { paddingBottom: 40, paddingHorizontal: 20 }]}>
                    <Text style={styles.privacyDetailText}>Privacy Policy</Text>
                    <Text style={styles.privacyDetailText}>Privacy Policy This Application collects some Personal Data from its Users. </Text>
                    <Text style={styles.privacyDetailText}>Data Controller and Owner
                    </Text>
                    <Text style={styles.privacyDetailText}>BlueEast Private Limited - a technology development wing of Orient Group of Companies
                    </Text>
                    <Text style={styles.privacyDetailText}>Typos of Data collected
                    </Text>
                    <Text style={styles.privacyDetailText}>Among the types of Personal Data that this Application collects, by itself or through third parties, there are: first name, last name, email address, various types of Data, Cookies and Usage Data.</Text>
                    <Text style={styles.privacyDetailText}>Other Personal Data collected may be described In other sections of this privacy policy or by dedicated explanation text contextually with the Data collection. </Text>
                    <Text style={styles.privacyDetailText}>The Personal Data may be freely provided by the User, or collected automatically when using this Application. </Text>
                    <Text style={styles.privacyDetailText}> Any use of Cookies - or of other tracking tools - by this Application or by the owners of third party services used by this Application, unless stated otherwise, serves to Identify Users and remember their preferences, for the sole purpose of providing the service required by the User.  </Text>
                    <Text style={styles.privacyDetailText}> Failure to provide certain Personal Data may make it Impossible for this Application to provide its services.
                    </Text>
                    <Text style={styles.privacyDetailText}> Users are responsible for any Personal Data of third parties obtained, published or shared through this Application and confirm that they have the third party's consent to provide the Data to the Owner.  </Text>




                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default ProductManuals;