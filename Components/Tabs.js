import * as React from "react";
import {StatusBar} from "native-base";
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


