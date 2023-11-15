import * as React from "react";
import {
    Box,
    Text,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Center,
    View,
    Image,
    Pressable,
    Icon
} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import firebase from "./../backend/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";


const Login = () => {
    const navigation = useNavigation();
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    let regex_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let re = /^[A-Z][a-z0-9_-]{8,32}$/

    const digit = /[0-9]/
    const upperCase = /[A-Z]/
    const lowerCase = /[a-z]/
    const nonAlphanumeric = /[^0-9A-Za-z]/

    var user = '';

    const isStrongPassword = (password) =>
        [digit, upperCase, lowerCase, nonAlphanumeric].every((re) => re.test(password))
        && password.length >= 8
        && password.length <= 32

    const validate = () => {
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
        signInWithEmailAndPassword(firebase.auth, formData.email, formData.password)
            .then((userCredential) => {
                user = userCredential.user;
                console.log('Sesión iniciada', user);
                navigation.navigate('Nav', { uid: user.uid });
                return true;
            })
            .catch((errors) => {
                console.log("Error:" + errors);
                setErrors({
                    ...errors
                });
                return false;
            });
        return true;
    };

    const onSubmit = () => {
        validate() ? navigation.navigate('Nav', { user }) : console.log("Validation Failed", errors, formData.email, formData.password);
    };

    const signInGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                navigation.navigate('Nav', { uid: user.uid });
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const signInFacebook = () => {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                navigation.navigate('Nav', { user })
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });

    }

    return (
        <Center>
            <Image source={{
                uri: "https://i.postimg.cc/CK8Dwt3Y/sombrero.png"
            }} alt="Chef" size="2xl" style={{ width: 450 }} resizeMode="center" />
            <Image source={{
                uri: "https://i.postimg.cc/MTgfg8Z1/Log-In.png"
            }} alt="Txt" size="lg" mt={-15} style={{ width: 300 }} resizeMode="contain" />
            <Box p="8" minW="100%" bottom={0} mt={'15%'} bg={"white"} roundedTopLeft={25} roundedTopRight={25}>
                <Center w={"80%"} ml={"10%"}>
                    <VStack minW={"100%"} >
                        <FormControl isRequired isInvalid={'email' in errors}>
                            <FormControl.Label color={"white"}> <Text fontSize={"lg"}>Correo electronico</Text></FormControl.Label>
                            <Input variant="rounded"
                                onChangeText={value => setData({
                                    ...formData,
                                    email: value
                                })} bg={"white"} minW={"100%"} fontSize={"lg"}
                                InputLeftElement={<Icon as={<AntDesign name="user" size={24} color="black" />} ml="5"></Icon>} placeholder="example@email.com" />
                            {'email' in errors ?
                                <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage> : " "
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
                            <Link _text={{
                                fontSize: "sm",
                                fontWeight: "600",
                                color: "indigo.500"
                            }} href="#" alignSelf="flex-end">
                                Olvidaste la contraseña?
                            </Link>
                        </FormControl>
                        <Button title="Sign" onPress={onSubmit} size="lg" mt="10" colorScheme="indigo" borderRadius="full">
                            Iniciar sesión
                        </Button>
                        <VStack mt="6">
                            <HStack justifyContent="center">
                                <Text fontSize="md" color="warmGray.500" _dark={{
                                    color: "warmGray.500"
                                }}>
                                    o
                                </Text>
                            </HStack>
                            <HStack justifyContent="center" space={4} maxH={"40px"}>
                                <Link variant={"link"} onPress={signInGoogle}><Icon as={<AntDesign name="google" />} size={30}></Icon></Link>
                                <Link variant={"link"} onPress={signInFacebook}><Icon as={<AntDesign name="facebook-square" />} size={30}></Icon></Link>
                                <Link variant={"link"} href="https://github.com/login"><Icon as={<AntDesign name="github" />} size={30}></Icon></Link>
                                <Link variant={"link"} href="https://appleid.apple.com/sign-in"><Icon as={<AntDesign name="apple1" />} size={30}></Icon></Link>
                            </HStack>
                            <HStack mt="6" justifyContent="center">
                                <Text fontSize="sm" color="warmGray.500" _dark={{
                                    color: "warmGray.500"
                                }}>
                                    Eres un usuario nuevo?{" "}
                                </Text>
                                <Pressable>
                                    <Link _text={{
                                        color: "indigo.500",
                                        fontWeight: "medium",
                                        fontSize: "md"
                                    }} onPress={() => navigation.navigate('Registro')}>Registrate</Link>
                                </Pressable>
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
            <Login />
        </View>
    )
};