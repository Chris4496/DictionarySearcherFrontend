import { Input, Center, IconButton } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState, useEffect, useRef } from 'react';
import DisplayEntries from './DisplayEntries';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Stack,
  Box,
  Text,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

export default function HomePage() {
  const valueref = useRef();

  const [value, setvalue] = useState();
  const [dictList, setdictList] = useState([]);

  function searchWord() {
    const word = valueref.current;
    console.log(word.value);
    setvalue(word.value);
  }

  function searchWordEnter(e) {
    if (e.key === 'Enter') {
      const word = valueref.current;
      console.log(word.value);
      setvalue(word.value);
    }
  }

  useEffect(() => {
    const url = 'https://fastapi-backend-kubygcfq3a-ue.a.run.app/';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
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
        {dictList.map(dict => (
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
    <div>
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
        <DisplayEntries word={value} dict={dict} />
      ))}
      <Box
        as="footer"
        role="contentinfo"
        mx="auto"
        maxW="7xl"
        py="12"
        px={{ base: '4', md: '8' }}
      >
        <Stack
          direction="row"
          spacing="4"
          align="center"
          justify="space-between"
        >
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} Chris K. All rights reserved.
          </Text>
          <IconButton
            as="a"
            href="https://github.com/Chris4496/DictionarySearcherFrontend"
            aria-label="GitHub"
            icon={<FaGithub fontSize="20px" />}
          />
        </Stack>
      </Box>
    </div>
  );
}
