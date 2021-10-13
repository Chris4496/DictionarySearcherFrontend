import { Helmet } from 'react-helmet';
import { ChakraProvider, theme } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import HomePage from './component/HomePage';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <html lang="en" />
        <title>Dictionary Searcher</title>
      </Helmet>
      <ColorModeSwitcher></ColorModeSwitcher>
      <HomePage />
    </ChakraProvider>
  );
}
