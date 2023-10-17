import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Box,
  Heading,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  ScrollView,
  Spacer,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { WebView } from "react-native-webview";

const MapScreen = () => {
  return (
    <View style={{flex: 1}}>
      <WebView style={styles.container} source={{ uri: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6533.830164972731!2d-102.26693714267864!3d21.8783228998139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429ee069d6cf307%3A0xd93b5294c07171a7!2sInstituto%20Tecnol%C3%B3gico%20de%20Aguascalientes!5e0!3m2!1ses!2smx!4v1685933114108!5m2!1ses!2smx" }} />
    </View>
  );
};
export default () => {
  return (
    <NativeBaseProvider>
      <MapScreen />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  VistaPrincipal: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
});
