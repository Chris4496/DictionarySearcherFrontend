import {
  Center,
  VStack,
  StackDivider,
  Heading,
  Divider,
  Stack,
  SkeletonText,
  Link,
  Container,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { useState, useEffect } from 'react';

import Entry from './Entry.jsx';

export default function DisplayEntries(props) {
  const [loading, setloading] = useState(true);
  const [entries, setEntries] = useState();
  const [noresult, setnoresult] = useState(false);

  useEffect(() => {
    setloading(true);

    const word = props.word;
    const dict = props.dict;
    if (word === '') {
      setnoresult(true);
      setloading(false);
      return 0;
    }

    const url = `https://fastapi-backend-kubygcfq3a-ue.a.run.app/${dict['name']}/?search=${word}`;

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
  }, [props.word, props.dict]);

  return (
    <div id={props.dict.name}>
      {loading ? (
        <Center>
          <Stack w={1250} pt={40} px={6}>
            <SkeletonText noOfLines={18} spacing="6" />
          </Stack>
        </Center>
      ) : (
        <div>
          {noresult ? (
            <div>
              <Center p={10}>
                <Heading fontSize={{ base: '2xl', lg: '3xl' }}>
                  Result from{' '}
                  {props.dict.name[0].toUpperCase() + props.dict.name.slice(1)}{' '}
                  Dictionary
                </Heading>
              </Center>
              <Divider orientation="horizontal" borderColor="grey.200" />
              <Center p="10">
                <Heading>No Result</Heading>
              </Center>
            </div>
          ) : (
            <div>
              <Center p={10}>
                <Heading fontSize={{ base: '2xl', lg: '3xl' }}>
                  Result from{' '}
                  {props.dict.name[0].toUpperCase() + props.dict.name.slice(1)}{' '}
                  Dictionary
                </Heading>
              </Center>
              <Divider orientation="horizontal" borderColor="grey.200" />
              <Center>
                <VStack
                  divider={<StackDivider orientation="horizontal" />}
                  spacing={4}
                  align="stretch"
                  w={1100}
                  minW="100%"
                  maxW={1100}
                  p={{ base: '5', lg: '10' }}
                >
                  {entries.map(entry => (
                    <Entry key={entry.id} content={entry} />
                  ))}
                </VStack>
              </Center>
              <Center>
                <Container maxW={1000} mb="6">
                  <Link
                    href={props.dict.searchQuery + props.word}
                    color="blue.500"
                    isExternal
                  >
                    Link to Dictionary <ExternalLinkIcon mx="2px" />
                  </Link>
                </Container>
              </Center>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
