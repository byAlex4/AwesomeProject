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
import { doc, getDoc } from "firebase/firestore";
import firebase from "./../backend/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const navigation = useNavigation();
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const onSubmit = () => {
        signInWithEmailAndPassword(firebase.auth, formData.email, formData.password)
            .then((userCredential) => {
                console.log('Sesión iniciada');
                const user = userCredential.user;
                console.log(user);
                navigation.navigate('Nav');
            })
            .catch((errors) => {
                console.log("Error:" + errors);
            });
    };

    return (
        <Center>
            <Image source={{
                uri: "https://i.postimg.cc/CK8Dwt3Y/sombrero.png"
            }} alt="Chef" size="2xl" style={{ width: 450 }} resizeMode="center" />
            <Image source={{
                uri: "https://i.postimg.cc/MTgfg8Z1/Log-In.png"
            }} alt="Txt" size="lg" mt={-15} style={{ width: 300 }} resizeMode="contain" />
            <Box p="8" minW="100%" bottom={0} mt={"5%"} bg={"white"} roundedTopLeft={25} roundedTopRight={25}>
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
                                <Link variant={"link"} href="https://accounts.google.com/"><Icon as={<AntDesign name="google" />} size={30}></Icon></Link>
                                <Link variant={"link"} href="https://www.facebook.com/"><Icon as={<AntDesign name="facebook-square" />} size={30}></Icon></Link>
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