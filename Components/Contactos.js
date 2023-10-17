import React from 'react';
import { NativeBaseProvider, FormControl, Center, Input, Icon, View, VStack, Box, HStack, Text, Image } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

function Contacto({ props }) {
    const navigation = useNavigation();
    return <Center w={"80%"} ml={"10%"}>
        <FormControl>
            <Input variant="rounded" bg={"gray"} minW={"100%"} fontSize={"lg"}
                InputLeftElement={<Icon as={<AntDesign name="search1" size={24} color="black" />} ml="5"></Icon>}
                placeholder="Buscar una receta"
                InputRightElement={<Icon as={<AntDesign name="filter" size={24} color="black" />} mr="5"></Icon>} />
        </FormControl>
        <VStack>
            <Text>Recomendaciones</Text>
            <Box bg={'muted.300'}>
                <Center>
                    <Box bg={'#ffff'}>
                        <HStack>
                            <Image source={{
                                uri: "https://i.postimg.cc/d1V71MPQ/Desayono.jpg"
                            }} alt="Alternate Text" size="xl"></Image>
                            <VStack>
                                <HStack>
                                    <Text>Desayuno</Text>
                                </HStack>
                                <Text>Por: Alejandro</Text>
                            </VStack>
                        </HStack>
                    </Box>
                </Center>
            </Box>
        </VStack>
    </Center>;
}

export default function ({ props }) {
    return (
        <View minH={"100%"} minW={"100%"} pt={"15%"} >
            <Contacto />
        </View>
    );
};
