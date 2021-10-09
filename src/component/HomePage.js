import { Input, Spinner, Center, IconButton } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import DisplayEntries from './DisplayEntries';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

export default function HomePage() {
  const valueref = useRef();

  const [value, setvalue] = useState();
  const [dictList, setdictList] = useState([]);

  function searchWord() {
    const word = valueref.current;
    console.log(word.value);
    setvalue(word.value);
  }

  useEffect(() => {
    const url = 'http://fastapi-backend-kubygcfq3a-ue.a.run.app/';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setdictList(json);
        // setdictList(['cambridge', 'cambridge', 'cambridge']);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Center>
        <Heading fontSize="3xl">
          Search a word and get results form multiple dictionaries
        </Heading>
      </Center>
      <Center>
        <Input
          placeholder="Search here.."
          size="lg"
          maxWidth={1200}
          m={3}
          type="text"
          name="textvalue"
          ref={valueref}
        />
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          mr={3}
          onClick={searchWord}
        />
      </Center>
      {dictList.map(dict => (
        <DisplayEntries word={value} dict={dict} />
      ))}
    </div>
  );
}
