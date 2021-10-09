import React, { useState } from 'react';
import {
  Input,
  Spinner,
  Center,
  IconButton,
  Container,
  Heading,
} from '@chakra-ui/react';
import {
  Divider,
  VStack,
  Box,
  StackDivider,
  Button,
  HStack,
  Text,
  Stack,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

export default function Entry(props) {
  const entry = props.content;
  const word = entry['word'];
  const wordType = entry['wordType'];
  const audioLinks = entry['audioLinks'];
  const explanation = entry['explanation'];

  console.log(entry);
  function renderExplain(part) {
    if (part['type'] == 'main') {
      return <Text fontSize="26px">{part.content}</Text>;
    } else if (part['type'] == 'example') {
      return (
        <Stack direction="row" h={50} p={3}>
          <Divider orientation="vertical" />
          <Text>{part.content}</Text>
        </Stack>
      );
    }
  }

  return (
    <Container maxW={1000}>
      <Box py="1">
        <Heading size="2xl">{word}</Heading>
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
        {explanation.map(orderedlist => (
          <Box my={4}>{orderedlist.map(part => renderExplain(part))}</Box>
        ))}
      </Box>
    </Container>
  );
}
