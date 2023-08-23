// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const DateRangePicker = () => {
//   const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);

//   const onDayPress = (day) => {
//     if (!selectedStartDate || selectedEndDate) {
//       setSelectedStartDate(day.dateString);
//       setSelectedEndDate(null);
//     } else if (selectedStartDate && !selectedEndDate) {
//       if (new Date(day.dateString) >= new Date(selectedStartDate)) {
//         setSelectedEndDate(day.dateString);
//       } else {
//         setSelectedEndDate(null);
//         setSelectedStartDate(day.dateString);
//       }
//     }
//   };

//   const markedDates = {};
//   if (selectedStartDate) {
//     markedDates[selectedStartDate] = { selected: true, color: 'green' };
//   }
//   if (selectedEndDate) {
//     markedDates[selectedEndDate] = { selected: true, color: 'green' };
//   }

//   const toggleDatePicker = () => {
//     setIsDatePickerVisible(!isDatePickerVisible);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleDatePicker} style={styles.button}>
//         <Text style={styles.buttonText}>
//           {isDatePickerVisible ? 'Close Date Picker' : 'Open Date Picker'}
//         </Text>
//       </TouchableOpacity>
//       {isDatePickerVisible && (
//         <>
//           <Calendar
       
//             markingType={'period'}
//             markedDates={markedDates}
//             theme={{
//               selectedDayBackgroundColor: 'yellow',
//               selectedDayTextColor: 'white',
//               calendarBackground: 'white',
//               textSectionTitleColor: 'orange',
//               todayTextColor: 'green',
              
//             }}
//             onDayPress={onDayPress} />
            


//           <View style={styles.dateRange}>
//             <Text>Start Date: {selectedStartDate}</Text>
//             <Text>End Date: {selectedEndDate}</Text>
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   dateRange: {
//     marginTop: 20,
//   },
//   selectedDateContainerStyle: {
//     height: 35,
//     width: "100%",
//     backgroundColor: "blue",
//   },
//   selectedDateStyle: {
//     fontWeight: "bold",
//     color: "white",
//     backgroundColor: 'red'
//   },
// });

// export default DateRangePicker;


import React, { useState } from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import DatePicker from "react-native-neat-date-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { Icon } from "react-native-elements";

const Calender = () => {
 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [start_date, set_start_date] = useState();
  const [end_date, set_end_date] = useState();

  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const onCancel = () => {
    setShowDatePicker(false);
  };
  const onConfirm = (output) => {
    const { startDateString, endDateString } = output;
    set_start_date(startDateString);
    set_end_date(endDateString);
    console.log(startDateString);
    console.log(endDateString);
    setShowDatePicker(false);
  };
  const colorOptions = {
    headerColor: 'blue',
    weekDaysColor: 'black',
    confirmButtonColor: 'green',
    selectedDateBackgroundColor: 'pink',
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor:'blue',
          marginTop: 8,
            width: 170,
          padding: 10,
          justifyContent: "space-between" ,
          alignItems: "center",
          borderRadius: 5,
          marginRight: 15,
        }}
        onPress={openDatePicker}
      >
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
            }}
          >
            {moment(start_date).format("MMM DD -")}
            {moment(end_date).format(" MMM DD")}
          </Text>
        </View>
   
          <Icon
            name="keyboard-arrow-down"
            type="material"
            size={22}
            color={'white'}
          />
        
      </TouchableOpacity>
      <DatePicker
        isVisible={showDatePicker}
        mode={"range"}
        onCancel={onCancel}
        onConfirm={onConfirm}
        colorOptions={colorOptions}
      />
    </View>
  );
};

export default Calender;