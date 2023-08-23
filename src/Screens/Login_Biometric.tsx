import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateWithFinger_Id = async () => {
    const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();

    if (hasBiometricHardware) {
      const isBiometricAvailable = await LocalAuthentication.isEnrolledAsync();

      if (isBiometricAvailable) {
        const { success, error } =
          await LocalAuthentication.authenticateAsync();

        if (success) {
          setIsAuthenticated(true);
          console.log("Biometric authentication successful", success);
        } else {
          console.log("Biometric authentication failed:", error);
        }
      } else {
        console.log("Biometric authentication not available");
      }
    } else {
      console.log("Biometric hardware not available");
    }
  };

  const authenticateWithFace_Id = async () => {
    const hasFaceIdHardware = await LocalAuthentication.hasHardwareAsync(
      LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
    );

    if (hasFaceIdHardware) {
      const isFaceIdAvailable = await LocalAuthentication.isEnrolledAsync(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      );

      if (isFaceIdAvailable) {
        const { success, error } = await LocalAuthentication.authenticateAsync({
          promptMessage: "Scan your face to continue",
          fallbackLabel: "Use passcode",
          disableDeviceFallback: false,
          authenticationType:
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
        });

        if (success) {
          setIsAuthenticated(true);
          console.log("Face ID authentication successful", success);
        } else {
          console.log("Face ID authentication failed:", error);
        }
      } else {
        console.log("Face ID authentication not available");
      }
    } else {
      console.log("Face ID hardware not available");
    }
  };

  return (
    <View>
      <View>
        {isAuthenticated ? (
          <Text>You are authenticated and your unique id is</Text>
        ) : (
          <Button title="Finger print" onPress={authenticateWithFinger_Id} />
        )}
      </View>
      <View style={{ marginTop: 30 }}>
        {isAuthenticated ? (
          <Text>You are authenticated and your unique id is</Text>
        ) : (
          <Button title="Face id" onPress={authenticateWithFace_Id} />
        )}
      </View>
    </View>
  );
};

export default Home;

// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, Button } from "react-native";
// import * as LocalAuthentication from "expo-local-authentication";
// import uuid from "uuid";

// const Home = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [uniqueId, setUniqueId] = useState("");

//   useEffect(() => {}, []);

//   const authenticateWithBiometrics = async () => {
//     const hasFaceIdHardware = await LocalAuthentication.hasHardwareAsync(
//       LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
//     );

//     if (hasFaceIdHardware) {
//       const isFaceIdAvailable = await LocalAuthentication.isEnrolledAsync(
//         LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
//       );

//       if (isFaceIdAvailable) {
//         const { success, error } = await LocalAuthentication.authenticateAsync({
//           promptMessage: "Scan your face to continue",
//           fallbackLabel: "Use passcode",
//           disableDeviceFallback: false,
//           authenticationType:
//             LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
//         });

//         if (success) {
//           setIsAuthenticated(true);
//           setUniqueId(uuid.v4());
//           console.log("Face ID authentication successful", success);
//         } else {
//           console.log("Face ID authentication failed:", error);
//         }
//       } else {
//         console.log("Face ID authentication not available");
//       }
//     } else {
//       console.log("Face ID hardware not available");
//     }
//   };

//   return (
//     <View>
//       <View style={{marginTop:100}}>
//         {isAuthenticated ? (
//           <Text>
//             You are authenticated with Face ID and your unique id is {uniqueId}
//           </Text>
//         ) : (
//           <Button title="Sign Up" onPress={authenticateWithBiometrics} />
//         )}
//       </View>
//     </View>
//   );
// };

// export default Home;
