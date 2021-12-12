import { Container, Heading, WrapItem } from '@chakra-ui/react';
import { Box, Text, Stack, Tag, Wrap, StackDivider } from '@chakra-ui/react';

export default function SynAnt(props) {
  const s = props.content;
  const definition = s.definition;
  const pos = s.pos;
  const synonyms = s.synonyms;
  const antonyms = s.antonyms;

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
          {Object.keys(synonyms).map(key => (
            <Container key={key} my={3}>
              <Text fontSize={{ base: '18px', md: '20px', lg: '22px' }}>
                {'Similarity: ' + key + '%'}
              </Text>
              <Wrap>
                {synonyms[key].map(s => (
                  <WrapItem key={s}>
                    <Tag variantColor="teal" size="lg">
                      {s}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Container>
          ))}
          {synonyms &&
          Object.keys(synonyms).length === 0 &&
          Object.getPrototypeOf(synonyms) === Object.prototype ? (
            <Text>None</Text>
          ) : null}
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
          {Object.keys(antonyms).map(key => (
            <Container key={key} my={3}>
              <Text fontSize={{ base: '18px', md: '20px', lg: '22px' }}>
                {'Similarity: ' + key + '%'}
              </Text>
              <Wrap>
                {antonyms[key].map(s => (
                  <WrapItem key={s}>
                    <Tag variantColor="teal" size="lg">
                      {s}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Container>
          ))}
          {antonyms &&
          Object.keys(antonyms).length === 0 &&
          Object.getPrototypeOf(antonyms) === Object.prototype ? (
            <Text>None</Text>
          ) : null}
        </Box>
      </Stack>
    </Container>
  );
}
