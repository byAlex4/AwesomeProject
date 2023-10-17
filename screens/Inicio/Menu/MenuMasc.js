import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Pressable, Avatar } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../configfb";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";

const MenuMasc = ({ navigation }) => {
  const route = useRoute();
  const { mascota } = route.params;
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [namem, setNamem] = useState("");

  useEffect(() => {
    onSnapshot(doc(db, "mascotas", mascota.id), (doc) => {
      if (doc.data() !== undefined) {
        setNamem(doc.data().nombremasc);
      }
    });
  }, []);

  return (
    <View style={styles.VistaPrincipal}>
      <View style={{ paddingLeft: 10 }}>
        <Ionicons
          name="arrow-back-outline"
          color="#1AB28E"
          size="40px"
          onPress={() => navigation.navigate("InicioScreen")}
        />
      </View>
      <View style={styles.divDatos}>
        <Avatar
          style={styles.avatar}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/proyectopc-ed74f.appspot.com/o/mascpic.jpg?alt=media&token=0b07449e-215e-4e1d-a6f5-4cea516670b6",
          }}
        >
          {" "}
        </Avatar>
        <Text style={styles.datoprin}> {namem} </Text>
      </View>
      <View style={styles.divOps}>
        <Pressable
          style={styles.divCard}
          onPress={() => navigation.navigate("Baño", { mascota: mascota })}
          key={mascota.id}
        >
          <Ionicons name="paw-outline" color="#323232" size="42px" />
          <Text style={styles.nomOp}>Baño</Text>
        </Pressable>
        <Pressable
          style={styles.divCard}
          onPress={() => navigation.navigate("Revisión", { mascota: mascota })}
          key={mascota.id}
        >
          <Ionicons name="medkit-outline" color="#323232" size="42px" />
          <Text style={styles.nomOp}>Revisión</Text>
        </Pressable>
        <Pressable
          style={styles.divCard}
          onPress={() => navigation.navigate("Cartilla", { mascota: mascota })}
          key={mascota.id}
        >
          <Ionicons name="folder-outline" color="#323232" size="42px" />
          <Text style={styles.nomOp}>Cartilla</Text>
        </Pressable>
        <Pressable
          style={styles.divCard}
          onPress={() => navigation.navigate("Receta", { mascota: mascota })}
          key={mascota.id}
        >
          <Ionicons name="document-text-outline" color="#323232" size="42px" />
          <Text style={styles.nomOp}>Receta</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default MenuMasc;

const styles = StyleSheet.create({
  VistaPrincipal: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    flexDirection: "column",
  },
  divDatos: { flexDirection: "column", alignItems: "center" },
  avatar: {
    width: "90px",
    height: "90px",
  },
  datoprin: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "#323232",
    padding: 5,
  },
  divOps: {
    width: "100%",
    height: "auto",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    display: "flex",
    flexWrap: "wrap",
  },
  divCard: {
    backgroundColor: "#F6F6F6",
    width: "110px",
    height: "auto",
    borderRadius: "10px",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  nomOp: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#323232",
    paddingTop: 5,
  },
});
