import { IconButton, Container, Heading } from '@chakra-ui/react';
import {
  Box,
  HStack,
  Text,
  Stack,
  OrderedList,
  ListItem
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';


export default function SynAnt(props) {
    const s = props.content
    const definition = s.definition;
    const pos = s.pos
    const synonyms = s.synonyms
    const antonyms = s.antonyms

    function renderWords(words) {
      let renderedString = ""
      for (var i = 0; i < words.length; i++) {
        renderedString = renderedString + words[i] + ' '
      }
      return renderedString
    }

    return (
    <Container maxW={1000}>
        <Box py="1">
          <Heading fontSize={{ base: "20px", md: "25px", lg: "30px" }}>{definition}</Heading>
        </Box>
        <Box>
          <Text fontSize="md">{pos}</Text>
      </Box>
      <Box py={6}>
        {Object.keys(synonyms).map(key => (
          <div>
          <Text fontSize={{ base: "18px", md: "20px", lg: "22px" }}>{"Similarity: " + key + "%"}</Text>
          <Text>
            {renderWords(synonyms[key])}
          </Text>
          </div>
        ))}
      </Box>
    </Container>
    )
}