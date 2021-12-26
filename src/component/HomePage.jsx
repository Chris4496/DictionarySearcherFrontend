import {
  Input,
  Center,
  IconButton,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import DisplayEntries from './DisplayEntries';
import DisplaySynAnt from './DisplaySynAnt';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton';

export default function HomePage() {
  let params = useParams();
  let navigate = useNavigate('');

  const valueref = useRef('');

  const [value, setvalue] = useState(params.word);
  const [dictList, setdictList] = useState([]);

  function searchWord() {
    const word = valueref.current;
    setvalue(word.value);
    navigate(`/search/${valueref.current.value}`);
  }

  function searchWordEnter(e) {
    if (e.key === 'Enter') {
      const word = valueref.current;
      setvalue(word.value);
      navigate(`/search/${valueref.current.value}`);
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

    fetchData();
  }, []);

  function renderNav() {
    return (
      <Breadcrumb
        fontWeight="medium"
        fontSize="lg"
        borderRadius="xl"
        m="3"
        py="2"
        px="4"
        boxShadow="dark-lg"
      >
        {[...dictList, { name: 'SynAnt' }].map(dict => (
          <BreadcrumbItem key={dict.name}>
            <BreadcrumbLink href={`#${dict.name}`}>
              {dict.name[0].toUpperCase() + dict.name.slice(1)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    );
  }

  return (
    <Box>
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
        {renderNav()}
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
