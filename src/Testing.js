// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import WebView from 'react-native-webview';
// import { API_BASE_URL } from '../Constants';

// const ExcelViewer = () => {
//   // const excelSheetURL = 'https://example.com/path-to-your-excel-file.xlsx';
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);


//   useEffect(() => {
//     fetchData();
//   }, []);


//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/getPrivacyImage`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       const imageUrlWithoutSpaces = await data?.data[0]?.image?.replace(/\s/g, '');
//       setImage(imageUrlWithoutSpaces);
//       console.log(imageUrlWithoutSpaces);

//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error('Fetch error:', error);
//     }
//   };
//   const NormalisedSource = (props) => {
//     const { source } = props;
//     const [normalisedSource, setNormalisedSource] = useState(
//       source &&
//         typeof source.uri === 'string' &&
//         !source.uri.split('http')[1]
//         ? null
//         : source
//     );

//     return props.source && props.source.uri ? normalisedSource : source;
//   };

//   return (
//     <View style={styles.container}>
//       {/* <Text>{image}</Text> */}

//       <WebView source={{ uri: NormalisedSource(image) }} style={styles.webView} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//   },
//   webView: {
//     flex: 1,
//   },
// });

// export default ExcelViewer;
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Testing = () => {
  return (
    <View>
      <Text>Testing</Text>
    </View>
  )
}

export default Testing

const styles = StyleSheet.create({})