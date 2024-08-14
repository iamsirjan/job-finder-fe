import { Box, Container, IconButton } from '@chakra-ui/react';
import Navbar from '../layout/Navbar';
import { useState } from 'react';
import ChatWindow from '../pages/ChatAdmin'; // Updated import path
import { ChatIcon } from '@chakra-ui/icons';

const Wrapper = ({ children, showNavbar = true }: IWrapper) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <Box margin={0} padding={0}>
      {showNavbar && <Navbar />}
      <Container maxW={['100%', '1500px']} minHeight="80vh" marginTop="10px">
        <Box p={4}>
          {isChatOpen && <ChatWindow onClose={toggleChat} />}
          <IconButton
            icon={<ChatIcon />}
            aria-label="Open chat"
            position="fixed"
            bottom="20px"
            right="20px"
            onClick={toggleChat}
            zIndex="1000"
            borderRadius="full"
            h="50px"
            w="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="2"
          />
        </Box>
        {children}
      </Container>
    </Box>
  );
};

export default Wrapper;

interface IWrapper {
  children: React.ReactNode;
  showNavbar?: boolean;
  fullNavbar?: boolean;
}
