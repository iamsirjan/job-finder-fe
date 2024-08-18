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
} from '@chakra-ui/react';
import { formatDistanceToNow, parseISO } from 'date-fns';

import { ArrowBackIcon, AttachmentIcon } from '@chakra-ui/icons';
import Wrapper from 'wrapper';
import { marked } from 'marked';
import {
  IChatData,
  useGetChat,
  useGetChatUsers,
  useGetRecentChat,
  useSendChat,
} from 'service/service-chat';
import { useGetUserDetails } from 'service/service-user';

const ChatWindow = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [showUser, setShowUser] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<IChatData | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const userSearch = useGetChatUsers({ user: searchQuery });
  const recentChat = useGetRecentChat();
  const userChat = useGetChat({ user: selectedUserId });
  const sendChat = useSendChat();
  const user = useGetUserDetails();

  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.innerWidth < 768,
  );
  const [showSidebar, setShowSidebar] = useState<boolean>(
    isMobileView && !!selectedConversation,
  );

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

  useEffect(() => {
    if (userChat.data) {
      setSelectedConversation(userChat.data);
    } else {
      setSelectedConversation(null);
    }
  }, [userChat.data]);

  const handleSendMessage = () => {
    if (inputValue.trim() || file) {
      const formData = new FormData();
      formData.append('content', inputValue);
      formData.append('chat', selectedConversation?.id.toString() || '');
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
  }, [selectedConversation?.messages]);

  useEffect(() => {
    setShowSidebar(isMobileView && !!selectedConversation);
  }, [isMobileView, selectedConversation]);

  const renderMarkdown = (text: string) => {
    return <Box dangerouslySetInnerHTML={{ __html: marked(text) }} />;
  };

  return (
    <Wrapper>
      <Flex height={'80vh'} bg="white" boxShadow="lg">
        {!showSidebar && (
          <Box
            width={isMobileView ? '100%' : '25%'}
            borderRight="1px solid lightgray"
            p={4}
            overflowY="auto"
          >
            <Text fontSize="xl" mb={4}>
              Conversations
            </Text>
            <Box mb={4}>
              <Input
                placeholder="Search user"
                value={searchQuery}
                onFocus={() => setShowUser(true)}
                // onBlur={() => setShowUser(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {showUser && (
                <Box mt={2}>
                  {userSearch.data?.map((user) => (
                    <Box
                      key={user.id}
                      p={2}
                      cursor="pointer"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setShowUser(false);
                      }}
                      borderRadius="md"
                    >
                      <HStack spacing={4}>
                        <Avatar name={user.name} src={user.profile_picture} />
                        <Box>
                          <Text fontWeight="300">{user.name}</Text>
                        </Box>
                      </HStack>
                      <Divider mt={2} />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
            {recentChat.data?.data &&
              recentChat.data.data.map((conv) => {
                const isUserParticipant1 =
                  user.data?.id === conv.participant1.id;
                const receiver = isUserParticipant1
                  ? conv.participant2
                  : conv.participant1;

                return (
                  <Box
                    key={conv.id}
                    p={2}
                    cursor="pointer"
                    onClick={() => setSelectedUserId(receiver.id)}
                    bg={receiver.id === selectedUserId ? 'gray.200' : 'white'}
                    borderRadius="md"
                  >
                    <HStack spacing={4}>
                      <Avatar
                        name={receiver.name}
                        src={receiver.profile_picture}
                      />
                      <Box>
                        <Text fontWeight="300">{receiver.name}</Text>
                        <Text
                          fontWeight={conv.is_seen ? '300' : '900'}
                          fontSize="sm"
                        >
                          {conv.latest_message.file
                            ? 'sent a file'
                            : conv.latest_message.content}
                        </Text>
                      </Box>
                      <Spacer />
                      <Text fontSize="xs">
                        {formatDistanceToNow(
                          parseISO(conv.latest_message.created_at),
                          { addSuffix: true },
                        )}
                      </Text>
                    </HStack>
                    <Divider mt={2} />
                  </Box>
                );
              })}
          </Box>
        )}
        {selectedUserId && (
          <Flex direction="column" flex="1" height="80vh">
            <Flex
              bg="blue.500"
              p={4}
              color="white"
              position="relative"
              justifyContent={'space-between'}
            >
              <Text fontSize="xl">
                {selectedConversation
                  ? user.data?.id ===
                    selectedConversation.participant1.id.toString()
                    ? selectedConversation.participant2.name
                    : selectedConversation.participant1.name
                  : 'New Conversation'}
              </Text>
              {isMobileView && (
                <ArrowBackIcon onClick={() => setSelectedConversation(null)} />
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
              {selectedConversation?.messages.length ? (
                selectedConversation?.messages.map((message, index) => {
                  const isUserParticipant1 =
                    user.data?.id ===
                    selectedConversation.participant1.id.toString();

                  const receiver = isUserParticipant1
                    ? selectedConversation.participant2
                    : selectedConversation.participant1;
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
                          message.sender.id.toString() === selectedUserId
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
              ) : (
                <Text color="gray.500">
                  No messages yet. Start the conversation by sending a message.
                </Text>
              )}
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
            </Flex>
          </Flex>
        )}

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
              <Button colorScheme="blue" onClick={handleFileAttachment}>
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
