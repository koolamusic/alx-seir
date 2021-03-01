
import React from 'react';
import { Box, Heading, Image, Text, Flex, Icon, BoxProps } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';



const MovieCard = ({ mr, width }: BoxProps) => {
    return (
        <Box
            h={210}
            w={width || 80}
            mr={mr}
            pos='relative'
            overflow='hidden'
            rounded='20px'
            cursor='pointer'
            transition='background-color 350ms ease-in'
        >
            <Box
                pos='absolute'
                top={0}
                bottom={0}
                left={0}
                right={0}
                bg='linear-gradient(to bottom, rgba(0,0,0,.1) 50%, rgba(0,0,0,.4) 70%)'
                _hover={{
                    bg:
                        'linear-gradient(to bottom, rgba(0,0,0,.2) 30%, rgba(0,0,0,.5) 70%)',
                }}
                transition='background-color 350ms ease-in'
            />
            <Image
                w='100%'
                h='100%'
                objectFit='cover'
                src='https://www.fact-checkghana.com/wp-content/uploads/2020/06/Nana-Akufo-Addo-770x545.jpg'
            />
            <Flex
                align='center'
                justify='center'
                pos='absolute'
                top={4}
                right={4}
                rounded='100%'
                w={14}
                h={14}
                bg='rgba(255,255,255,.4)'
            >
                <Box transform='rotate(330deg)'>
                    <Icon as={ArrowRightIcon} boxSize={4} />
                </Box>
            </Flex>
            <Box pos='absolute' bottom={4} color='white' p={4}>
                <Flex align='center'>
                    <Box w='80%' textAlign='left'>
                        <Heading as='h4' fontSize='xl'>
                            Nana Addo Dankwa Akufo-Addo
            </Heading>
                    </Box>
                    <Box ml={4}>
                        <Text fontSize={24} as='span' role='img'>
                            🇬🇭
            </Text>
                    </Box>
                </Flex>
                <Flex align='center' mt={2}>
                    <Text fontWeight={600} color='gray50'>
                        Elected to office:
          </Text>
                    <Text fontFamily='bold' ml={2} fontWeight={700}>
                        January 2017
          </Text>
                </Flex>
                <Flex align='center' mt={1}>
                    <Text fontWeight={600} color='gray50'>
                        Tenure:
          </Text>
                    <Text fontFamily='bold' ml={2} fontWeight={700}>
                        2016 - 2020
          </Text>
                </Flex>
                <Flex align='center' mt={1}>
                    <Text fontWeight={600} color='gray50'>
                        Term:
          </Text>
                    <Text fontFamily='bold' ml={2} fontWeight={700}>
                        First Term
          </Text>
                </Flex>
            </Box>
        </Box>
    );
};

export default MovieCard;