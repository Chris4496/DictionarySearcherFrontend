import React, { useState, useEffect, forceUpdate } from 'react';
import {
  Input,
  Spinner,
  Center,
  IconButton,
  VStack,
  StackDivider,
  Heading,
  Box,
  Divider,
} from '@chakra-ui/react';
import Entry from './Entry.js';

export default function DisplayEntries(props) {
  const [loading, setloading] = useState(true);
  const [entries, setEntries] = useState();
  const [noresult, setnoresult] = useState(false);

  useEffect(() => {
    setloading(true);

    const word = props.word;
    const dict = props.dict;
    console.log(word);
    if (word === '') {
      setnoresult(true);
      setloading(false);
      return 0;
    }

    const url = `https://fastapi-backend-kubygcfq3a-ue.a.run.app/${dict}/?search=${word}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        // console.log(json);
        if (json['response'] === 'No result') {
          console.log('invalid word');
          setnoresult(true);
          setloading(false);
          return 0;
        }
        setnoresult(false);
        setEntries(json);
        setloading(false);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, [props.word]);

  // fetch('http://fastapi-backend-kubygcfq3a-ue.a.run.app/cambridge/?search=cock')
  //   .then(response => response.json())
  //   .then(data => {
  //     setEntries(data);
  //     setloading(false);
  //     console.log(data);
  //   });

  return (
    <div>
      {loading ? (
        <Center>
          <Spinner size="xl" p={10} m={10} thickness="7px" />
        </Center>
      ) : (
        <div>
          {noresult ? (
            <Center p="10">
              <Heading>No Result</Heading>
            </Center>
          ) : (
            <div>
              <Center maxWidth={1100} p={10}>
                <Heading>
                  Result from{' '}
                  {props.dict.charAt(0).toUpperCase() + props.dict.slice(1)}
                </Heading>
              </Center>
              <Divider orientation="horizontal" />
              <Center>
                <VStack
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing={4}
                  align="stretch"
                  w={1100}
                  p={10}
                >
                  {entries.map(entry => (
                    <Entry key={entry.id} content={entry} />
                  ))}
                </VStack>
              </Center>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
