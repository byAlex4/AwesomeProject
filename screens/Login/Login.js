import React, { useState } from 'react';
import { StyleSheet, View,Alert} from 'react-native';
import { Text, NativeBaseProvider,FormControl,Button,Input,} from "native-base";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../configfb';

const Login = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [passw, setPassw] = React.useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleSigIn = () => {

        navigation.navigate('App'); // Quitar esto en producción

        signInWithEmailAndPassword(auth,email,passw)
        .then((userCredential) => {
            console.log('Sesión iniciada')
            const user = userCredential.user;
            console.log(user)
            // navigation.navigate('App');
        })
        .catch((error) => {
            console.log("Error:" + error);
            alert("Error:" + error);
            Alert.alert(error)
          });
    }

    return (
        <View style={styles.VistaPrincipal}>
            <View style={{width:'100%',height:'auto',flexDirection:'row',justifyContent:'space-between',paddingLeft:10}}>
                <View style={{paddingTop:20}}>
                    <Text style={{fontSize:'30px',fontWeight:'600',color:'#1AB28E'}}> Login </Text>
                </View>
                <View style={{backgroundColor:'#1AB28E',width:'10%',height:'100%',borderBottomStartRadius:100}}>                    
                </View>
            </View>
            <View style={{flexDirection:'column',paddingLeft:20,paddingTop:60,width:'90%'}}>
                <FormControl mb="4" isRequired>
                    <Text style={{fontSize:'10px',fontWeight:'500',color:'#A5A5A5'}}>Email</Text>
                    <Input variant="underlined" style={styles.input} onChangeText={(text) => setEmail(text)} placeholder="Your email" isRequired />
                </FormControl>
                <FormControl mb="4" isRequired>
                    <Text style={{fontSize:'10px',fontWeight:'500',color:'#A5A5A5'}}>Password</Text>
                    <Input type='password' variant="underlined" style={styles.input} onChangeText={(text) => setPassw(text)} placeholder="Your password" isRequired />
                </FormControl>
            </View>
            <View style={styles.divBtns}>
                <Button style={styles.btnLog} _text={{ color: "white",fontSize:'15px',fontWeight:500 }} onPress={handleSigIn}> Login  </Button>
                <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
                    <Text style={{color:'#1AB28E',fontWeight:'bold'}}> or </Text>
                </View>
                <Button style={styles.btnReg} _text={{ color: "#1AB28E",fontSize:'15px',fontWeight:500  }} onPress={() => navigation.navigate('Register')}> Register  </Button>  
            </View>
            
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({

    VistaPrincipal: { height: '100%', width: '100%', backgroundColor: 'white', flexDirection:'column'
    },
    divBtns: {
        flexDirection:'column',alignItems:'center',width:'100%',paddingTop:60
    }, 
    btnLog: {
        backgroundColor: "#1AB28E",
        borderRadius: 5,
        height: '40px',
        width:'60%',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnReg: {
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: '#1AB28E',
        borderRadius: 5,
        height: '40px',
        width:'60%',
        fontWeight: 'bold',
        textAlign: 'center'
    },
})