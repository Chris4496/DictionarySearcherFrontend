import { Helmet } from 'react-helmet';
import { ChakraProvider, theme } from '@chakra-ui/react';

import HomePage from './component/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Helmet>
          <html lang="en" />
          <title>Dictionary Searcher</title>
        </Helmet>
        <Routes>
          <Route path="search/:word" element={<HomePage />} />
          <Route path="/search/" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
}
