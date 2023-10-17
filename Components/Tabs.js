import * as React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  StatusBar
} from "native-base";
import { useNavigation } from '@react-navigation/native';


const Logs = () => {
  const navigation = useNavigation();
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

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



  const validate = () => {
    if (regex_email.test(formData.email) == false) {
      console.log("El correo no es valido")
      setErrors({
        ...errors,
        email: "Correo invalido"
      });
      return false;
    } else if (formData.email == undefined) {
      console.log("Ingrese un correo")
      setErrors({
        ...errors,
        email: "Ingrese un correo"
      });
      return false;
    }
    if (isStrongPassword(formData.password) == false) {
      console.log("Contraseña invalida")
      setErrors({
        ...errors,
        password: "Contraseña invalida"
      });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate() ? navigation.navigate('Contacto') : console.log("Validation Failed", errors, formData.password);
  };

  return <Center>
    <Box p="2" py="8" w="90%" maxW="290" >
      <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
        Bienvenido
      </Heading>
      <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
        Inicia sesión!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl isRequired isInvalid={'email' in errors}>
          <FormControl.Label>Correo electronico</FormControl.Label>
          <Input placeholder="example@email"
            onChangeText={value => setData({
              ...formData,
              email: value
            })}
          />
          {'email' in errors ?
            <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage> : " "
          }
        </FormControl>
        <FormControl isRequired isInvalid={'password' in errors}>
          <FormControl.Label>Constraseña</FormControl.Label>
          <Input placeholder="*****" type="password"
            onChangeText={value => setData({
              ...formData,
              password: value
            })} />
          {'password' in errors ?
            <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
            :
            <FormControl.HelperText _text={{
              fontSize: 'xs'
            }}>
              La contraseña debe contener mas de 5 caracteres.
            </FormControl.HelperText>
          }
          <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} href="#" alignSelf="flex-end" mt="1">
            Olvidaste la contraseña?
          </Link>
        </FormControl>
        <Button title="Sign" onPress={onSubmit} mt="2" colorScheme="indigo">
          Iniciar sesión
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
            Eres un usuario nuevo?.{" "}
          </Text>
          <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} href="#">
            Registrate
          </Link>
        </HStack>
      </VStack>
    </Box>
  </Center>;
};

function Register({ props }) {
  return <Center>
    <Box p="2" w="90%" maxW="290" py="8">
      <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
        Bienvenido
      </Heading>
      <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
        Registrate para seguir!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Correo Electronico</FormControl.Label>
          <Input placeholder="example@email" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Constraseña</FormControl.Label>
          <Input type="password" placeholder="******" />
          <FormControl.HelperText _text={{
            fontSize: 'xs'
          }}>
            La contraseña debe contener mas de 5 caracteres.
          </FormControl.HelperText>
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirma tu contraseña</FormControl.Label>
          <Input type="password" placeholder="******" />
        </FormControl>
        <Button title="Up" mt="2" colorScheme="indigo">
          Sign up
        </Button>
      </VStack>
    </Box>
  </Center>;
};

import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <View >
    <Logs />
  </View>
);

const SecondRoute = () => (
  <View >
    <Register />
  </View>
);

const renderScene = SceneMap({
  login: FirstRoute,
  register: SecondRoute,
});

export default function Tabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'login', title: 'Iniciar sesión' },
    { key: 'register', title: 'Registro' },
  ]);

  return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ marginTop: StatusBar.currentHeight }}
      />
  );
}


