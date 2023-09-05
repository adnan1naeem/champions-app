import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Navigation from './navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, LogBox } from 'react-native';
import { Colors } from './src/Utils/Colors';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={Colors.blueBar} barStyle="light-content" />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;



// import {
//   Image,
//   Text,
//   TouchableOpacity,
//   View,
//   ImageBackground,
//   ScrollView,
// } from 'react-native';
// import React, { useEffect, useState, useRef } from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import Entypo from 'react-native-vector-icons/Entypo';

// import Video from 'react-native-video';
// import { WebView } from 'react-native-webview';


// const App = () => {
//   const videoPlayer = useRef(null);
//   const [duration, setDuration] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [paused, setPaused] = useState(false);



//   const videoLink = require("./src/videoplayback.mp4");

//   const onSeek = seek => {
//     videoPlayer?.current.seek(seek);
//   };

//   const onLoad = data => {
//     setDuration(Math.round(data.duration));
//     setIsLoading(false);
//   };

//   const onLoadStart = () => setIsLoading(true);
//   const onError = () => setIsLoading(true);

//   const onBuffer = () => { };


//   return (

//     <ScrollView>
//       <View style={{ paddingHorizontal: 10, marginTop: 80 }}>

//       </View>

//       <WebView source={{
//         uri: 'https://www.youtube.com/watch?v=GutiOP4sWNM'
//       }} style={{ flex: 1 }} />

//       {/* <View style={[{ paddingBottom: 25 }]}>
//         <Video
//           ref={videoPlayer}
//           source={videoLink}
//           style={{

//             position: 'absolute',
//             top: 0,
//             bottom: 0,
//             right: 0,
//             left: 0,
//             backgroundColor: 'black',
//             height: 200,
//             width: 200


//           }}
//           resizeMode={'contain'}
//           controls={true}
//           playInBackground={false}
//           onBuffer={onBuffer}
//           onLoad={onLoad}
//           repeat={false}
//           hideShutterView={true}
//           onLoadStart={onLoadStart}
//           // paused={isFocus && !paused ? false : true}
//           fullscreenOrientation={'landscape'}
//           onError={onError}
//           bufferConfig={{
//             minBufferMs: 15000,
//             maxBufferMs: 50000,
//             bufferForPlaybackMs: 2500,
//             bufferForPlaybackAfterRebufferMs: 5000,
//           }}
//           pictureInPicture={false}
//           thumbnail={() => <><Image source={require('./src/Assets/Image/C1.png')} /></>}

//         />

//       </View> */}
//     </ScrollView>

//   );
// };

// export default App;
