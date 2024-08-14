import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
  HStack,
  Avatar,
  Spacer,
  Divider,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon, AttachmentIcon, LinkIcon } from '@chakra-ui/icons';
import Wrapper from 'wrapper';
import { marked } from 'marked';

interface Message {
  user: string;
  text?: string; // Optional, as we might have files or URLs
  fileUrl?: string; // URL for files (images, videos, documents)
  fileType?: 'image' | 'video' | 'document'; // Type of file
  url?: { name: string; link: string }; // URL and its name
  timestamp: string;
}

interface Conversation {
  user: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

const ChatWindow = () => {
  const defaultData = {
    user: '',
    avatar: '',
    lastMessage: '',
    timestamp: '',
    messages: [],
  };

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      user: 'John Doe',
      avatar: 'https://bit.ly/dan-abramov',
      lastMessage: 'Hey, how are you?',
      timestamp: '2m ago',
      messages: [
        { user: 'John Doe', text: 'Hey, how are you?', timestamp: '2m ago' },
        { user: 'User', text: 'I am good, thanks!', timestamp: '1m ago' },
      ],
    },
    // Add more conversations as needed
  ]);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(defaultData);
  const [inputValue, setInputValue] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [urlData, setUrlData] = useState<{ name: string; link: string } | null>(
    null,
  );
  const [showUrlModal, setShowUrlModal] = useState<boolean>(false);
  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.innerWidth < 768,
  );
  const [showSidebar, setShowSidebar] = useState<boolean>(
    isMobileView && !!selectedConversation.user,
  );

  const toast = useToast();

  const handleResize = () => {
    const isMobile = window.innerWidth < 768;
    setIsMobileView(isMobile);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() || file || urlData) {
      const newMessage: Message = {
        user: 'User',
        text: inputValue.trim(),
        fileUrl: file ? URL.createObjectURL(file) : undefined,
        fileType: file
          ? file.type.startsWith('image')
            ? 'image'
            : file.type.startsWith('video')
              ? 'video'
              : 'document'
          : undefined,
        url: urlData || undefined,
        timestamp: new Date().toLocaleTimeString(),
      };

      const updatedConversations = conversations.map((conv) =>
        conv.user === selectedConversation.user
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage.text || 'Sent a file' || 'Shared a URL',
              timestamp: newMessage.timestamp,
            }
          : conv,
      );
      setConversations(updatedConversations);
      setSelectedConversation({
        ...selectedConversation,
        messages: [...selectedConversation.messages, newMessage],
      });
      setInputValue('');
      setFile(null);
      setUrlData(null);
    }
  };

  const handleFileAttachment = () => {
    if (file) {
      handleSendMessage();
      setFile(null); // Clear file after sending
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation.messages]);

  useEffect(() => {
    setShowSidebar(isMobileView && !!selectedConversation.user);
  }, [isMobileView, selectedConversation]);

  const renderMarkdown = (text: string) => {
    return <Box dangerouslySetInnerHTML={{ __html: marked(text) }} />;
  };

  return (
    <Wrapper>
      <Flex height={'80vh'} bg="white" boxShadow="lg">
        {!showSidebar && (
          <Box
            width={isMobileView ? '100%' : '30%'}
            borderRight="1px solid lightgray"
            p={4}
            overflowY="auto"
          >
            <Text fontSize="xl" mb={4}>
              Conversations
            </Text>
            {conversations.map((conv, index) => (
              <Box
                key={index}
                p={2}
                cursor="pointer"
                onClick={() => {
                  setSelectedConversation(conv);
                }}
                bg={
                  conv.user === selectedConversation.user ? 'gray.200' : 'white'
                }
                borderRadius="md"
              >
                <HStack spacing={4}>
                  <Avatar name={conv.user} src={conv.avatar} />
                  <Box>
                    <Text fontWeight="bold">{conv.user}</Text>
                    <Text fontSize="sm">{conv.lastMessage}</Text>
                  </Box>
                  <Spacer />
                  <Text fontSize="xs">{conv.timestamp}</Text>
                </HStack>
                <Divider mt={2} />
              </Box>
            ))}
          </Box>
        )}
        {!!selectedConversation.user ? (
          <Flex direction="column" flex="1" height="80vh">
            <Flex
              bg="blue.500"
              p={4}
              color="white"
              position="relative"
              justifyContent={'space-between'}
            >
              <Text fontSize="xl">{selectedConversation.user}</Text>
              {isMobileView && (
                <ArrowBackIcon
                  onClick={() => setSelectedConversation(defaultData)}
                />
              )}
            </Flex>
            <VStack
              p={4}
              spacing={4}
              overflowY="auto"
              flex="1"
              border="1px solid lightgray"
              borderRadius="md"
            >
              {selectedConversation.messages.map((message, index) => (
                <HStack
                  key={index}
                  alignSelf={
                    message.user === 'User' ? 'flex-end' : 'flex-start'
                  }
                >
                  <Avatar name={message.user} size="sm" />
                  <Box
                    bg={message.user === 'User' ? 'blue.100' : 'gray.100'}
                    p={3}
                    borderRadius="md"
                  >
                    {message.text && renderMarkdown(message.text)}
                    {message.fileUrl && message.fileType === 'image' && (
                      <img
                        src={message.fileUrl}
                        alt="Attachment"
                        style={{ maxWidth: '100%' }}
                      />
                    )}
                    {message.fileUrl && message.fileType === 'video' && (
                      <video
                        src={message.fileUrl}
                        controls
                        style={{ maxWidth: '100%' }}
                      />
                    )}
                    {message.fileUrl && message.fileType === 'document' && (
                      <a href={message.fileUrl} download>
                        Download document
                      </a>
                    )}
                    {message.url && (
                      <a
                        href={message.url.link}
                        target="_blank"
                        style={{ color: 'blue' }}
                        rel="noopener noreferrer"
                      >
                        {message.url.name}
                      </a>
                    )}
                    <Text fontSize="xs" textAlign="right">
                      {message.timestamp}
                    </Text>
                  </Box>
                </HStack>
              ))}

              <div ref={messagesEndRef} />
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
              <IconButton
                aria-label="link"
                ml={2}
                icon={<LinkIcon />}
                onClick={() => setShowUrlModal(true)}
              />
            </Flex>
          </Flex>
        ) : (
          <Flex justifyContent={'center'} alignItems={'center'} flex={1}>
            <Text color="gray.500">
              Please select any conversation and start chatting
            </Text>
          </Flex>
        )}

        {/* URL Modal */}
        <Modal isOpen={showUrlModal} onClose={() => setShowUrlModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add URL</ModalHeader>
            <ModalBody>
              <Input
                placeholder="Link name"
                mb={3}
                onChange={(e) =>
                  setUrlData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                placeholder="URL"
                onChange={(e) =>
                  setUrlData((prev) => ({ ...prev, link: e.target.value }))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={() => {
                  setShowUrlModal(false);
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* File Modal */}
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
              <Button
                colorScheme="blue"
                onClick={() => {
                  handleFileAttachment();
                  setShowFileModal(false);
                }}
              >
                Attach
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Wrapper>
  );
};

export default ChatWindow;
