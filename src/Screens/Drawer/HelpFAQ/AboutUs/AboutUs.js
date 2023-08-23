import { Image, Text, View, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../../Utils/Colors';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../../../../Components/BackButton';
import Header from '../../../../Components/Header/Header';
const AboutUs = ({ route }) => {
    const [mobile, setMobile] = useState('');
    const navigation = useNavigation();
    const privacy = route?.params;

    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header />
                    <BackButton navigation={navigation} />
                </View>

                <View style={styles.unlock_view}>
                    <Text
                        style={{
                            color: Colors.text_Color,
                            fontSize: 20,
                            fontWeight: '600',
                        }}>
                        {!privacy ? 'About Us' : "Privacy And Policay"}
                    </Text>
                </View>
                {!privacy ? (
                    <View style={styles.Login_view}>

                        <View
                            style={{ width: '85%', alignSelf: 'center', paddingVertical: 20 }}>
                            <View style={styles.container}>
                                <Text style={styles.about_text}>
                                    At Orient Electronics we are determined to continuously enrich
                                    the lives of our valued customers by providing technologically
                                    advanced consumer electronics. Our products are aimed to
                                    enhance lifestyles of our customers and bringing maximum
                                    comfort and convenience into their lives.
                                </Text>

                                <Text style={styles.about_text}>
                                    As one of Pakistan’s fastest growing consumer electronics
                                    brand, Orient Electronics has established state of the art
                                    production facilities in collaboration with International
                                    Technology Partners.
                                </Text>
                                <Text style={styles.about_text}>
                                    By maintaining the brand’s true innovative essence in terms of
                                    Technology, Research and Development, Orient is working on the
                                    ideas and concepts that have the aptitude of bringing positive
                                    change in the lives of the consumers.{' '}
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Electronics, located in Lahore, is a part of Orient
                                    Group of Companies which is considered as one of the fastest
                                    growing business entites in Pakistan. The Group has a
                                    diversified business portfolio in the fields of Consumer
                                    Electronics, Software Development, Technology Solutions,
                                    E-commerce, Porcelain Tiles Manufacturing, Power & Energy
                                    Generation, Hospitality, Healthcare, Apparel, Motors and
                                    Metals.
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient is well known for its innovative product portfolio
                                    based on extensive research and consumer insights. It is the
                                    first Pakistani brand which is providing full range of the
                                    most innovative, affordable and durable products to its valued
                                    customers.
                                </Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.Login_view}>

                        <View
                            style={{ width: '85%', alignSelf: 'center', paddingVertical: 20 }}>
                            <View style={styles.container}>
                                <Text style={styles.about_text}>
                                    This Application collects some Personal Data from its Users .
                                </Text>
                                <Text style={styles.about_text}>
                                    Data Controller and Owner BlueEast Private Limited – a
                                    technology development wing of Orient Group of Companies Types
                                    of Data collected Among the types of Personal Data that this
                                    Application collects, by itself or through third parties,
                                    there are: first name, last name, email address, various types
                                    of Data, Cookies and Usage Data.
                                </Text>
                                <Text style={styles.about_text}>
                                    Other Personal Data collected may be described in other
                                    sections of this privacy policy or by dedicated explanation
                                    text contextually with the Data collection. The Personal Data
                                    may be freely provided by the User, or collected automatically
                                    when using this Application. Any use of Cookies - or of other
                                    tracking tools - by this Application or by the owners of third
                                    party services used by this Application, unless stated
                                    otherwise, serves to identify Users and remember their
                                    preferences, for the sole purpose of providing the service
                                    required by the User. Failure to provide certain Personal Data
                                    may make it impossible for this Application to provide its
                                    services.
                                </Text>
                                <Text style={styles.about_text}>
                                    Users are responsible for any Personal Data of third parties
                                    obtained, published or shared through this Application and
                                    confirm that they have the third party's consent to provide
                                    the Data to the Owner. Mode and place of processing the Data
                                    Methods of processing The Data Controller processes the Data
                                    of Users in a proper manner and shall take appropriate
                                    security measures to prevent unauthorized access, disclosure,
                                    modification, or unauthorized destruction of the Data.
                                </Text>
                                <Text style={styles.about_text}>
                                    The Data processing is carried out using computers and/or IT
                                    enabled tools, following organizational procedures and modes
                                    strictly related to the purposes indicated. In addition to the
                                    Data Controller, in some cases, the Data may be accessible to
                                    certain types of persons in charge, involved with the
                                    operation of the site (administration, sales, marketing,
                                    legal, system administration) or external parties (such as
                                    third party technical service providers, mail carriers,
                                    hosting providers, IT companies, communications agencies)
                                    appointed, if necessary, as Data Processors by the Owner. The
                                    updated list of these parties may be requested from the Data
                                    Controller at any time. Place The Data is processed at the
                                    Data Controller's operating offices and in any other places
                                    where the parties involved with the processing are located.
                                    For further information, please contact the Data Controller.
                                </Text>
                                <Text style={styles.about_text}>
                                    Retention time The Data is kept for the time necessary to
                                    provide the service requested by the User, or stated by the
                                    purposes outlined in this document, and the User can always
                                    request that the Data Controller suspend or remove the data.
                                    The use of the collected Data The Data concerning the User is
                                    collected to allow the Owner to provide its services, as well
                                    as for the following purposes: Contacting the User and
                                    Analytics. The Personal Data used for each purpose is outlined
                                    in the specific sections of this document.
                                </Text>
                                <Text style={styles.about_text}>
                                    Detailed information on the processing of Personal Data
                                    Personal Data is collected for the following purposes and
                                    using the following services: Analytics The services contained
                                    in this section enable the Owner to monitor and analyze web
                                    traffic and can be used to keep track of User behavior. Cookie
                                    Policy This Application uses Cookies. Additional information
                                    about Data collection and processing Legal action The User's
                                    Personal Data may be used for legal purposes by the Data
                                    Controller, in Court or in the stages leading to possible
                                    legal action arising from improper use of this Application or
                                    the related services. The User declares to be aware that the
                                    Data Controller may be required to reveal personal data upon
                                    request of public authorities.
                                </Text>
                                <Text style={styles.about_text}>
                                    Additional information about User's Personal Data In addition
                                    to the information contained in this privacy policy, this
                                    Application may provide the User with additional and
                                    contextual information concerning particular services or the
                                    collection and processing of Personal Data upon request.
                                    System logs and maintenance For operation and maintenance
                                    purposes, this Application and any third party services may
                                    collect files that record interaction with this Application
                                    (System logs) or use for this purpose other Personal Data
                                    (such as IP Address). Information not contained in this policy
                                    More details concerning the collection or processing of
                                    Personal Data may be requested from the Data Controller at any
                                    time. Please see the contact information at the beginning of
                                    this document. The rights of Users Users have the right, at
                                    any time, to know whether their Personal Data has been stored
                                    and can consult the Data Controller to learn about their
                                    contents and origin, to verify their accuracy or to ask for
                                    them to be supplemented, cancelled, updated or corrected, or
                                    for their transformation into anonymous format or to block any
                                    data held in violation of the law, as well as to oppose their
                                    treatment for any and all legitimate reasons. Requests should
                                    be sent to the Data Controller at the contact information set
                                    out above. This Application does not support “Do Not Track”
                                    requests. To determine whether any of the third party services
                                    it uses honor the “Do Not Track” requests, please read their
                                    privacy policies. Changes to this privacy policy The Data
                                    Controller reserves the right to make changes to this privacy
                                    policy at any time by giving notice to its Users on this page.
                                    It is strongly recommended to check this page often, referring
                                    to the date of the last modification listed at the bottom. If
                                    a User objects to any of the changes to the Policy, the User
                                    must cease using this Application and can request that the
                                    Data Controller remove the Personal Data. Unless stated
                                    otherwise, the then-current privacy policy applies to all
                                    Personal Data the Data Controller has about Users. Information
                                    about this privacy policy The Data Controller is responsible
                                    for this privacy policy, prepared starting from the modules
                                    provided by Iubenda and hosted on Iubenda's servers.
                                    Definitions and legal references Personal Data (or Data) Any
                                    information regarding a natural person, a legal person, an
                                    institution or an association, which is, or can be,
                                    identified, even indirectly, by reference to any other
                                    information, including a personal identification number. Usage
                                    Data Information collected automatically from this Application
                                    (or third party services employed in this Application), which
                                    can include: the IP addresses or domain names of the computers
                                    utilized by the Users who use this Application, the URI
                                    addresses (Uniform Resource Identifier), the time of the
                                    request, the method utilized to submit the request to the
                                    server, the size of the file received in response, the
                                    numerical code indicating the status of the server's answer
                                    (successful outcome, error, etc.), the country of origin, the
                                    features of the browser and the operating system utilized by
                                    the User, the various time details per visit (e.g., the time
                                    spent on each page within the Application) and the details
                                    about the path followed within the Application with special
                                    reference to the sequence of pages visited, and other
                                    parameters about the device operating system and/or the User's
                                    IT environment. User The individual using this Application,
                                    which must coincide with or be authorized by the Data Subject,
                                    to whom the Personal Data refers. Data Subject The legal or
                                    natural person to whom the Personal Data refers. Data
                                    Processor (or Data Supervisor) The natural person, legal
                                    person, public administration or any other body, association
                                    or organization authorized by the Data Controller to process
                                    the Personal Data in compliance with this privacy policy. Data
                                    Controller (or Owner) The natural person, legal person, public
                                    administration or any other body, association or organization
                                    with the right, also jointly with another Data Controller, to
                                    make decisions regarding the purposes, and the methods of
                                    processing of Personal Data and the means used, including the
                                    security measures concerning the operation and use of this
                                    Application. The Data Controller, unless otherwise specified,
                                    is the Owner of this Application. This Application The
                                    hardware or software tool by which the Personal Data of the
                                    User is collected. Cookies Small piece of data stored in the
                                    User's device. This privacy policy relates solely to this
                                    Application.
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </ImageBackground>
    );
};

export default AboutUs;
