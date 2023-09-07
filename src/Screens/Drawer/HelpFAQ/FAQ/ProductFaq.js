import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../../../../Components/Header/Header';
import BackButton from '../../../../Components/BackButton';
import { Colors } from '../../../../Utils/Colors';

const ProductFaq = ({ route, navigation }) => {
    console.log('route::', route?.params?.FAQs);
    return (
        <ImageBackground
            source={require('../../../../Assets/Image/background_image.png')}
            style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
            <ScrollView>
                <View style={{ paddingHorizontal: 10 }}>
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
                        {route?.params?.FAQs}
                    </Text>
                </View>

                <View style={styles.Login_view}>
                    <View style={{ paddingVertical: 20, marginHorizontal: 20 }}>
                        {route?.params?.FAQs === 'Refrigerators' ? (
                            <View style={styles.container}>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q1. What makes the Orient refrigerators the best choice?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient offers the most sought-after refrigerators fully
                                    equipped with looks as well as the advanced technology. You
                                    will find fantastic designs for your kitchen in glass and
                                    metallic door options along with the best-in-class technology
                                    that saves electricity and keeps your food fresh for a longer
                                    period of time.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q2. What are the different types of Orient refrigerators?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient offers Inverter & non-Inverter refrigerators both in
                                    Glass Door and Metallic Door finishes.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q3. Why food stays fresh for longer hours in Orient
                                    Refrigerator?
                                </Text>
                                <Text style={styles.about_text}>
                                    The smart and cutting-edge features like Built-in Humidity
                                    Controller, Direct Cool Technology and Powerful Roll Bond
                                    Evaporator ensures that food stays fresh for longer hours in
                                    Orient Refrigerators.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q4. What is Instant freeze?
                                </Text>
                                <Text style={styles.about_text}>
                                    The smart cutting-edge Direct Cool Technology of Orient
                                    refrigerators ensures the lowest freezing time, forming ice in
                                    just 18 minutes.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q5. Will Orient refrigerators help in saving electricity?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient refrigerators save 35% more electricity than other
                                    brands in the market ensuring less than 1 unit a day
                                    electricity consumption.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q6. What is the approximate electricity consumption of Orient
                                    Refrigerators?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Refrigerators are energy efficient and consume as low
                                    as 1 unit per day.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q7. Can Orient refrigerators perform optimally during
                                    fluctuation?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient offers low voltage start up in its top-of-the-line
                                    products that helps the refrigerator work in even voltage as
                                    low as 90V without compromising on the cooling.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q8. What is the load bearing capacity of Orient Refrigerator
                                    shelves?
                                </Text>
                                <Text style={styles.about_text}>
                                    The shelves in Orient Refrigerators are made up of high
                                    quality steel making them durable with a load bearing capacity
                                    of up to 101 Kg. Its unique design does not block cooling to
                                    move across the refrigerator compartment and thus no need for
                                    a fan to circulate cooling.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q9. What is the function of Anti-Fungal Detachable Gasket in
                                    Orient Refrigerators?
                                </Text>
                                <Text style={styles.about_text}>
                                    The Anti-Fungal Detachable Gasket in Orient Refrigerators
                                    ensures bacteria-free and fresh food.
                                </Text>
                            </View>
                        ) : route?.params?.FAQs === 'LED TV' ? (
                            <View style={styles.container}>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q1. What makes Orient LEDs the smartest LED TVs?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient smart LED TVs have upgradeable Google Licensed Android
                                    Operating System which makes it the smartest LED TVs available
                                    in the market.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q2. What is the purpose of Quad-Core Processor in Orient LED
                                    TVs?
                                </Text>
                                <Text style={styles.about_text}>
                                    Quad-Core Processor gives you the next level of TV smoothness
                                    and gaming experience due to its fast speed.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q3. Are Orient LEDs 4K UHD?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient LEDs offer 4K UHD Resolution which is 4 times of full
                                    HD (1080p) resolution in comparison to the other LEDs
                                    available in the market.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q4. Can I watch Netflix and others with ease?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient LED TVs have built in Netflix, Amazon Prime Video,
                                    YouTube, YouTube Kids and Google Play store which makes in-app
                                    viewing experience smooth and seamless making it a complete
                                    entertainment partne.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q5. Do Orient LED TVs feature Full Screen Display?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Full Screen Display LEDs provide the best viewing
                                    experience with better and brighter screen resolution.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q6. Do Orient LED TVs have user-friendly interface for kids?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient LED TVs have built-in YouTube Kids which provides
                                    kids-friendly interface and content including TV Shows, Music
                                    Videos, and Educational Programs. It blocks and discards
                                    inappropriate search terms and offers an option to parents to
                                    limit the child's screen time.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q7. What is the use of TV Booster feature in Orient LED TVs?
                                </Text>
                                <Text style={styles.about_text}>
                                    TV Booster feature ensures a smooth experience and performance
                                    by shutting down all the unwanted background applications.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q8. Can I buy Orient LED TVs for high-end gaming?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Android LED TV with its extremely powerful 1.1GHz
                                    Quad-Core Processor, 2GB RAM and 16GB ROM provides seamless
                                    and an uninterrupted gaming experience along with wireless
                                    gamepad compatibility.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q9. Do Orient LED TVs feature Audio Connect?
                                </Text>
                                <Text style={styles.about_text}>
                                    Audio Connect in Orient LED TVs provide a hassle free
                                    experience where you can enjoy the music and continue using
                                    your phone at the same time.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q10. Can I have ChromeCast and Fastcast or Screen Mirroring
                                    features in Orient LED TVs?
                                </Text>
                                <Text style={styles.about_text}>
                                    FastCast feature helps you to cast your phone, tablet, or PC
                                    to the TV screen in high picture quality, and real-time
                                    response. You can also play your phone videos, music or sync
                                    phone pictures with the Orient LED TV. With built-in
                                    Chromecast, you can attach your external speakers through
                                    built-in headphone jack and enhance your viewing experience.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q11. What is HDR10 and how does it affect my purchase?
                                </Text>
                                <Text style={styles.about_text}>
                                    HDR10 is a technology that enables you to enjoy rich and
                                    real-life pictures. HDR10 makes sure that every scene is
                                    precisely optimized for color, contrast and to the finest of
                                    details. Along with this, the Full Color Optimizer reproduces
                                    colors with accuracy and the pictures you see on an Orient LED
                                    TV looks almost as beautiful as the world around you.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q12. What sort of sound quality does Orient offer?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient LED TVs with built-in Dolby Audio fills your room and
                                    makes sure that sound flows
                                </Text>
                            </View>
                        ) : route?.params?.FAQs === 'Microwave Oven' ? (
                            <View style={styles.container}>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q1. What are built-in recipes and how do I make use of them?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Microwave Oven is equipped with built-in recipes
                                    function for a better cooking experience. 8 auto menus for
                                    grill function to cook pizza, meat, vegetables, pasta, potato,
                                    fish, hot beverage and popcorn.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q2. What is Grill Function, Express Cooking and Combination
                                    Cooking Function?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Microwave Oven Grill is equipped with Child Safety Lock
                                    so that children are safe if they try to
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q3. Is Orient Microwave safe to use in homes with children?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Microwave Oven Function is perfect for grilling food or
                                    baking a cake. The Express Cooking Function re-heats food
                                    quickly and instantly. The Combination Cooking Function works
                                    perfectly by combining Heating & Grill function for perfectly
                                    baked or grilled food.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q4. What the benefit is of defrost by time or weight feature
                                    in Orient microwaves?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Microwave Oven can defrost food by time or weight,
                                    keeping the freshness intact.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q5. How Safe & durable are Orient microwaves?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Microwave Oven ensures 0% leakage due to stringent
                                    quality tests and adherence to safety standards. It is also
                                    fitted with the latest technology, Magnetron, which makes it
                                    long lasting and ensures best performance for decades.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q6. What is the purpose of cooking-end signal?
                                </Text>
                                <Text style={styles.about_text}>
                                    The cooking-end signal in Orient Microwaves lets you know when
                                    the food is ready to be served.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q7. Does Orient have a better heating system?
                                </Text>
                                <Text style={styles.about_text}>
                                    Yes, Orient microwaves provide efficient and accurate heating
                                    system, due to the latest technologically magnetron installed
                                    in it.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q8. What is the use of digital control panel?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Microwave Oven with its Digital Control Panel ensures
                                    most advanced settings and 0% error in the usage.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q9. Does it use a lot of electricity?
                                </Text>
                                <Text style={styles.about_text}>
                                    On the contrary, Orient’s Steak 62D Solo Microwave oven saves
                                    up on energy to keep a tight check on your electricity bills
                                    but it does not compromise on its performance.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q10. What are the benefits of 5 Power Levels?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Microwave Oven gives the ultimate flexibility in
                                    selecting desired power level (Low, Medium-Low, Medium, Medium
                                    –High and High) according to the requirement. The low power
                                    level in Orient Microwaves can be used for softening ice-cream
                                    also.
                                </Text>
                            </View>
                        ) : route?.params?.FAQs === 'Water Dispenser' ? (
                            <View style={styles.container}>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q1. Why are Orient Water dispensers immensely popular?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Glass Door Water Dispensers are the tallest and most
                                    elegant dispensers in the market. The range of 8 types of
                                    beautiful colors adds aesthetics to your home.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q2. What is the benefit of Fastest Cooling Technology feature
                                    in Orient Dispensers?
                                </Text>
                                <Text style={styles.about_text}>
                                    The fastest cooling technology featuring in Orient Dispensers
                                    give ice cold water in fastest possible cooling cycles.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q3. How is the water cooling any different in Orient
                                    dispensers?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Water Dispenser Cooling Retention Technology ensures
                                    continuous supply of cold water because of thick insulation
                                    around the cold-water tank. Our Fastest Cooling Technology
                                    gives ice cold water in fastest possible cooling cycles.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q4. Is it a 2in1; water dispenser and a mini refrigerator?
                                </Text>
                                <Text style={styles.about_text}>
                                    Yes, Orient Water Dispensers feature a fully functional
                                    refrigerator compartment at the bottom.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q5. What are the different options available?
                                </Text>
                                <Text style={styles.about_text}>
                                    You can browse the website for all available options. The
                                    range varies from two tap to three tap systems, glass door and
                                    metallic door dispensers, tallest water dispenser with added
                                    space and so much more.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q6. What is the function of three taps in the dispenser?
                                </Text>
                                <Text style={styles.about_text}>
                                    The dispenser not only comes with hot and cold water options
                                    but gives you water at room temperature as well. Its
                                    innovative taps are specially designed for easy water
                                    dispensing.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q7. I have kids at home who play with the dispenser. They
                                    might hurt themselves. Is there any
                                </Text>
                                <Text style={styles.about_text}>
                                    solution? Orient Water Dispenser Child Safety Lock offers
                                    complete protection and safety against any burns caused by
                                    accidental contact with hot water. Hot Water is dispensed only
                                    when Safety Lock is released.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q8. What material are Orient water dispenser inner tanks are
                                    made of?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient offers stainless steel hot and cold water tanks that
                                    are 100% rust proof ensuring hygienic water as well as
                                    durability of the tanks.
                                </Text>
                            </View>
                        ) : route?.params?.FAQs === 'Washing Machine' ? (
                            <View style={styles.container}>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q1. What do you mean by one touch operation?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Fully Automatic Washing Machine only requires One Touch
                                    to perform super wash. It automatically selects appropriate
                                    wash function while managing all other tasks.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q2. How many customizable options does Orient offer in Washing
                                    Machines?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Fully Automatic Washing Machine has built-in 6 Super
                                    Wash functions (Standard/Custom/Heavy
                                    Duty/Blanket/Delicate/Quick Wash) and 8 Water levels to choose
                                    from for complete ease and comfort of the washing process.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q3. Are these machines fabric friendly?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Fully Automatic Washing Machine has a specially
                                    designed Water-Jet Pulsator which increases washing
                                    performance by up to 20% and is fabric friendly. Along with
                                    this, Oval Bulge Drum Technology prevents clothes from
                                    damaging and is very gentle to each type of fabric during any
                                    of the super wash functions.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q4. What is G Flex?
                                </Text>
                                <Text style={styles.about_text}>
                                    It refers to technology that provides better capacity for your
                                    laundry needs.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q5. What are the advantages of using Oval Bulge Drum?
                                </Text>
                                <Text style={styles.about_text}>
                                    Oval Bulge Drum Technology prevents clothes from damaging and
                                    is very gentle to each type of fabric during any of the super
                                    wash functions.{' '}
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q6. Is there a 2in1 detergent box in Orient automatic
                                    machines?{' '}
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Automatic Washing Machines comes with a 2 in 1
                                    detergent box incorporating 1 section for detergent and the
                                    other for the softener.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q7. Do these washing machines feature easy to use control
                                    panel?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Automatic Washing Machines has a very easy to use
                                    European Technology based Control Panel which makes washing
                                    very convenient for every member of the house.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q8. If the electricity goes out, will I have to restart the
                                    machine?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Fully Automatic Washing Machine has a built-in Memory
                                    Function which because of its Artificial Intelligence ensures
                                    continuity of washing in case the machine stops due to power
                                    failure or any other reason.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q9. What is the purpose of delay start feature in Orient
                                    washing machines?
                                </Text>
                                <Text style={styles.about_text}>
                                    This feature helps to program and schedule washing after a
                                    planned delay of up to 9 hours.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q10. How can I know if this machine is more suitable for my
                                    home?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Fully Automatic Washing Machine has 3-Way water pipe
                                    outlets (one each on left, right and backside) which helps it
                                    to fit into any designated space in your home. The water inlet
                                    pipe is placed at the top to make it more convenient and
                                    easier to use.
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q11. How can I increase life of my machine?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Fully Automatic Washing Machine’s Fuzzy Logic Control
                                    ensures perfect balance of the drum to ease off pressure on
                                    the motor thus enhancing life of the machine.{' '}
                                </Text>

                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q12. How can I protect my machine getting damaged by reptiles
                                    and insects?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Fully Automatic Washing Machine has a very high-quality
                                    Motor Safety Matt which prevents reptiles and insects to cause
                                    any damage to the motor.{' '}
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.container}>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q1. Why Orient Air-conditioners are the best choice?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient air-conditioners are technologically advanced coupled
                                    with state of the art features including T3 Optimized
                                    Inverter, Optimized Compressor Drive, Low Voltage Operation,
                                    Eco Gear Technology, Japanese Compressor to name a few.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q2. What is EComfort?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient smart Air-conditioners are wifi enabled and can be
                                    operated and controlled with Mevris – Orient’s proprietry
                                    mobile application. Mevris offers unique CPAD system to
                                    operate, control and further increase efficiencies of Orient
                                    Air-conditioners.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q3. What are different types of air-conditioners which Orient
                                    offers?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient offers wall mounted commonly known as split
                                    air-conditioners as well as Floor Standing air-conditioners
                                    both in DC Inverter and non-inverter technologies.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q4. What are the sizes of Air-conditioners?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient offers split air-conditioners in 1 ton, 1.5 ton and 2
                                    tons whereas Floor Standing are in 2 ton and 4 ton.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q5. What is T3 Technology?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient T3 Technology means T3 Tropicalized Inverter and any T3
                                    IoT DC Inverter AC performs best even at high ambient
                                    temperature of 60 degree Celsius.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q6. What is Auto Pilot feature and how much energy it can save?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient T3 IoT DC Inverter with Auto Pilot feature provides a
                                    choice of 5 different cooling control profiles to ensure up to
                                    80% energy savings.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                    Q7. What is Eco Gear Technology?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient Air-Conditioners also come with great Eco Gear
                                    Technology which gives option to run air-conditioner on any of
                                    the preset power saving system.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q8. Does Orient air-conditioner perform best at low voltage as
                                    well?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient T3 IoT DC Inverter air-conditioner operates on as low
                                    as 70 Volts without compromising on its cooling performance.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q9. What is Auto Clean Sterilization System?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient T3 IoT DC Inverter air-conditioners are equipped with
                                    built-in Auto Clean Sterilization System which automatically
                                    senses dust and also cleans its evaporator automatically to
                                    enhance its cooling and saves maximum electricity cost.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q10. How fast it can start cooling?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient T3 IoT DC Inverter air-conditioners are the fastest
                                    air-conditioners due to unique optimized Compressor Drive
                                    feature. It can assure Fast Cooling in 30 seconds and Fast
                                    Heating in just 60 seconds.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q11. What is built-in Energy Meter?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient T3 IoT DC Inverter air-conditioners have built-in
                                    energy meter which helps to easily monitor live consumption of
                                    electricity.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q12. How durable and long lasting is PCB Kit?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient T3 IoT DC Inverter air-conditioners is equipped with
                                    new and improved Japanese PCB Kit for better protection from
                                    moisture for longer life and durability.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q13. Can Orient air-conditioner be used in winter also?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient T3 IoT DC Inverter air-conditioner with its dual
                                    heating and cooling functions is geared to provide maximum
                                    comfort in all seasons and weather conditions with greater
                                    electricity savings.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q14. Are Orient Air-Conditioners rust proof?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient T3 IoT DC Inverter air-conditioners come with
                                    protective Gold Fin Anti-Rust coating which prevents from
                                    corrosion caused by moisture.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q15. Can Orient Air-Conditioners clean air?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient T3 IoT DC Inverter air-conditioners keep all odors away
                                    and ensure to remove bacteria and germs to provide clean and
                                    fresh air.
                                </Text>
                                <Text style={[styles.about_text, { fontSize: 15 }]}>
                                Q16. How noisy are Orient air-conditioners?
                                </Text>
                                <Text style={styles.about_text}>
                                    Orient T3 IoT DC Inverter air-conditioners make minimum noise
                                    while ensuring maximum performance.
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default ProductFaq;

const styles = StyleSheet.create({
    Login_view: {
        paddingVertical: 10,
        width: '90%',
        backgroundColor: '#3F6FAD',
        marginVertical: '7%',
        borderRadius: 40,
        // marginBottom:20,
        alignSelf: 'center',
    },
    unlock_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '75%',
        height: 30,
        borderRadius: 10,
        alignSelf: 'center',
        // marginTop: 30,
        // Add the borderColor property
    },
    about_text: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.text_Color,
        paddingBottom: 8,
        lineHeight: 20,
        textAlign: 'center',
    },
});
