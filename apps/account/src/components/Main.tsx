import { Box, BoxProps } from '@chakra-ui/react'


export const Main: React.FC<BoxProps> = (props) => {
  return <Box
    spacing="1.5rem"
    width="100%"
    margin=" 0 auto"
    maxWidth="1200px"
    pt="8rem"
    px="1rem"

    {...props}
  />;
};