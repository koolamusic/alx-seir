import React from 'react';
import Link from 'next/link';
import { Box, Avatar, Heading, Flex, Divider, Badge, Text, AvatarBadge, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { styleConstants } from '../theme';

const HeaderBox = styled(Box)`
    background-color: ${styleConstants.background};
    display: flex;
    justify-content: space-between;
    min-height: ${styleConstants.headerHeight};
    padding: ${styleConstants.paddingWrapper};
    position: fixed;
    top: 0;
    z-index: ${styleConstants.topZindex};
`;

const HeaderDefault = styled(HeaderBox)`
    background-color: white;
    border-bottom: 1px solid #dddddd;
`;

export const HeaderElement: React.FC<{ name: string }> = ({ name }) => {
    return (
        <>
            <Link href="/">
                <Heading
                    as="h1"
                    cursor="pointer"
                    bgGradient="linear(to-l, #07522c,#FF0080)"
                    bgClip="text"
                    letterSpacing="0.2rem" fontFamily="Dosis" size="sm">ALXSERI</Heading>
            </Link>

            <Stack isInline alignItems="center" justifyContent="flex-end" width="130px">
                <Avatar cursor="pointer" name={name} size="sm">
                    <AvatarBadge size="1rem" bg="green.500" />
                </Avatar>

                <Link href="/logout">
                    <Badge
                        _hover={{
                            opacity: '0.7'
                        }}
                        cursor="pointer"
                        fontSize=".85rem"
                        colorScheme="red">Logout</Badge>
                </Link>
            </Stack>
        </>
    );
};

export const Header: React.FC<{ isDefault?: boolean; isBordered?: boolean }> = ({
    isDefault,
    isBordered,
}): JSX.Element => {
    return (
        <header>
            {isDefault ? (
                <HeaderDefault display="flex" bg="white" width="100%" alignItems="center">
                    <HeaderElement name="Fibonnaci Couture" />
                </HeaderDefault>
            ) : (
                    <HeaderBox
                        display="flex"
                        borderBottom={isBordered ? '1px solid #dddddd' : 'none'}
                        width="100%"
                        alignItems="center"
                    >
                        <HeaderElement name="Fibonnaci Couture" />
                    </HeaderBox>
                )}
        </header>
    );
};

export const FormPageHeader: React.FC<{ formHeading: string; formSubHeading?: string }> = (props): JSX.Element => {
    const { formHeading, formSubHeading } = props;
    return (
        <React.Fragment>
            <Heading as="h3" fontWeight="500" size="lg">
                {formHeading}
            </Heading>
            {formSubHeading && (
                <Flex my="2" mb={4} justifyContent="flex-start">
                    <Text fontSize="sm">{formSubHeading}</Text>
                </Flex>
            )}
            <Divider mb={12} pb={2} />
        </React.Fragment>
    );
};