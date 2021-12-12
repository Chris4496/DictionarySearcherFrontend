import { IconButton, Container, Heading } from '@chakra-ui/react';
import {
  Box,
  HStack,
  Text,
  Stack,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

export default function Entry(props) {
  const entry = props.content;
  const word = entry.word;
  const wordType = entry.wordType;
  const audioLinks = entry.audioLinks;
  const explanation = entry.explanation;

  console.log(entry);
  function renderExplain(part) {
    if (part['type'] === 'main') {
      return (
        <Text
          fontSize={{ base: '22px', md: '24px', lg: '26px' }}
          key={part.content}
        >
          {part.content}
        </Text>
      );
    } else if (part['type'] === 'example') {
      return (
        <Stack direction="row" p={3} key={part.content}>
          <Text>-</Text>
          <Text as="i" fontSize={{ base: 'md', lg: 'lg' }}>
            {part.content}
          </Text>
        </Stack>
      );
    }
  }

  return (
    <Container maxW={1000}>
      <Box py="1">
        <Heading fontSize={{ base: '35px', md: '40px', lg: '53px' }}>
          {word}
        </Heading>
      </Box>
      <Box>
        <Text fontSize="md">{wordType}</Text>
      </Box>
      <HStack spacing={5}>
        {audioLinks.map(audio => (
          <HStack id={audio.id}>
            <h1>{audio['tag']}</h1>
            <IconButton
              aria-label="Play Sound"
              size="sm"
              variant="ghost"
              icon={<InfoOutlineIcon />}
              onClick={() => new Audio(audio.link).play()}
            />
          </HStack>
        ))}
      </HStack>
      <Box py={6}>
        <OrderedList spacing={6}>
          {explanation.map(orderedlist => (
            <ListItem my={3}>
              {orderedlist.map(part => renderExplain(part))}
            </ListItem>
          ))}
        </OrderedList>
      </Box>
    </Container>
  );
}
