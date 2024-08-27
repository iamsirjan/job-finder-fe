import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Input,
  VStack,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { AttachmentIcon, CloseIcon } from '@chakra-ui/icons';
import { useGetChat, useSendChat } from 'service/service-chat';
import { useGetUserDetails } from 'service/service-user';
import { marked } from 'marked';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sendChat = useSendChat();

  const user = useGetUserDetails();
  const userChat = useGetChat({ user: '1' });
  const [inputValue, setInputValue] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const handleSendMessage = () => {
    if (inputValue.trim() || file) {
      const formData = new FormData();
      formData.append('content', inputValue);
      formData.append('chat', '1' || '');
      if (file) {
        formData.append('file', file);
      }

      sendChat.mutate(formData, {
        onSuccess: () => {
          userChat.refetch();
          setInputValue('');
          setFile(null);
        },
      });
    }
  };

  const handleFileAttachment = () => {
    if (file) {
      handleSendMessage();
      setShowFileModal(false);
    }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [userChat.data]);

  const renderMarkdown = (text: string) => {
    return <Box dangerouslySetInnerHTML={{ __html: marked(text) }} />;
  };

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
              <Text fontWeight="bold">Admin</Text>
            </Box>
          </Flex>
          <CloseIcon cursor={'pointer'} onClick={onClose} />
        </Flex>
        <VStack spacing={3} align="stretch" w="full">
          {userChat.data?.messages.length
            ? userChat.data?.messages.map((message, index) => {
                const isUserParticipant1 =
                  user.data?.id === userChat.data.participant1.id.toString();

                const receiver = isUserParticipant1
                  ? userChat.data.participant2
                  : userChat.data.participant1;
                return (
                  <HStack
                    key={index}
                    alignSelf={
                      message.sender.id === receiver.id
                        ? 'flex-end'
                        : 'flex-start'
                    }
                  >
                    <Avatar name={message.sender.name} size="sm" />
                    <Box
                      bg={
                        message.sender.id.toString() === '1'
                          ? 'blue.100'
                          : 'gray.100'
                      }
                      p={3}
                      borderRadius="md"
                    >
                      {message.content && renderMarkdown(message.content)}
                      {message.file && (
                        <a href={message.file} download>
                          Download file
                        </a>
                      )}
                      <Text fontSize="xs" textAlign="right">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </Text>
                    </Box>
                  </HStack>
                );
              })
            : null}

          <div ref={messagesEndRef} />
        </VStack>
      </VStack>
      <Flex p={4} borderTop="1px solid lightgray">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <IconButton
          aria-label="attach"
          ml={2}
          icon={<AttachmentIcon />}
          onClick={() => setShowFileModal(true)}
        />
      </Flex>
      <Modal isOpen={showFileModal} onClose={() => setShowFileModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select File</ModalHeader>
          <ModalBody>
            <Input
              type="file"
              accept="image/*,video/*,.pdf, .docx, .xlsx"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleFileAttachment}>
              Attach
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ChatWindow;
