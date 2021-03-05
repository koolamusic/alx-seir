import { Flex, useColorMode, FlexProps } from '@chakra-ui/react'

const bgColor = { light: 'gray.50', dark: 'gray.900' }
const color = { light: 'black', dark: 'white' }


export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode()
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  )
}


export const Wrapper: React.FC<FlexProps> = (props): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      alignItems="center"
      direction="column"
      width="100%"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};