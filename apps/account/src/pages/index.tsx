import React, { useCallback } from 'react';
import { NextPageContext } from 'next'
import Head from 'next/head'
import styled from '@emotion/styled'
import { TMangaCollection, TJokesCollection } from '../utils/helpers'
import {
  SimpleGrid,
  Text,
  Box,
  Spinner,
  Flex,
  Stack
} from '@chakra-ui/react'

import { Wrapper } from '../components/Container'
import { Main } from '../components/Main'
import MangaCard from '../components/MangaCard'
import { Header } from '../components/Header'

import ResourceFactory from '../utils/adapter'
import * as Auth from '../utils/auth'
import JokeCard from '../components/JokeCard';
import { styleConstants } from '../theme';


const baseURL = process.env.NEXT_PUBLIC_API_URL;
const defaultConfig = {
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'X-Request-With': 'XMLHttpRequest'
  }
};

ResourceFactory.updateDefaults(defaultConfig)
class Manga extends ResourceFactory.createResource("/v1/outbox/manga") { }
class Jokes extends ResourceFactory.createResource("/v1/outbox/jokes/ten") { }

const CardWrapper = styled(Flex)`
background: white;
width: 100%;
overflow-x: scroll;
flex-direction: column;
  &::-webkit-scrollbar { 
      width: 0;  /* Remove scrollbar space */
      background: transparent;
      height: .50rem;
      }
    &::-webkit-scrollbar-thumb {
    background: #2a422a;
}
            
`
const JokeWrapper = styled(SimpleGrid)`

@media (max-width: 630px) { 
    grid-template-columns: none;
    justify-content: center;
  }

`


const Loader = ({ entry }: { entry: string }) => (
  <Flex>
    <Spinner
      thickness="10px"
      speed="0.65s"
      emptyColor="gray.200"
      color="green.400"
      size="md"
    />
    <Text ml={2}>
      Loading your {entry}
    </Text>
  </Flex>
)


export default function Page(): JSX.Element {
  const [mangaCollection, setMangaCollection] = React.useState<TMangaCollection>([])
  const [jokesCollection, setJokesCollection] = React.useState<TJokesCollection>([])

  const fetchResources = useCallback(async () => {
    try {
      const jokes = await Jokes.get('/ten')
      const manga = await Manga.list()

      // console.log(manga, jokes)
      /* Update state object */
      manga && await setMangaCollection(manga.data.data)
      jokes && await setJokesCollection(jokes.data)


    } catch (error) {
      // alert(error)
    }
  }, [],
  )



  React.useEffect(() => {
    fetchResources()
  }, []);


  if (!jokesCollection && !mangaCollection) {
    return (
      <Loader entry={"Loading ..."} />
    )
  }

  return (
    <>
      <Head>
        <title>ALX Seri | Software Engineer Resident in 🤐</title>
      </Head>
      <Header isDefault={true} />
      <Wrapper>


        {/* =================>  The Jokes Section */}
        <Main>
          <Box my={4} mt={8} pt={6}>
            <Text
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              bgClip="text"
              fontSize={["3xl", "5xl"]}
              fontWeight="bold"
              textAlign={["center", "left"]}
              my={[3, 6]}
              py={[2, 4]}
            >
              Hear a Joke
            </Text>

            {/* ------------ Render the Jokes Collection ---------------- */}
            <JokeWrapper columns={[1, 2, 3, 4]} spacing={10} pb={8}>
              {jokesCollection.length === 0
                ? <Loader entry={"personalized jokes"} />
                : jokesCollection.map((value, idx) => {
                  return (
                    <Box key={[idx, value.id].join("__")}>
                      <JokeCard jokes={value} />
                    </Box>
                  )
                })
              }
            </JokeWrapper>
            {/* ------------ Render the Jokes Collection ---------------- */}
          </Box>
        </Main>
        {/* =================>  The Jokes Section */}



        {/* =========> Section to render Anime Collection */}
        <Flex direction="column" width="100%" borderTop={styleConstants.altBorder} background="white">
          <Main pb={1}>
            <Box>
              <Text
                bgGradient="linear(to-l, #be3759, #108645)"
                bgClip="text"
                fontSize={["3xl", "5xl"]}
                fontWeight="bold"
                my={[1, 3]}
                py={[1, 3]}
              >
                Explore Mangas
            </Text>
            </Box>
          </Main>
        </Flex>

        <CardWrapper>
          <Main pb={12}>
            {/* -------------- Render the Manga Anime Collections here ---------------- */}
            <Stack isInline >
              {/* <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}> */}
              {mangaCollection.length === 0
                ? <Loader entry={"Anime Collection"} />
                : mangaCollection.map((value, idx) => {
                  const { attributes } = value
                  return (
                    <Box key={[idx, value.id].join("__")}>
                      <MangaCard detail={attributes} />

                    </Box>
                  )
                })}
            </Stack>
            {/* </SimpleGrid> */}
            {/* -------------- Render the Manga Anime Collections here ---------------- */}


          </Main>
        </CardWrapper>
        {/* =========> Section to render Anime Collection */}
        {/* 
        <Flex w="100%" background="white">
          <Main pb={12} />
        </Flex> */}

      </Wrapper>
    </>
  )
}


Page.getInitialProps = async (ctx: NextPageContext) => {

  if (Auth.redirectIfNotAuthenticated(ctx, '/login')) {
    return {};
  }

  return {
    props: null
  }
}