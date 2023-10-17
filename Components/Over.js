import React from "react";
import { Modal, FormControl, HStack, Center, NativeBaseProvider, Popover, Button, Input, Box, Tooltip } from "native-base";

function State() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return <>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input ref={initialRef} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button title="cancel" variant="ghost" colorScheme="blueGray" onPress={() => {
              setModalVisible(false);
            }}>
                Cancel
              </Button>
              <Button title="save" onPress={() => {
              setModalVisible(false);
            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <HStack space="4" justifyContent="center" alignItems="center">
        <Button title="abrir" onPress={() => {
        setModalVisible(!modalVisible);
      }}>
          Abrir modal
        </Button>
      </HStack>
    </>;
}

function Pop() {
  const initialFocusRef = React.useRef(null);
  return <Box w="100%" alignItems="center" mt={5}>
      <Popover initialFocusRef={initialFocusRef} trigger={triggerProps => {
      return <Button {...triggerProps}>Iniciar sesion</Button>;
    }}>
        <Popover.Content width="56">
          <Popover.Arrow />
          <Popover.CloseButton />
          {
          /* @ts-ignore */
        }
          <Popover.Header>Ingresa tus datos</Popover.Header>
          <Popover.Body>
            <FormControl>
              <FormControl.Label _text={{
              fontSize: "xs",
              fontWeight: "medium"
            }}>
                Correo Electronico
              </FormControl.Label>
              <Input rounded="sm" fontSize="xs" ref={initialFocusRef} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label _text={{
              fontSize: "xs",
              fontWeight: "medium"
            }}>
                Constraseña
              </FormControl.Label>
              <Input rounded="sm" fontSize="xs" />
            </FormControl>
          </Popover.Body>
          <Popover.Footer>
            <Button.Group>
              <Button colorScheme="coolGray" variant="ghost">
                Cancelar
              </Button>
              <Button title="iniciar">Inicar sesion</Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>;
}

function Tip() {
  return <Center mt={5}>
      <Tooltip label="Click here to read more" openDelay={500}>
        <Button>More</Button>
      </Tooltip>
    </Center>;
}

    export default () => {
        return (
          <NativeBaseProvider>
            <Center>
                <State />
                <Pop/>
                <Tip/>
            </Center>
          </NativeBaseProvider>
        );
    };
    