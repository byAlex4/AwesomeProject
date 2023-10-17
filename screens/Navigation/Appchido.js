import React from 'react';
import { NativeBaseProvider } from "native-base";

import FooterNav from './FooterNav';

const Appchido = () => {
  return (
      <NativeBaseProvider>
        <FooterNav />
      </NativeBaseProvider>
  );
}

export default Appchido;
