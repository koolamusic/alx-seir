import { Box, BoxProps } from '@chakra-ui/react'


export const Main: React.FC<BoxProps> = (props) => {
  return <Box
    width="100%"
    margin=" 0 auto"
    maxWidth="1280px"
    pt="2rem"
    px="1rem"

    {...props}
  />;
};