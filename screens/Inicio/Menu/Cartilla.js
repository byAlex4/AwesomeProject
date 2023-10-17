import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Modal,  } from 'react-native';
import { Image, Text, ScrollView, Avatar, Button, FormControl, Input } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Table, Row, Rows } from 'react-native-table-component';
import { useRoute } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../configfb';
import { getFirestore,doc,onSnapshot,updateDoc } from "firebase/firestore";


const Cartilla = ({ navigation }) => {
    const route = useRoute();
    const { mascota } = route.params;
 
    const app = initializeApp(firebaseConfig);
    
    const db = getFirestore(app);

    //up
    const [modalEditM, setModalEditM] = useState(false);

    const [namem, setNamem] =  useState('');
    const [especie, setEspecie] =  useState('');
    const [sex, setSex] =  useState('');
    const [raza, setRaza] =  useState('');
    const [peso, setPeso] =  useState('');

    const [namemEdit, setNamemEdit] =  useState('');
    const [especieEdit, setEspecieEdit] =  useState('');
    const [sexEdit, setSexEdit] =  useState('');
    const [razaEdit, setRazaEdit] =  useState('');
    const [pesoEdit, setPesoEdit] =  useState('');

    useEffect(() => {
            onSnapshot(doc(db, 'mascotas', mascota.id), doc => {
                if (doc.data() !== undefined) {
                    setNamem(doc.data().nombremasc)
                    setEspecie(doc.data().especie)
                    setSex(doc.data().sexo)
                    setRaza(doc.data().raza)
                    setPeso(doc.data().peso)

                    setNamemEdit(doc.data().nombremasc)
                    setEspecieEdit(doc.data().especie)
                    setSexEdit(doc.data().sexo)
                    setRazaEdit(doc.data().raza)
                    setPesoEdit(doc.data().peso)
                }
            });
        
    }, []);
    const upMascotaData = async () => {
        
        const data = {
            nombremasc: namemEdit,
            especie: especieEdit,
            sexo: sexEdit,
            raza: razaEdit,
            peso: pesoEdit,
        }
        await updateDoc(doc(db, "mascotas",mascota.id), data);
        setModalEditM(!modalEditM)
    }

    const [showTable1, setShowTable1] = useState(true);

    const table1Head = ['Fecha', 'Vacuna', 'Lote', 'Sig.'];
    const table1 = [
        ['07/02/22', 'Parvovirus', 'V13105 FEB', '07/07/22'],
        ['07/02/22', 'Parvovirus', 'V13105 FEB', '07/07/22'],
    ];

    const table2Head = ['Fecha', 'Desparasit', 'Peso', 'Sig.'];
    const table2 = [
        ['07/02/22', 'Despa100', '11 kg', '07/07/22'],
        ['07/02/22', 'Despa100', '11 kg', '07/07/22'],
    ];


    const toggleTables = () => {
        setShowTable1(!showTable1);
    };

    return (
        <View style={styles.VistaPrincipal}>
            <View style={{ paddingLeft: 10, paddingTop: 10, justifyContent: 'flex-start' }}>
                <Ionicons name="arrow-back-outline" color="#1AB28E" size='40px' onPress={() => navigation.navigate('Menú', { mascota: mascota })} key={mascota.id} />
            </View>
            <View style={styles.divDatos}>
                <View style={styles.divcard}>
                    <View style={{ alignItems: 'flex-end' }} > <Ionicons name="create-outline" color="#1AB28E" size='20px' onPress={() => setModalEditM(true)}/> </View>
                    <View style={{ alignItems: 'center', padding: 5 }}>
                        <Avatar style={styles.avatar} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/proyectopc-ed74f.appspot.com/o/mascpic.jpg?alt=media&token=0b07449e-215e-4e1d-a6f5-4cea516670b6" }} > </Avatar>
                        <Text style={styles.tituloM}> {namem} </Text>
                        <Text style={styles.datosMasc}>Especie: {especie}</Text>
                        <Text style={styles.datosMasc}>Sexo: {sex} </Text>
                        <Text style={styles.datosMasc}>Raza: {raza} </Text>
                        <Text style={styles.datosMasc}>Peso: {peso} </Text>
                    </View>

                </View>
            </View>
            <View style={styles.divBtns}>
                <Button style={styles.btnV} _text={{ color: "white" }} onPress={toggleTables} > Vacunación  </Button>
                <Button style={styles.btnP} _text={{ color: "#1AB28E" }} onPress={toggleTables}> Desparacitación  </Button>
            </View>
            <View style={styles.divTabla}>
                <View style={styles.table}>
                    {showTable1 ? (
                        <Table>
                            <Row style={styles.header} textStyle={{ color: 'white' }} data={table1Head} />
                            <Rows style={styles.cell} textStyle={{ fontSize: '11px' }} data={table1} />
                        </Table>
                    ) : (
                        <Table>
                            <Row style={styles.header} textStyle={{ color: 'white' }} data={table2Head} />
                            <Rows style={styles.cell} textStyle={{ fontSize: '11px' }} data={table2} />
                        </Table>
                    )}
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEditM}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.tituloModal}>Editando datos</Text>
                        
                        <FormControl mb="2" mt="5">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Nombre</Text>
                            <Input variant="underlined" w={'90%'} onChangeText={(text) => setNamemEdit(text)} value={namemEdit} />
                        </FormControl>
                        <FormControl mb="2">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Especie</Text>
                            <Input variant="underlined" w={'90%'} onChangeText={(text) => setEspecieEdit(text)} value={especieEdit} />
                        </FormControl>
                        <FormControl mb="2">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Sexo</Text>
                            <Input variant="underlined" w={'90%'} onChangeText={(text) => setSexEdit(text)} value={sexEdit} />
                        </FormControl>
                        <FormControl mb="2">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Raza</Text>
                            <Input variant="underlined" w={'90%'} onChangeText={(text) => setRazaEdit(text)} value={razaEdit}/>
                        </FormControl>
                        <FormControl mb="5">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Peso</Text>
                            <Input variant="underlined" w={'90%'} onChangeText={(text) => setPesoEdit(text)} value={pesoEdit} />
                        </FormControl>
                        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
                            <Button style={styles.btnGuardar} _text={{ color: "white" }} onPress={upMascotaData}> Guardar  </Button>
                            <Button style={styles.btnCancelar} _text={{ color: "#1AB28E" }} onPress={() => setModalEditM(!modalEditM)}> Cancelar  </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Cartilla;

const styles = StyleSheet.create({
    VistaPrincipal: {
        height: '100%', width: '100%', backgroundColor: 'white', flexDirection: 'column',
    },
    divDatos: {
        height: 'auto', width: 'auto', paddingLeft: 10, paddingBottom: 5, alignItems: 'center',
    },
    divcard: {
        backgroundColor: '#F6F6F6', width: 'auto', height: 'auto', borderRadius: '10px', flexDirection: 'column', paddingLeft: 10, paddingRight: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    avatar: {
        width: '60px', height: '60px',
    },
    divBtns: {
        width: '100%', height: 'auto', flexDirection: 'row', justifyContent: 'space-around', padding: 10,
    },
    divTabla: {
        width: '100%', height: 'auto', padding: 10,
    },
    centeredView: {
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
        textAlign: 'center'
    },
    btnCancelar: {
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: '#1AB28E',
        borderRadius: 5,
        height: '30px',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tituloM: {
        marginTop: 5,
        textAlign: 'center',
        fontWeight: '700',
        color: '#1AB28E',
        fontSize: '15px'
    },
    tituloModal: {
        marginTop: 10, marginBottom: 10,
        textAlign: 'center',
        fontWeight: '500',
        color: '#1AB28E',
    },
    datosMasc: {
        fontSize: '12px', fontWeight: '500',
    },
    fotoperfil: {
        width: '110px', height: '110px', borderRadius: 5

    },
    btnV: {
        backgroundColor: "#1AB28E",
        borderRadius: 5,
        height: '30px', width: '40%',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnP: {
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: '#1AB28E',
        borderRadius: 5,
        height: '30px', width: '40%',
        fontWeight: 'bold',
        textAlign: 'center'
    }, table: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        marginVertical: 10,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
    },
    header: {
        fontWeight: 'bold',
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderColor: '#E2E2E2',
        backgroundColor: '#1AB28E',
        color: 'white',
        fontSize: '13px'
    },
    cell: {
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderColor: '#E2E2E2',
        fontSize: '12px'

    },
})