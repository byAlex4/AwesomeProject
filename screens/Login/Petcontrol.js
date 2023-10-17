import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {Text, NativeBaseProvider, Button,Spacer, } from "native-base";

const Petcontrol = ( {navigation} ) => { 
    return (
        <View style={styles.VistaPrincipal}>
            <View style={{paddingTop:30,paddingBottom:40}}>
                <Text style={{fontSize:'40px',fontWeight:'bold',color:'#1AB28E',textAlign:'center'}}> PET </Text>
                <Text style={{fontSize:'50px',fontWeight:'bold',color:'#1AB28E',textAlign:'center'}}> CONTROL </Text>
            </View>
            <View style={styles.divBtns}>
                <Button style={styles.btnLog} _text={{ color: "white",fontSize:'20px',fontWeight:500 }} onPress={() => navigation.navigate('Login')} > Login  </Button>
                <Spacer height={5} />
                <Button style={styles.btnReg} _text={{ color: "#1AB28E",fontSize:'20px',fontWeight:500  }} onPress={() => navigation.navigate("Register")}> Register  </Button>  
            </View>
        </View> 
    )
}

export default Petcontrol;

const styles = StyleSheet.create({
    VistaPrincipal: { height: '100%', width: '100%', backgroundColor: 'white', flexDirection:'column',alignItems:'center',
    },
    divBtns: {
        flexDirection:'column',alignItems:'center',width:'100%'
    },  
    btnLog: {
        backgroundColor: "#1AB28E",
        borderRadius: 5,
        height: 'auto',
        width:'60%',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnReg: {
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: '#1AB28E',
        borderRadius: 5,
        height: 'auto',
        width:'60%',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});