
import React from 'react';
import { Box, Heading, Image, Text, Flex, Icon, BoxProps, useDisclosure, SlideFade, Center } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { TMangaCollectionProps } from '../utils/helpers'

interface MangaCardProps extends Partial<BoxProps> {
    detail: TMangaCollectionProps
}

const MangaCard = ({ mr, width, detail }: MangaCardProps) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Box
            h={415.5}
            w={width || 292.5}
            mr={mr}
            mb={6}
            pos='relative'
            overflow='hidden'
            rounded='20px'
            transition='background-color 350ms ease-in'
        >

            <SlideFade reverse={true} in={isOpen} offsetY="200px">
                <Box

                    p={2}
                    pt={8}
                    px={5}
                    color="white"
                    position="absolute"
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    minHeight={415}
                    height="100%"
                    bg="green.700"
                    rounded="md"
                    shadow="md"
                >
                    <Flex align='center' w="100%">
                        <Box textAlign='left'>
                            <Heading as="h3" size="sm">About this Manga:</Heading>
                            <Text mb={2}>Created: {new Date(Date.parse(detail.createdAt)).toDateString()}</Text>
                            <Box maxHeight={196} overflowY="hidden" textOverflow="ellipsis">{detail.description} ...</Box>

                        </Box>
                    </Flex>


                </Box>
            </SlideFade>

            <Box
                pos='absolute'
                top={0}
                bottom={0}
                left={0}
                right={0}
                bg={isOpen
                    ? 'linear-gradient(to bottom, rgba(0,0,0,.1) 30%, rgba(0,0,0,.4) 70%)'
                    : 'linear-gradient(to bottom, rgba(0,0,0,.1) 50%, rgba(0,0,0,.8) 80%)'}
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
                src={detail.posterImage?.medium || ""}
            />
            <Center
                pos='absolute'
                top={4}
                right={4}
                rounded='100%'
                w={14}
                h={14}
                bg='rgba(255,255,255,.4)'
                zIndex={6}
                cursor="pointer"
                onClick={onToggle}
            >
                <Box transform='rotate(330deg)'>
                    <Icon as={ArrowRightIcon} color="gray.700" boxSize={4} />
                </Box>
            </Center>

            <Box pos='absolute' bottom={4} color='white' p={4}>

                <Flex align='center' w="100%">
                    <Box textAlign='left'>
                        <Heading lineHeight="1" as='h4' fontFamily="Barlow" fontSize='xl'>
                            {detail.canonicalTitle}
                        </Heading>
                    </Box>
                </Flex>

                <Flex align='center' mt={1}>
                    <Text fontWeight={500} color='gray50'>
                        Rank:
                    </Text>
                    <Text ml={2} fontWeight={500}>
                        {detail.popularityRank}
                    </Text>
                </Flex>

            </Box>
        </Box>
    );
};

export default MangaCard;