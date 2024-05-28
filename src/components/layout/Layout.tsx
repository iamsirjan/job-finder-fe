import {
  Box,
  Container,
  ContainerProps,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  height?: ContainerProps['height'];
};

export const Layout: FC<Props> = ({ children, height }) => {
  const styles = useMultiStyleConfig('Layout', { height });

  return (
    <Container sx={styles.container}>
      <Box sx={styles.box}>{children}</Box>
    </Container>
  );
};
