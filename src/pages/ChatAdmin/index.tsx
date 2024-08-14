import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Input,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'admin';
}

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello',
      sender: 'user',
    },
    {
      id: 2,
      text: 'Hi Prakash, Thanks for reaching out to us.',
      sender: 'admin',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Flex
      direction="column"
      justify="space-between"
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      p={4}
      h="400px"
      position="fixed"
      bottom="80px"
      right="20px"
      zIndex="1000"
    >
      <VStack spacing={4} overflowY="auto" flex="1">
        <Flex
          align="center"
          justify="space-between"
          w="full"
          position="sticky"
          top="0"
          bg="white"
          zIndex="1"
          padding={'10px'}
        >
          <Flex align="center">
            <Avatar name="Admin" />
            <Box ml={2}>
              <Text fontWeight="bold">Arun</Text>
              <Text fontSize="sm" color="gray.500">
                Active over 1w ago
              </Text>
            </Box>
          </Flex>
          <CloseIcon cursor={'pointer'} onClick={onClose} />
        </Flex>
        <VStack spacing={3} align="stretch" w="full">
          {messages.map((message) => (
            <Flex key={message.id} align="center">
              <Avatar
                size="sm"
                name={message.sender === 'admin' ? 'Admin' : 'User'}
                src={
                  message.sender === 'admin'
                    ? 'https://bit.ly/broken-link'
                    : 'https://bit.ly/broken-link'
                }
                mr={2}
              />
              <Box bg="gray.100" p={2} borderRadius="md">
                <Text>{message.text}</Text>
              </Box>
            </Flex>
          ))}
          <div ref={messagesEndRef} />
        </VStack>
      </VStack>
      <Flex mt={4}>
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </Flex>
    </Flex>
  );
};

export default ChatWindow;
