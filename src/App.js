import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import HomePage from './component/HomePage';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher></ColorModeSwitcher>
      <HomePage />
    </ChakraProvider>
  );
}
