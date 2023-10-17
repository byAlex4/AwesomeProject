import React, { useEffect,useState } from 'react'; 
import { StyleSheet, View,Modal,Pressable } from 'react-native';
import { FormControl,Input, Text, NativeBaseProvider, ScrollView, Spacer, Button } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../configfb";
import "firebase/firestore";
import {
  getFirestore,
  updateDoc,
  addDoc,
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const Revisión = ({navigation}) => {
    const route = useRoute();
    const { mascota } = route.params;

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [modalrevision, setModalRevision] = useState(false);
    const [modaledit, setModalEdit] = useState(false);

    const [descrip, setDescrip] = React.useState('Revisión de herida');
    const [fecha, setFecha] = React.useState('05/02/23');
    const [proxf, setProxf] = React.useState('No necesaria');
    
    const [descripEdit, setDescripEdit] = React.useState("");
    const [fechaEdit, setFechaEdit] = React.useState("");
    const [proxfEdit, setProxfEdit] = React.useState("");
    const [revEdit, setRevEdit] = useState("");
    
    const [revisiones, setRevisiones] = useState([]);
    useEffect(() => {
        const getRevs = async (id) => {
        const subCollectionRef = collection(db, "mascotas", id, "revisiones");

        // Obtiene los documentos de la subcolección
        const querySnapshot = await getDocs(subCollectionRef);

        // Recorre los documentos obtenidos
        const revsData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            revsData.push(data);
        });
        console.log(revsData);
        setRevisiones(revsData);
        };
        getRevs(mascota.id);
    }, []);

    const handleAddRevision = async () => {
        const Revdata = {
            descripcion: descrip,
            fecha: fecha,
            proxf: proxf,
        };

        const refRevs = doc(db,'mascotas',mascota.id);

        await addDoc(collection(refRevs, 'revisiones'),Revdata);
        setModalRevision(false);

        const subCollectionRef = collection(db, "mascotas", mascota.id, "revisiones");
        // Obtiene los documentos de la subcolección
        const querySnapshot = await getDocs(subCollectionRef);

        // Recorre los documentos obtenidos
        const revisionsData = [];
        querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        revisionsData.push(data);
        });
        console.log(revisionsData);
        setRevisiones(revisionsData);
    }

    const getRevsRender = async (id) => {
        const subCollectionRef = collection(db, "mascotas", id, "revisiones");

        // Obtiene los documentos de la subcolección
        const querySnapshot = await getDocs(subCollectionRef);

        // Recorre los documentos obtenidos
        const revisionsData = [];
        querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        revisionsData.push(data);
        });
        console.log(revisionsData);
        setRevisiones(revisionsData);
    };

    const handleDelete = async (idRevision) => {
        await deleteDoc(doc(db, "mascotas", mascota.id, "revisiones", idRevision))
        .then(() => {
            getRevsRender(mascota.id);
            console.log("eliminado");
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleEditModal = (revision) => {
        setModalEdit(true);
        setDescripEdit(revision.descripcion);
        setFechaEdit(revision.fecha);
        setProxfEdit(revision.proxf);
        setRevEdit(revision.id);
    };

    const handleEdit = async () => {
        const data = {
          descripcion: descripEdit,
          fecha: fechaEdit,
          proxf: proxfEdit,
        };
    
        await updateDoc(doc(db, "mascotas", mascota.id, "revisiones", revEdit), data);
        getRevsRender(mascota.id);
        setModalEdit(!modaledit);
    }; 

    return (
        <View style={styles.VistaPrincipal}>
            <View style={styles.divBtn}>
                <Ionicons name="arrow-back-outline" color="#1AB28E" size='40px' onPress={() => navigation.navigate('Menú', {mascota: mascota})} key={mascota.id} />
                <Ionicons name="add-circle" color="#1AB28E" size='30px' onPress={() => setModalRevision(true)} />
            </View>
            <View style={styles.divCards}>
                {revisiones.map((rev) => (
                    <View style={styles.cardbaño}>
                        <View style={{flexDirection:'row',gap:5,}}>
                            <View style={styles.lineaVerde}>
                            </View>
                            <View style={{flexDirection:'column'}}>
                                <Text style={{fontWeight:'bold',fontSize:'17px'}}> {rev.descripcion} </Text>
                                <Text style={{fontSize:'13px',fontWeight:'500'}}> {rev.fecha} </Text>
                                <Text style={{fontSize:'10px',fontWeight:'500'}}> {rev.proxf} </Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'column',alignContent:'center',paddingRight:5,}}>
                            <Pressable> <Ionicons name="create-outline" size='25px' onPress={() => handleEditModal(rev)} /> </Pressable>
                            <Spacer height={1} />
                            <Pressable onPress={() => handleDelete(rev.id)}> <Ionicons name="close-circle" color="#B20A0A" size='25px' /> </Pressable>
                                                    
                        </View>
                    </View>
                ))}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalrevision}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.tituloModal}>Agregando datos</Text>
                        <FormControl mb="2" mt="5">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Descripción </Text>
                            <Input variant="underlined"  w={'90%'} onChangeText={(text) => setDescrip(text)}/>
                        </FormControl>
                        <FormControl mb="2">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Fecha</Text>
                            <Input variant="underlined"  w={'90%'} onChangeText={(text) => setFecha(text)}/>
                        </FormControl>
                        <FormControl mb="5">
                            <Text style={{fontSize:'10px',fontWeight:'500'}}>Próxima cita</Text>
                            <Input variant="underlined" w={'90%'} onChangeText={(text) => setProxf(text)}/>
                        </FormControl>
                        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
                            <Button style={styles.btnGuardar} _text={{ color: "white" }} onPress={handleAddRevision}> Guardar  </Button>
                            <Button style={styles.btnCancelar} _text={{ color: "#1AB28E" }} onPress={() => setModalRevision(!modalrevision)}> Cancelar  </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal 
                animationType="slide"
                transparent={true}
                visible={modaledit}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.tituloModal}>Editando datos</Text>
                        <FormControl mb="2" mt="5">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Descripción </Text>
                            <Input variant="underlined"  w={'90%'} value={descripEdit} onChangeText={(text) => setDescripEdit(text)}/>
                        </FormControl>
                        <FormControl mb="2">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Fecha</Text>
                            <Input variant="underlined"  w={'90%'} value={fechaEdit} onChangeText={(text) => setFechaEdit(text)}/>
                        </FormControl>
                        <FormControl mb="5">
                            <Text style={{fontSize:'10px',fontWeight:'500'}}>Próxima cita</Text>
                            <Input variant="underlined" w={'90%'} value={proxfEdit} onChangeText={(text) => setProxfEdit(text)}/>
                        </FormControl>
                        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
                            <Button style={styles.btnGuardar} _text={{ color: "white" }} onPress={() => handleEdit()}> Guardar  </Button>
                            <Button style={styles.btnCancelar} _text={{ color: "#1AB28E" }} onPress={() => setModalEdit(!modaledit)}> Cancelar  </Button>
                        </View>
                    </View> 
                </View>
            </Modal>
        </View>
    );
}
export default Revisión;

const styles = StyleSheet.create({
    VistaPrincipal: {
        height: '100%', width: '100%', backgroundColor: 'white',flexDirection:'column'
    },
    divBtn: {
        flexDirection:'row', width:'100%',height:'auto',paddingLeft:10,paddingTop:10,paddingRight:10,justifyContent:'space-between',alignItems:'center'
    },
    divCards: {
        flexDirection:'row',paddingLeft:40,paddingRight:40,paddingTop:10, width:'100%',height:'auto',gap:40,display:'flex',flexWrap:'wrap'
    },
    cardbaño: {
        width:'auto',height:'auto',flexDirection:'row', backgroundColor:'#F6F6F6', borderRadius:'10px', justifyContent:'space-between',gap:50,
        paddingBottom:10,paddingTop:10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,  
    },
    lineaVerde: {
        backgroundColor:'#1AB28E',width:'5px',height:'auto',borderRadius:'10px'
    },
    CirculoRed: {
        width: '20px', height: '20px', borderRadius: '20px', backgroundColor: 'red',
    },centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingBottom: 15,
        paddingLeft: 40,
        paddingRight: 40,
        alignItems: 'center',
        shadowColor: '#000',
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
        height: '30px',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignContent: 'center'
    },
    btnCancelar: {
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: '#1AB28E',
        borderRadius: 5,
        height: '30px',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignContent: 'center'
    },
    tituloModal: {
        marginTop: 10,
        marginBottom: 10,
        fontSize:'20px',
        textAlign: 'center',
        fontWeight: '500',
        color: '#1AB28E',

    },
});
