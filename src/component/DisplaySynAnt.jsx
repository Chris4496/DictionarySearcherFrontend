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

import React from 'react';
import { useState, useEffect } from 'react';

import SynAnt from './SynAnt';

export default function DisplaySynAnt(props) {
  const [loading, setloading] = useState(true);
  const [noresult, setnoresult] = useState(false);
  const [synant, setSynAnt] = useState([]);

  useEffect(() => {
    setloading(true);

    if (props.word === '') {
      setnoresult(true);
      setloading(false);
      return 0;
    }

    const url = `https://fastapi-backend-kubygcfq3a-ue.a.run.app/synonyms_and_antonyms/?search=${props.word}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (json['response'] === 'No result') {
          console.log('invalid word');
          setnoresult(true);
          setloading(false);
          return 0;
        }
        setnoresult(false);
        setSynAnt(json);
        setloading(false);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, [props.word]);

  return (
    <div id="SynAnt">
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
                  Synonyms and antonyms from thesaurus.com
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
                  Synonyms and antonyms from thesaurus.com
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
                  {synant.map(s => (
                    <SynAnt content={s} key={s.definition} />
                  ))}
                </VStack>
              </Center>
              <Center>
                <Container maxW={1000} mb="6">
                  <Link
                    href={'https://www.thesaurus.com/browse/' + props.word}
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
