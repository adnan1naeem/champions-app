import { Image, Text, View, ImageBackground, ScrollView, ActivityIndicator, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../Drawer/HelpFAQ/AboutUs/style';
import { useNavigation } from '@react-navigation/native';
import Header from '../../Components/Header/Header';
import BackButton from '../../Components/BackButton';
import { Colors } from '../../Utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_BASE_URL } from '../../../Constants';
import CustomButton from '../../Components/CustomButton';
import * as OpenAnything from 'react-native-openanything'
import axios from './../../Utils/axiosConfig'

const Fsm_Policy = ({ route }) => {
    const navigation = useNavigation();
    const privacy = route?.params;
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${API_BASE_URL}/getPrivacyImage`,
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            axios.request(config)
                .then((response) => {
                    if (response?.data) {
                        const imageUrlWithoutSpaces = response?.data?.data[0]?.image?.replace(/\s/g, '');
                        setImage(imageUrlWithoutSpaces);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
            console.error('Fetch error:', error);
        }
    };


    const openPDF = (params) => {
        try {
            setLoading(true)
            if (image) {
                console.log("params: ", params);
                OpenAnything.Open(params)
            }
        } catch (e) {
            console.log(e);
            // setLoading(false)
        }

    }

    return (
        <ImageBackground
            source={require('../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
            <ScrollView>
                <View style={{ paddingHorizontal: 10 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>
                <MaterialCommunityIcons
                    name="book-check-outline"
                    style={{ alignSelf: 'center' }}
                    size={26}
                    color={Colors.text_Color}
                />

                <View style={styles.unlock_view}>
                    <Text
                        style={{
                            color: Colors.text_Color,
                            fontSize: 20,
                            fontWeight: '600',
                        }}>
                        {privacy ? 'FSM Policy' : 'Privacy Policy'}
                    </Text>
                </View>

                <View style={styles.Login_view}>
                    <View
                        style={{ width: '85%', alignSelf: 'center', paddingVertical: 20 }}>
                        {privacy ? (
                            <CustomButton textStyle={{}} title=" https://docs.google.com" onPress={() => openPDF(image)} />
                        ) : (
                            <View>
                                <Text style={styles.about_text}>
                                    Orient Champions App is a property of Orient Electronics and
                                    it collects data from its users including the data which users
                                    provide to enroll and further use this application and the
                                    data which this app collects by itself or through any third
                                    party. The types of data collected including but not limited
                                    to first name, last name, mobile number, email address, Phone
                                    number, CNIC number, postal address etc.
                                </Text>
                                <Text style={styles.about_text}>
                                    The Personal Data may be freely provided by the User, or
                                    collected automatically when using this Application. Any use
                                    of Cookies - or of other tracking tools - by this Application
                                    or by the owners of third party services used by this
                                    Application, unless stated otherwise, serves to identify Users
                                    and remember their preferences, for the sole purpose of
                                    providing the service required by the User. Failure to provide
                                    certain Personal Data may make it impossible for this
                                    Application to provide its services.
                                </Text>
                                <Text style={styles.about_text}>
                                    Users are responsible for any Personal Data of third parties
                                    obtained, published or shared through this Application and
                                    confirm that they have the third party's consent to provide
                                    the Data to the Owner.
                                </Text>
                                <Text style={styles.about_text}>
                                    The Data Controller processes the Data of Users in a proper
                                    manner and shall take appropriate security measures to prevent
                                    unauthorized access, disclosure, modification, or unauthorized
                                    destruction of the Data.
                                </Text>
                                <Text style={styles.about_text}>
                                    The Data processing is carried out using computers and/or IT
                                    enabled tools, following organizational procedures and modes
                                    strictly related to the purposes indicated. In addition to the
                                    Data Controller, in some cases, the Data may be accessible to
                                    certain types of persons in charge, involved with the
                                    operation of the app (administration, sales, marketing, legal,
                                    system administration) or external parties (such as third
                                    party technical service providers, mail carriers, hosting
                                    providers, IT companies, communications agencies) appointed,
                                    if necessary, as Data Processors by the Owner. The updated
                                    list of these parties may be requested from the Data
                                    Controller at any time.
                                </Text>
                                <Text style={styles.about_text}>
                                    The Data is processed at the Data Controller's operating
                                    offices and in any other places where the parties involved
                                    with the processing are located. For further information,
                                    please contact the Data Controller.{' '}
                                </Text>
                                <Text style={styles.about_text}>
                                    The Data is kept for the time necessary to provide the service
                                    requested by the User, or stated by the purposes outlined in
                                    this document, and the User can always request that the Data
                                    Controller suspend or remove the data.
                                </Text>
                                <Text style={styles.about_text}>
                                    The Data concerning the User is collected to allow the Owner
                                    to provide its services, as well as for the Contacting the
                                    User and doing Analytics.
                                </Text>
                                <Text style={styles.about_text}>
                                    The User's Data may be used for legal purposes by the Data
                                    Controller, in Court or in the stages leading to possible
                                    legal action arising from improper use of this Application or
                                    the related services.
                                </Text>
                                <Text style={styles.about_text}>
                                    The User declares to be aware that the Data Controller may be
                                    required to reveal personal data upon request of public
                                    authorities.{' '}
                                </Text>

                                <Text style={styles.about_text}>
                                    In addition to the information contained in this privacy
                                    policy, this Application may provide the User with additional
                                    and contextual information concerning particular services or
                                    the collection and processing of Personal Data upon request.
                                </Text>
                                <Text style={styles.about_text}>
                                    by applicable law notwithstanding this limitation, Use the app
                                    in any way prohibited by law, regulation, governmental order
                                    or decree.
                                </Text>
                                <Text style={styles.about_text}>
                                    Also the app cannot be used to defame, abuse, harass, stalk,
                                    threaten, or otherwise violate the legal rights (such as
                                    rights of privacy and publicity) of others, engage in activity
                                    that is false or misleading or that is harmful to you, others
                                    (including children), or the app (e.g., transmitting viruses,
                                    communicating hate speech, or advocating violence against
                                    others), share inappropriate content, advertising, spam,
                                    spyware or malware, gain (or attempt to gain) unauthorized
                                    access to any service, data, account or network by any means,
                                    Infringe upon the rights of others, Use the app anywhere other
                                    than the platform where the app publisher has made it
                                    available, unless the app publisher has enabled such uses,
                                    Remove, modify, or tamper with any notice or link that is
                                    incorporated into the app.
                                </Text>
                                <Text style={styles.about_text}>
                                    The Data Controller processes the Data of Users in a proper
                                    manner and shall take appropriate security measures to prevent
                                    unauthorized access, disclosure, modification, or unauthorized
                                    destruction of the Data.
                                </Text>
                                <Text style={styles.about_text}>
                                    If app publisher believes that you are making unauthorized use
                                    of the app or that you are in violation of these terms, it may
                                    suspend or terminate your access to app publisher’s service
                                    with or without notice. This may result in a loss of your
                                    data.
                                </Text>
                                <Text style={styles.about_text}>
                                    You grant to app publisher the right to use any content that
                                    you submit via the app as necessary for app publisher to
                                    provide the service to you.
                                </Text>
                                <Text style={styles.about_text}>
                                    The app may be subject to international technology control or
                                    export laws and regulations. You must comply with all domestic
                                    and international export laws and regulations that apply to
                                    the technology used or supported by the app. App publisher may
                                    update these terms of use at any time by amending this page.
                                    Please check this page from time to time to take notice of any
                                    changes, as they are binding on you.
                                </Text>
                                <Text style={styles.about_text}>
                                    This agreement and any applicable privacy policy are the
                                    entire agreement between you and the app publisher.
                                </Text>
                                <Text style={styles.about_text}>
                                    The laws of Islamic Republic of Pakistan govern the
                                    interpretation of these terms, claims for breach of them, and
                                    all other claims (including consumer protection, unfair
                                    competition, and tort claims), regardless of conflict of law
                                    principles. This agreement describes certain legal rights.
                                </Text>
                                <Text style={styles.about_text}>
                                    The app and the service accessed via the app are provided “as
                                    is” “with all faults” and “as available”. You bear the risk as
                                    to its quality and performance. The app publisher gives no
                                    express warranties, guarantees, or conditions in relation to
                                    the app. To the extent permitted under your local laws, app
                                    publisher excludes any implied warranties or conditions,
                                    including those of merchantability, fitness for a particular
                                    purpose and non-infringement.
                                </Text>

                                <Text style={styles.about_text}>
                                    To the extent not prohibited by law, if you have any basis for
                                    recovering damages, you can recover from the app publisher
                                    only direct damages up to the amount you paid for the app or
                                    PKR 1.00, whichever is greater. You will not, and waive any
                                    right to, seek to recover any other damages, including
                                    consequential, lost profits, special, indirect or incidental
                                    damages from the app publisher. If your local laws impose a
                                    warranty, guarantee or condition even though these terms do
                                    not, its duration is limited to 90 days from when you begin
                                    using the app. This limitation applies to anything related to
                                    the app or services made available through the app; and Claims
                                    for breach of contract, warranty, guarantee, or condition;
                                    strict liability, negligence, or other tort; violation of a
                                    statute or regulation; unjust enrichment; or under any other
                                    theory; all to the extent permitted by applicable law. This
                                    limitation applies even if this remedy doesn’t fully
                                    compensate you for any losses; or the app publisher knew or
                                    should have known about the possibility of the damages.
                                </Text>
                                <Text style={styles.about_text}>
                                    The User declares to be aware that the Data Controller may be
                                    required to reveal personal data upon request of public
                                    authorities.{' '}
                                </Text>

                                <Text style={styles.about_text}>
                                    In addition to the information contained in this privacy
                                    policy, this Application may provide the User with additional
                                    and contextual information concerning particular services or
                                    the collection and processing of Personal Data upon request.
                                </Text>
                                <Text style={styles.about_text}>
                                    For operation and maintenance purposes, this Application and
                                    any third party services may collect files that record
                                    interaction with this Application (System logs) or use for
                                    this purpose other Personal Data (such as IP Address).
                                </Text>

                                <Text style={styles.about_text}>
                                    More details concerning the collection or processing of
                                    Personal Data may be requested from the Data Controller at any
                                    time. Users have the right, at any time, to know whether their
                                    Personal Data has been stored and can consult the Data
                                    Controller to learn about their contents and origin, to verify
                                    their accuracy or to ask for them to be supplemented,
                                    cancelled, updated or corrected, or for their transformation
                                    into anonymous format or to block any data held in violation
                                    of the law, as well as to oppose their treatment for any and
                                    all legitimate reasons. Requests should be sent to the Data
                                    Controller at the contact information set out above.
                                </Text>
                                <Text style={styles.about_text}>
                                    This Application does not support “Do Not Track” requests. To
                                    determine whether any of the third party services it uses
                                    honor the “Do Not Track” requests, please read their privacy
                                    policies.
                                </Text>
                                <Text style={styles.about_text}>
                                    The Data Controller reserves the right to make changes to this
                                    privacy policy at any time by giving notice to its Users on
                                    this app. It is strongly recommended to check this page often,
                                    referring to the date of the last modification listed at the
                                    bottom.
                                </Text>
                                <Text style={styles.about_text}>
                                    If a User objects to any of the changes to the Policy, the
                                    User must cease using this Application and can request that
                                    the Data Controller remove the Personal Data. Unless stated
                                    otherwise, the then-current privacy policy applies to all
                                    Personal Data the Data Controller has about Users.
                                </Text>
                                <Text style={styles.about_text}>
                                    The definitions and legal references of personal data means
                                    any information regarding a natural person, a legal person, an
                                    institution or an association, which is, or can be,
                                    identified, even indirectly, by reference to any other
                                    information, including a personal identification number.
                                </Text>
                                <Text style={styles.about_text}>
                                    Usage data is the information collected automatically from
                                    this Application (or third party services employed in this
                                    Application. The user is the individual using this
                                    Application, which must coincide with or be authorized by the
                                    Data Subject, to whom the Data and or Personal Data refers.
                                </Text>
                                <Text style={styles.about_text}>
                                    These terms are an agreement between you and Orient
                                    Electronics for the use of Orient Champions App on the
                                    platform. If you do not accept these terms, you have no right
                                    to and must not use the app.
                                </Text>
                                <Text style={styles.about_text}>
                                    By accepting these terms, you represent that you are at least
                                    18 years old or have reached the age of majority where you
                                    live, if that is more than 18 years of age. If you are under
                                    18 or have not reached such age of majority, your parent or
                                    legal guardian must accept these terms on your behalf.
                                </Text>

                                <Text style={styles.about_text}>
                                    If you comply with these terms, you have the right that you
                                    may use the app for the sole purpose of interacting with the
                                    publisher of the app. The app publisher reserves all other
                                    rights.
                                </Text>
                                <Text style={styles.about_text}>
                                    There are certain restrictions and you don’t have to work
                                    around any technical limitations of the app, Modify, reverse
                                    engineer or otherwise alter the app (except to the extent this
                                    is authorized
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Fsm_Policy;
