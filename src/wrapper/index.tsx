import { Box, Container } from '@chakra-ui/react';
import Navbar from '../layout/Navbar';

const Wrapper = ({ children, showNavbar = true }: IWrapper) => {
  return (
    <Box>
      {showNavbar && <Navbar />}
      <Container minW={'1500px'} minHeight={'80vh'} marginTop={'50px'}>
        {children}
      </Container>
    </Box>
  );
};

export default Wrapper;
interface IWrapper {
  children: React.ReactNode;
  showNavbar?: boolean;
}
