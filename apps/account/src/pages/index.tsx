import React, { useCallback } from 'react';
import { NextPageContext } from 'next'
import { TMangaCollection, TJokesCollection } from '../utils/helpers'
import {
  Link as ChakraLink,
  SimpleGrid,
  Text,
  Box,
  Code,
  List,
  ListIcon,
  ListItem,
  Grid,
  Spinner,
  Flex,
  Stack
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import nookies, { parseCookies, setCookie } from 'nookies'

import { Wrapper } from '../components/Container'
import { Main } from '../components/Main'
import MangaCard from '../components/MangaCard'
import { Header } from '../components/Header'

import ResourceFactory from '../utils/adapter'
import JokeCard from '../components/JokeCard';
import { styleConstants } from '../theme';
const baseURL = 'http://localhost:4000';


const defaultConfig = {
  baseURL: baseURL,
  headers: {
    'X-Request-With': 'XMLHttpRequest'
  }
};

ResourceFactory.updateDefaults(defaultConfig)
class Manga extends ResourceFactory.createResource("/v1/outbox/manga") { }
class Jokes extends ResourceFactory.createResource("/v1/outbox/jokes/ten") { }




export default function Page(): JSX.Element {
  const [mangaCollection, setMangaCollection] = React.useState<TMangaCollection>([])
  const [jokesCollection, setJokesCollection] = React.useState<TJokesCollection>([])

  const fetchResources = useCallback(async () => {
    try {
      const manga = await Manga.list()
      const jokes = await Jokes.get('/ten')

      console.log(manga, jokes)
      /* Update state object */
      manga && await setMangaCollection(manga.data.data)
      jokes && await setJokesCollection(jokes.data)


    } catch (error) {
      alert(error)
    }
  }, [],
  )



  React.useEffect(() => {
    fetchResources()
  }, []);


  if (!jokesCollection && !mangaCollection) {
    return (
      <Spinner size="xl" />
    )
  }

  return (
    <>
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
              my={[3, 6]}
              py={[2, 4]}
            >
              Hear a Joke
            </Text>

            {/* ------------ Render the Jokes Collection ---------------- */}
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={10} pb={8}>
              {jokesCollection.map((value, idx) => {
                return (
                  <Box key={[idx, value.id].join("__")}>
                    <JokeCard jokes={value} />
                  </Box>
                )
              })}
            </SimpleGrid>
            {/* ------------ Render the Jokes Collection ---------------- */}
          </Box>
        </Main>
        {/* =================>  The Jokes Section */}




        <Box width="100%" borderTop={styleConstants.altBorder} background="white">

          <Main>

            <Box>



              <Text
                bgGradient="linear(to-l, #be3759, #108645)"
                bgClip="text"
                fontSize={["3xl", "5xl"]}
                fontWeight="bold"
                my={[3, 6]}
                py={[2, 4]}
              >
                Explore Mangas
            </Text>



              {/* -------------- Render the Manga Anime Collections here ---------------- */}
              <Stack isInline wrap="wrap" >
                {/* <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}> */}
                {mangaCollection.map((value, idx) => {
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
            </Box>

          </Main>
        </Box>

      </Wrapper>
    </>
  )
}


const complex =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) Ap…ML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'


Page.getInitialProps = async (ctx: NextPageContext) => {
  nookies.set(ctx, 'one', complex, {})
  nookies.set(ctx, 'three', "hey! this one's simple :)", {})

  console.log(nookies.get(ctx))
  return {
    server: nookies.get(ctx),
  }
}