import { Container, Heading, WrapItem } from '@chakra-ui/react';
import { Box, Text, Stack, Tag, Wrap, StackDivider } from '@chakra-ui/react';

export default function SynAnt(props) {
  const s = props.content;
  const definition = s.definition;
  const pos = s.pos;
  let synonyms = s.synonyms;
  let antonyms = s.antonyms;

  synonyms = Object.entries(synonyms).sort(
    (a, b) => Number(b[0]) - Number(a[0])
  );

  antonyms = Object.entries(antonyms);

  return (
    <Container maxW={1000} py="5">
      <Box py="1">
        <Heading fontSize={{ base: '22px', md: '27px', lg: '32px' }}>
          {definition}
        </Heading>
      </Box>
      <Box>
        <Text fontSize="md">{pos}</Text>
      </Box>
      <Stack
        divider={<StackDivider orientation="horizontal" />}
        spacing={4}
        align="stretch"
        minW="100%"
        direction={['column', 'row']}
        // maxW={1100}
      >
        <Box py={6}>
          <Heading
            as="h1"
            size="md"
            mb={4}
            fontSize={{ base: '17px', md: '19px', lg: '21px' }}
          >
            Synomyms:
          </Heading>
          {synonyms.map(synset => (
            <Container key={synset[0]} my={3}>
              <Text fontSize={{ base: '18px', md: '20px', lg: '22px' }}>
                {'Similarity: ' + synset[0] + '%'}
              </Text>
              <Wrap>
                {synset[1].map(s => (
                  <WrapItem key={s}>
                    <Tag variantColor="teal" size="lg">
                      {s}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Container>
          ))}
          {synonyms.length > 0 ? null : <Text>None</Text>}
        </Box>

        <Box py={6}>
          <Heading
            as="h1"
            size="md"
            mb={4}
            fontSize={{ base: '17px', md: '19px', lg: '22px' }}
          >
            Antonyms:
          </Heading>
          {antonyms.map(antset => (
            <Container key={antset[0]} my={3}>
              <Text fontSize={{ base: '18px', md: '20px', lg: '22px' }}>
                {'Similarity: ' + antset[0] + '%'}
              </Text>
              <Wrap>
                {antset[1].map(s => (
                  <WrapItem key={s}>
                    <Tag variantColor="teal" size="lg">
                      {s}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Container>
          ))}
          {antonyms.length > 0 ? null : <Text>None</Text>}
        </Box>
      </Stack>
    </Container>
  );
}
