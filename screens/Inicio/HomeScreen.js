import React, { useEffect, useState } from "react";
import { StyleSheet, View, Modal } from "react-native";
import {
  Box,
  FormControl,
  Input,
  Image,
  Text,
  Center,
  Pressable,
  Spacer,
  Button,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../configfb";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/firestore";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore(app);

  const [mascotas, setMascotas] = useState([]);
  const [recetas, setRecetas] = useState([]);

  const [agregarMasc, setAgregarMasc] = useState(false);

  const [nombreM, setNombreM] = React.useState("");
  const [especie, setEspecie] = React.useState("");
  const [sexo, setSexo] = React.useState("");
  const [raza, setRaza] = React.useState("");
  const [peso, setPeso] = React.useState("");
  const [userName, setUserName] = useState("")
  const [userUid, setUserUid] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUserUid(user.uid);

      onSnapshot(doc(db, 'users', user.uid), doc => {
        if (doc.data() !== undefined) {
          setUserName(doc.data().name);
        }

      });
    });

    const q = query(
      collection(db, "mascotas"),
      where("idDueño", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const mascotasData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        mascotasData.push(data);
      });
      setMascotas(mascotasData);
    });

    return () => {
      unsubscribe();
    };
  }, [userUid]);

  const handleAddMasc = async () => {
    if (user !== null) {
      const userId = user.uid;
      // Utiliza los datos del usuario en tu formulario de update
      console.log("Usuario autenticado:", userId);

      const data = {
        idDueño: user.uid,
        img: "https://firebasestorage.googleapis.com/v0/b/proyectopc-ed74f.appspot.com/o/mascpic.jpg?alt=media&token=0b07449e-215e-4e1d-a6f5-4cea516670b6",
        nombremasc: nombreM,
        especie: especie,
        sexo: sexo,
        raza: raza,
        peso: peso,
      };

      const refMascotas = doc(collection(db, "mascotas"));
      await setDoc(refMascotas, data);
      setAgregarMasc(!agregarMasc);
    } else {
      // No hay usuario autenticado, realiza alguna acción si es necesario
      console.log("No hay usuario autenticado");
    } 
  };

  return (
    <View style={styles.VistaPrincipal}>
      <View style={styles.Encabe}>
        <View>
          <Text style={styles.textSaludo}> HOLA, </Text>
        </View>
        <View>
          <Text style={styles.textName}> {userName} </Text>
        </View>
      </View>

      <View style={styles.Mascotas}>
        <View style={styles.HeadingMasc}>
          <View style={styles.Titulo}>
            <Text style={styles.textSeccion}> Tus mascotas</Text>
          </View>
          <Box style={styles.IconoPlus}>
            <Ionicons
              name="add-circle"
              color="#1AB28E"
              size="25px"
              onPress={() => setAgregarMasc(true)}
            />
          </Box>
        </View>
        <Spacer height={1} />
        <View style={styles.fotos}>
          {mascotas.map((mascota) => (
            <Pressable onPress={() => navigation.navigate("Menú", {mascota: mascota})} key={mascota.id}> 
              <Box
                maxW="80"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="2"
                _web={{ shadow: 5, borderWidth: 0 }}
                _light={{ backgroundColor: "gray.50" }}
              >
                <Box>
                  <Center>
                    <Image
                      source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/proyectopc-ed74f.appspot.com/o/mascpic.jpg?alt=media&token=0b07449e-215e-4e1d-a6f5-4cea516670b6",
                      }}
                      //   source={require(mascota.img)}
                      width={110}
                      height={100}
                      alt="Mascota 1"
                    />
                  </Center>
                  <Center
                    bg="#1AB28E"
                    _text={{
                      color: "warmGray.50",
                      fontWeight: "700",
                      fontSize: "s",
                    }}
                    position="center"
                    bottom="0"
                    px="3"
                    py="1.5"
                  >
                    {mascota.nombremasc}
                  </Center>
                </Box>
              </Box>
            </Pressable>
          ))}

        </View>
      </View>

      <View style={styles.Recetas}>
        <View style={styles.Titulo}>
          <Text style={styles.textSeccion}> Recetas activas </Text>
        </View>
        <Spacer height={1} />
        <View style={styles.cardsrecetas}>
          
          <Pressable style={styles.recetacard}>
            <View
              style={{
                backgroundColor: "#1AB28E",
                width: "5px",
                height: "auto",
                paddingTop: 2,
                paddingBottom: 2,
                borderRadius: "10px",
              }}
            ></View>
            <Ionicons name="document-text" color="#1AB28E" size="32px" />
            <View
              style={{ flexDirection: "column", width: "auto", height: "auto" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: "12px" }}>
                Receta de golfo
              </Text>
              <Text style={{ color: "#6E6F6F", fontSize: "10px" }}>
                5 de Feb del 2023
              </Text>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Ionicons name="arrow-forward" color="#1AB28E" size="30px" />
            </View>
          </Pressable>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={agregarMasc}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.tituloModal}>Agregando datos</Text>
            <Image
              style={styles.fotoperfil}
              source={require("../../img/img.jpg")}
            />
            <FormControl mb="2" mt="5">
              <Text style={{ fontSize: "10px", fontWeight: "500" }}>
                Nombre
              </Text>
              <Input
                variant="underlined"
                w={"90%"}
                onChangeText={(text) => setNombreM(text)}
                placeholder="¿Nombre de tu mascota...?"
              />
            </FormControl>
            <FormControl mb="2">
              <Text style={{ fontSize: "10px", fontWeight: "500" }}>
                Especie
              </Text>
              <Input
                variant="underlined"
                w={"90%"}
                onChangeText={(text) => setEspecie(text)}
                placeholder="¿Qué animal es...?"
              />
            </FormControl>
            <FormControl mb="2">
              <Text style={{ fontSize: "10px", fontWeight: "500" }}>Sexo</Text>
              <Input
                variant="underlined"
                w={"90%"}
                onChangeText={(text) => setSexo(text)}
                placeholder="¿Hembra o macho...?"
              />
            </FormControl>
            <FormControl mb="2">
              <Text style={{ fontSize: "10px", fontWeight: "500" }}>Raza</Text>
              <Input
                variant="underlined"
                w={"90%"}
                onChangeText={(text) => setRaza(text)}
                placeholder="¿De qué raza es...?"
              />
            </FormControl>
            <FormControl mb="5">
              <Text style={{ fontSize: "10px", fontWeight: "500" }}>Peso</Text>
              <Input
                variant="underlined"
                w={"90%"}
                onChangeText={(text) => setPeso(text)}
                placeholder="¿Su mascota pesa...?"
              />
            </FormControl>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-around",
              }}
            >
              <Button
                style={styles.btnGuardar}
                _text={{ color: "white" }}
                onPress={handleAddMasc}
              >
                {" "}
                Guardar{" "}
              </Button>
              <Button
                style={styles.btnCancelar}
                _text={{ color: "#1AB28E" }}
                onPress={() => setAgregarMasc(!agregarMasc)}
              >
                {" "}
                Cancelar{" "}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  VistaPrincipal: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  Encabe: {
    flexDirection: "column",
    padding: 10,
  },
  textSaludo: {
    textAlign: "left",
    fontSize: "20px",
    color: "#111",
  },
  textName: {
    textAlign: "left",
    color: "#111",
    fontSize: "30px",
    fontWeight: "bold",
  },
  Mascotas: {
    padding: 10,
  },
  HeadingMasc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSeccion: {
    textAlign: "left",
    color: "#1AB28E",
    fontSize: "20px",
    fontWeight: "bold",
  },
  fotos: {
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    padding: 10,
    shadow: 5,
    borderWidth: 0,
  },
  Recetas: {
    padding: 10,
  },
  cardsrecetas: {
    padding: 10,
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
    gap: 15,
  },
  recetacard: {
    flexDirection: "row",
    paddingLeft: 0,
    paddingBottom: 10,
    paddingRight: 10,
    paddingTop: 10,
    gap: 4,
    display: "flex",
    backgroundColor: "#F6F6F6",
    width: "auto",
    height: "auto",
    maxHeight: "90px",
    borderRadius: "10px",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnGuardar: {
    backgroundColor: "#1AB28E",
    borderRadius: 5,
    height: "30px",
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
  },
  btnCancelar: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#1AB28E",
    borderRadius: 5,
    height: "30px",
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
  },
  tituloModal: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "500",
    color: "#1AB28E",
  },
  fotoperfil: {
    width: "110px",
    height: "110px",
    borderRadius: 5,
  },
});