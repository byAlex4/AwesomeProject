import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Modal, TouchableOpacity } from 'react-native';
import { Box, Image, Text, NativeBaseProvider, ScrollView, Spacer, Avatar, Button, FormControl, Input, } from "native-base";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../configfb';
import {
    getFirestore,
    doc,
    onSnapshot,
    updateDoc
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const ConfigScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore(app);

    const [modalVisible, setModalVisible] = useState(false);

    const [userUid, setUserUid] = useState(null)
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userDirec, setUserDirec] = useState("")
    const [userTel, setUserTel] = useState("")

    const [userNameEdit, setUserNameEdit] = useState("")
    const [userEmailEdit, setUserEmailEdit] = useState("")
    const [userDirecEdit, setUserDirecEdit] = useState("")
    const [userTelEdit, setUserTelEdit] = useState("")

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUserUid(user.uid);

            onSnapshot(doc(db, 'users', user.uid), doc => {
                if (doc.data() !== undefined) {
                    setUserName(doc.data().name)
                    setUserEmail(doc.data().email)
                    setUserDirec(doc.data().direccion === '' ? 'Dirección no establecida' : doc.data().direccion)
                    setUserTel(doc.data().tel === '' ? 'Teléfono no establecido' : doc.data().tel)

                    setUserNameEdit(doc.data().name)
                    setUserEmailEdit(doc.data().email)
                    setUserDirecEdit(doc.data().direccion)
                    setUserTelEdit(doc.data().tel)
                }
            });
        });
    }, [userUid]);

    const updateUserData = async () => {

        const data = {
            name: userNameEdit,
            email: userEmailEdit,
            direccion: userDirecEdit,
            tel: userTelEdit
        }

        await updateDoc(doc(db, "users", userUid), data);

        setModalVisible(!modalVisible)
    }
        
    return (
        <View style={styles.VistaPrincipal}>
            <View style={styles.divPerfil}>
                <Avatar style={styles.avatar} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/proyectopc-ed74f.appspot.com/o/userpic.jpg?alt=media&token=758620bf-a028-4e83-874a-4da997a0f100" }} > </Avatar>
                <Spacer height={2} />
                <Text style={styles.datoprin}> {userName}</Text>
                <Text style={styles.datossec}> {userEmail} </Text>
                <Text style={styles.datossec}> {userTel} </Text>
                <Text style={styles.datossec}> {userDirec} </Text>
                <Spacer height={2} />
                <Button style={styles.btnEditPerf} onPress={() => setModalVisible(true)}> Editar perfil </Button>
            </View>
            <View style={styles.divConfigs}>
                <View style={styles.divNotis}>
                    <View style={styles.divEncabe}>
                        <Text style={styles.textEncabe}> NOTIFICACIONES </Text>
                    </View>
                    <View style={styles.divSecc}>
                        <Text style={styles.textSecc}> Publicaciones </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={{ width: '10px', height: '17px' }}
                        />
                    </View>
                    <View style={styles.divSecc}>
                        <Box style={{ width: '100%', height: '3px', backgroundColor: '#E9EDEE', padding: '10' }}></Box>
                    </View>
                    <View style={styles.divSecc}>
                        <Text style={styles.textSecc}> Recordatorios </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch2}
                            value={isEnabled2}
                            style={{ width: '10px', height: '17px' }}
                        />
                    </View>
                </View>
                <Spacer height={1} />
                <View style={styles.divNotis}>
                    <View style={styles.divEncabe}>
                        <Text style={styles.textEncabe}> TÉRMINOS Y CONDICIONES </Text>
                    </View>
                    <View style={styles.divSecc}>
                        <Text style={styles.textSecc}> Avisos de privacidad </Text>
                    </View>
                    <View style={styles.divSecc}>
                        <Box style={{ width: '100%', height: '3px', backgroundColor: '#E9EDEE', padding: '10' }}></Box>
                    </View>
                </View>
                <Spacer height={1} />
                <View style={styles.divNotis}>
                    <View style={styles.divEncabe}>
                        <Text style={styles.textEncabe}> SESIÓN </Text>
                    </View>
                    <View style={styles.divSecc}>
                        <TouchableOpacity onPress={() => navigation.navigate('')}>
                            <Text style={styles.textSecc}> Cerrar Sesión </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divSecc}>
                        <Box style={{ width: '100%', height: '3px', backgroundColor: '#E9EDEE', padding: '10' }}></Box>
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.tituloModal}>Editando datos</Text>
                        <Image style={styles.fotoperfil} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/proyectopc-ed74f.appspot.com/o/userpic.jpg?alt=media&token=758620bf-a028-4e83-874a-4da997a0f100" }} />
                        <FormControl mb="2" mt="5">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Nombre</Text>
                            <Input variant="underlined" w={'90%'} onChangeText={(text) => setUserNameEdit(text)} value={userNameEdit} />
                        </FormControl>
                        <FormControl mb="2">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Email</Text>
                            <Input variant="underlined" w={'90%'} onChangeText={(text) => setUserEmailEdit(text)} value={userEmailEdit} />
                        </FormControl>
                        <FormControl mb="2">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Dirección</Text>
                            <Input variant="underlined" w={'90%'} onChangeText={(text) => setUserDirecEdit(text)} value={userDirecEdit} />
                        </FormControl>
                        <FormControl mb="5">
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Teléfono</Text>
                            <Input variant="underlined" w={'90%'} onChangeText={(text) => setUserTelEdit(text)} value={userTelEdit} />
                        </FormControl>
                        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
                            <Button style={styles.btnGuardar} _text={{ color: "white" }} onPress={() => updateUserData()}> Guardar  </Button>
                            <Button style={styles.btnCancelar} _text={{ color: "#1AB28E" }} onPress={() => setModalVisible(!modalVisible)}> Cancelar  </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ConfigScreen;

const styles = StyleSheet.create({
    VistaPrincipal: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    divPerfil: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'column',
    },
    avatar: {
        width: '70px',
        height: '70px',
    },
    datoprin: {
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#323232'
    },
    datossec: {
        fontSize: '10px',
        color: '#6E6F6F',
        fontWeight: '400'
    },
    btnEditPerf: {
        backgroundColor: "#1AB28E",
        color: 'blue',
        borderRadius: '20px',
        height: '30px',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignContent: 'center'
    },

    divConfigs: {
        padding: 10,

    },
    divEncabe: {
        width: '100%',
        height: '25px',
        padding: 5,
        backgroundColor: '#F1F1F1',
        borderRadius: '3px',

    },
    textEncabe: {
        color: '#6E6F6F',
        fontWeight: '600',
        fontSize: '10px'
    },
    divSecc: {
        padding: 5,
        fontSize: '10px',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    divNotis: {
        flexDirection: 'column',
    },
    textSecc: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#323232'

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
        textAlign: 'center',
        fontWeight: '500',
        color: '#1AB28E',

    },
    fotoperfil: {
        width: '110px', height: '110px', borderRadius: 5

    }


});