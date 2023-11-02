import React, { useState, useEffect } from 'react';
import {
    Center,
    Input,
    CheckIcon,
    View,
    VStack,
    HStack,
    Box,
    Text,
    Image,
    Select,
    FormControl,
    TextArea,
    Button
}
    from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from "expo-image-picker";


const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
};

const CrearReceta = async ({ props }) => {
    const navigation = useNavigation();
    const [service, setService] = React.useState("");
    return <Center w={"90%"} ml={"5%"}>
        <Box w={"95%"} bg={"white"} rounded={'xl'} p={"5%"}>
            <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Nueva receta</Text>
            <HStack w={"95%"} space={2}>
                <TouchableOpacity>
                        <Image source={{
                            uri: "https://i.postimg.cc/VLQdNJPY/default-user-icon-4.jpg"
                    }} alt="Txt" size="lg" style={{ width: '120px', marginTop: '15px' }} resizeMode="contain"
                        onPress={pickImage} />
                </TouchableOpacity>
                <VStack space={1} w={'60%'}>
                    <FormControl>
                        <FormControl.Label fontSize={'xs'} >Nombre:</FormControl.Label>
                        <Input size="xs" placeholder="Arroz con leche" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label fontSize={'xs'} >Categoria:</FormControl.Label>
                        <Select selectedValue={service} accessibilityLabel="Choose Service" placeholder="Elige una categoria" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} ml={1} onValueChange={itemValue => setService(itemValue)}>
                            <Select.Item label="Mexicana" value="1" />
                            <Select.Item label="Rapida" value="2" />
                            <Select.Item label="Postre" value="3" />
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label >Tiempo estimado:</FormControl.Label>
                        <Input size="xs" placeholder="30 min aprox" />
                    </FormControl>
                </VStack>
            </HStack>
            <FormControl>
                <FormControl.Label >Descripcion:</FormControl.Label>
                <TextArea placeholder="Postre a base de arroz y leche"></TextArea>
            </FormControl>
            <FormControl>
                <FormControl.Label >Ingredientes:</FormControl.Label>
                <TextArea placeholder="-1Kg de arroz..."></TextArea>
            </FormControl>
            <FormControl>
                <FormControl.Label >Pasos:</FormControl.Label>
                <TextArea placeholder="1. Limpie el arroz..."></TextArea>
            </FormControl>

            <HStack mt={8}  space={1}>
                <Button style={{ backgroundColor: "#483285", width: '50%' }}
                    onPress={() => navigation.navigate('Nav')} >Gurdar</Button>
                <Button style={{ backgroundColor: "#cacaca", width: '50%' }}
                    onPress={() => navigation.goBack()}>Cancelar</Button>
            </HStack>
        </Box>
    </Center>;
}

export default function ({ props }) {
    return (
        <View minH={"100%"} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <CrearReceta />
        </View>
    );
};
