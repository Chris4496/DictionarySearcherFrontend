import {
  Input,
  Center,
  IconButton,
  Heading,
  Box,
  HStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useCookies } from 'react-cookie';

import CustomizePopup from './CustomizePopup';
import DisplayEntries from './DisplayEntries';
import DisplaySynAnt from './DisplaySynAnt';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton';
import NavBar from './NavBar';

export default function HomePage() {
  let params = useParams();
  let navigate = useNavigate('');

  const valueref = useRef('');

  const [value, setvalue] = useState(params.word);
  const [cookies, setCookie] = useCookies(['Layout_Preference']);
  const [dictList, setdictList] = useState(cookies.Layout_Preference || []);

  function searchWord() {
    const word = valueref.current;
    setvalue(word.value);
    navigate(`/search/${valueref.current.value}`);
  }

  function searchWordEnter(e) {
    if (e.key === 'Enter') {
      searchWord();
    }
  }

  useEffect(() => {
    const url = 'https://fastapi-backend-kubygcfq3a-ue.a.run.app/';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setdictList(json);
        // setdictList([
        //   {
        //     "name": "cambridge",
        //     "searchQuery": "https://dictionary.cambridge.org/dictionary/english/"
        //   },
        //   {
        //     "name": "oxford",
        //     "searchQuery": "https://www.oxfordlearnersdictionaries.com/definition/english/"
        //   },
        //   {
        //     "name": "merriamwebster",
        //     "searchQuery": "https://www.merriam-webster.com/dictionary/"
        //   }
        // ]);
      } catch (error) {
        console.log('error', error);
      }
    };
    if (dictList.length === 0) {
      fetchData();
    }
  }, [dictList]);

  return (
    <Box>
      <HStack my={3} mx={1}>
        <ColorModeSwitcher></ColorModeSwitcher>
        <CustomizePopup
          setdictList={setdictList}
          setCookie={setCookie}
          dictList={dictList}
        />
      </HStack>
      <Center>
        <Heading fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
          Search a word and get results from multiple dictionaries
        </Heading>
      </Center>
      <Center>
        <Input
          placeholder="Search here.."
          autocomplete="off"
          size="lg"
          maxWidth={1200}
          m={3}
          type="text"
          name="textvalue"
          onKeyDown={searchWordEnter}
          ref={valueref}
          boxShadow="lg"
        />
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          mr={3}
          onClick={searchWord}
        />
      </Center>
      <Center maxWidth={1200} m="auto">
        <NavBar dictList={dictList} />
      </Center>
      {dictList.map(dict => (
        <DisplayEntries word={value} dict={dict} key={dict.name} />
      ))}
      <DisplaySynAnt word={value} />
      <Footer />
      <BackToTopButton />
    </Box>
  );
}
