import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  getFirestore,
  doc
} from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../configfb";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [mail, setMail] = useState("");

  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app);
  const auth = getAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={() => navigation.navigate('ChatScreen')}
        >
          <AntDesign
            name="logout"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    onAuthStateChanged(auth, (user) => {
      onSnapshot(doc(database, "users", user.uid), (doc) => {
        if (doc.data() !== undefined) {
          setMail(doc.data().email);
        }
      });
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      textInputStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
      user={{
        _id: mail,
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/proyectopc-ed74f.appspot.com/o/mascpic.jpg?alt=media&token=0b07449e-215e-4e1d-a6f5-4cea516670b6",
      }}
    />
  );
}
