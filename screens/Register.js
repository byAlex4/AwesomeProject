import * as React from "react";
import {
  Box,
  Text,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  View,
  Image,
  Link,
  Icon
} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import firebase from "../backend/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const Register = () => {
  const navigation = useNavigation();
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);

  let regex_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  let re = /^[A-Z][a-z0-9_-]{8,32}$/

  const digit = /[0-9]/
  const upperCase = /[A-Z]/
  const lowerCase = /[a-z]/
  const nonAlphanumeric = /[^0-9A-Za-z]/

  const isStrongPassword = (password) =>
    [digit, upperCase, lowerCase, nonAlphanumeric].every((re) => re.test(password))
    && password.length >= 8
    && password.length <= 32

  const saveUser = async (user) => {
    try {
      const data = {
        img: 'https://i.postimg.cc/VLQdNJPY/default-user-icon-4.jpg',
        name: formData.name,
        email: formData.email,
        password: formData.password,
        tel: "",
        desc: ""
      }
      await setDoc(doc(firebase.db, 'users', user), data);
    } catch (errors) {
      console.error("Error adding document: ", errors);
    }
  }

  var user = '';

  const createUser = (correo, contra) => {
    createUserWithEmailAndPassword(firebase.auth, correo, contra)
      .then((userCredential) => {
        setIsOpen(true)
        console.log('Account added');
        var user = userCredential.user;
        saveUser(user.uid)

      })
      .catch((error) => {
        console.log("Error:" + errors);
      });
  }

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log('Account added');
        const token = credential.accessToken;
        const user = result.user;
        try {
          const data = {
            img: user.photoURL,
            name: user.displayName,
            email: user.email,
            password: token,
            tel: "",
            desc: ""
          }
          await setDoc(doc(firebase.db, 'users', user.uid), data);
        } catch (errors) {
          console.error("Error adding document: ", errors);
        }
        navigation.navigate('Nav', { uid: user.uid });
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  const signInFacebook = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        navigation.navigate('Nav', { uid: user.uid })
      })
      .catch((error) => {
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  }

  const validate = () => {
    if (formData.name == undefined) {
      setErrors({
        ...errors,
        name: "Ingrese el nombre"
      });
      return false;
    }
    if (regex_email.test(formData.email) == false) {
      setErrors({
        ...errors,
        email: "Correo invalido"
      });
      return false;
    } else if (formData.email == undefined) {
      setErrors({
        ...errors,
        email: "Ingrese un correo"
      });
      return false;
    }
    if (isStrongPassword(formData.password) == false) {
      setErrors({
        ...errors,
        password: "Contraseña invalida"
      });
      return false;
    } else if (formData.password == undefined) {
      setErrors({
        ...errors,
        password: "Ingrese una constraseña"
      });
      return false;
    }
    if (formData.repassword === undefined) {
      setErrors({
        ...errors,
        repassword: "Confirme la contraseña"
      });
      return false;

    } else if (formData.repassword != formData.password) {
      setErrors({
        ...errors,
        repassword: "Las contraseñas no coinciden"
      });
      return false;
    }
    createUser(formData.email, formData.password);
    return true;
  };

  const onSubmit = () => {
    validate() ? navigation.navigate('Nav', { uid: user.uid }) : console.log("Validation Failed", errors);
  };


  return (
    <Center minH={'100%'}>
      <Image source={{
        uri: "https://i.postimg.cc/132whPYJ/pollo.png"
      }} alt="Chef" size="2xl" style={{ width: '65%' }} resizeMode="center" />
      <Image source={{
        uri: "https://i.postimg.cc/7Yhm3xfr/Sing-up.png"
      }} alt="Txt" size="lg" mt={-15} style={{ width: '65%' }} resizeMode="contain" />
      <Box p="8" minW="100%" bottom={0} mt={'auto'} bg={"white"} roundedTopLeft={25} roundedTopRight={25}>
        <Center w={"80%"} ml={"10%"}>
          <VStack minW={"100%"} >
            <FormControl isRequired isInvalid={'name' in errors}>
              <FormControl.Label><Text fontSize={"lg"}>Nombre completo</Text></FormControl.Label>
              <Input variant="rounded" placeholder="Maria Jose"
                onChangeText={value => setData({
                  ...formData,
                  name: value
                })} bg={"white"} minW={"100%"} fontSize={"lg"} />
              {'name' in errors ?
                <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage> : ""
              }
            </FormControl>
            <FormControl isRequired isInvalid={'email' in errors}>
              <FormControl.Label color={"white"}> <Text fontSize={"lg"}>Correo electronico</Text></FormControl.Label>
              <Input variant="rounded" placeholder="example@email.com"
                onChangeText={value => setData({
                  ...formData,
                  email: value
                })} bg={"white"} minW={"100%"} fontSize={"lg"} />
              {'email' in errors ?
                <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage> : ""
              }
            </FormControl>
            <FormControl isRequired isInvalid={'password' in errors}>
              <FormControl.Label><Text fontSize={"lg"}>Constraseña</Text></FormControl.Label>
              <Input variant="rounded" placeholder="********" type="password"
                onChangeText={value => setData({
                  ...formData,
                  password: value
                })} bg={"white"} minW={"100%"} fontSize={"lg"} />
              {'password' in errors ?
                <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage> : ""
              }
            </FormControl>
            <FormControl isRequired isInvalid={'repassword' in errors}>
              <FormControl.Label><Text fontSize={"lg"}>Confirmar contraseña</Text></FormControl.Label>
              <Input variant="rounded" placeholder="********" type="password"
                onChangeText={value => setData({
                  ...formData,
                  repassword: value
                })} bg={"white"} minW={"100%"} fontSize={"lg"} />
              {'repassword' in errors ?
                <FormControl.ErrorMessage>{errors.repassword}</FormControl.ErrorMessage> : ""
              }
            </FormControl>
            <Button title="Sign" onPress={onSubmit} size="lg" mt="4" colorScheme="indigo" borderRadius="full">
              Registrarse
            </Button>
            <VStack mt="2">
              <HStack justifyContent="center">
                <Text fontSize="md" color="warmGray.500" _dark={{
                  color: "warmGray.500"
                }}>
                  o
                </Text>
              </HStack>
              <HStack justifyContent="center" mt="1" space={4}>
                <Link variant={"link"} onPress={signInGoogle}><Icon as={<AntDesign name="google" />} size={30}></Icon></Link>
              </HStack>
            </VStack>
          </VStack>
        </Center>
      </Box>
    </Center >
  )
};


export default function ({ porps }) {
  return (
    <View minH={"100%"} minW={"100%"} bg={"#4b2ba0"} pt={"5%"} >
      <Register />
    </View>
  )
};