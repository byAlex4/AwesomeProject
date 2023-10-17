import * as React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Box, Text, NativeBaseProvider, ScrollView, Spacer, Avatar,Pressable } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatScreen = ({navigation}) => {
    const [busqueda, onChangeBusqueda] = React.useState('');
    return (
        <View style={styles.VistaPrincipal}>
            <View style={styles.divChat}>
                <Spacer height={5} />
                <View style={styles.divSearch}>
                    <Ionicons name="search-outline" color="#6E6F6F" size='20px' />
                    <TextInput style={styles.input} onChangeText={onChangeBusqueda} value={busqueda} placeholder="Buscar" />
                </View>
                <Spacer height={5} />
                
                
                <Pressable style={styles.divchatcontainer} onPress={() => navigation.navigate('ChatDoc')}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Avatar style={styles.avatar} source={{uri:"https://firebasestorage.googleapis.com/v0/b/proyectopc-ed74f.appspot.com/o/vet1.jpeg?alt=media&token=39624eb8-e6d3-4d84-96ef-1bd9f3ec5998"}} > </Avatar>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.textName}>Dra. Dulce Castillo </Text>
                            <Text style={styles.textMsj}>Hola, buenas tardes. </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end',marginRight:5 }}>
                        <Text style={styles.textHr}>3:20pm </Text>
                        <Box style={styles.CirculoNoti}>
                            <Text style={{ color: 'white', fontSize: '10px' }}> 1 </Text>
                        </Box>
                    </View>
                </Pressable>
                
                <Spacer height={3} />
                <View style={styles.divchatcontainer}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Avatar style={styles.avatar} source={{uri:"https://firebasestorage.googleapis.com/v0/b/proyectopc-ed74f.appspot.com/o/vet2.jfif?alt=media&token=65f25a27-ab6d-4a2a-9320-d3173ade5433"}}> </Avatar>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.textName}>Dr. Michi </Text>
                            <Text style={styles.textMsj}>Le dejo las indicaciones. </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end',marginRight:5 }}>
                        <Text style={styles.textHr}>3:20pm </Text>
                        <Box style={styles.CirculoNoti}>
                            <Text style={{ color: 'white', fontSize: '10px' }}> 3 </Text>
                        </Box>
                    </View>
                </View>
            </View>
        </View>

    );
}
export default ChatScreen;

const styles = StyleSheet.create({

    VistaPrincipal: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',

    },
    divChat: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        height: 20,
        width: '80%',
        color: '#6E6F6F',
        marginLeft: 5
    },
    divSearch: {
        flexDirection: 'row',
        borderRadius: '20px',
        backgroundColor: '#F6F6F6',
        height: '30px',
        width: '80%',
        paddingLeft: 10,
        paddingTop: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    divchatcontainer: {
        flexDirection: 'row',
        borderRadius: '10px',
        backgroundColor: '#F6F6F6',
        width: '90%',
        height: '60px',
        padding: 8,
        justifyContent: 'space-between',
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
        width: '40px',
        height: '40px',
    },
    textName: {
        fontWeight: '700',
        fontSize: '15px'
    },
    textMsj: {
        fontWeight: '500',
        color: '#6E6F6F',
        fontSize: '13px'
    },
    textHr: {
        fontSize: '10px', fontWeight: '500', color: '#6E6F6F',
    },
    CirculoNoti: {
        width: '20px', height: '20px', borderRadius: '20px', backgroundColor: '#1AB28E', alignItems: 'center', justifyContent: 'center'
    }

});