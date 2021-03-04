import React, { useCallback } from 'react';
import {
  Link as ChakraLink,
  Text,
  Box,
  Code,
  List,
  ListIcon,
  ListItem,
  Grid,
  Spinner,
  Flex
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import nookies, { parseCookies, setCookie } from 'nookies'
import { NextPageContext } from 'next'

import { Wrapper } from '../components/Container'
import { Main } from '../components/Main'
import MangaCard from '../components/MangaCard'
import { Header } from '../components/Header'

import ResourceFactory from '../utils/adapter'
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


type TJokesCollection = {
  type: string | number;
  id: number;
  setup: string;
  punchline: string
}[]

type TMangaCollection = {
  id: string;
  type: string;
  attributes: {
    canonicalTitle: string;
    description: string;
    chapterCount: number;
    createdAt: Date;
    popularityRank: string;
    posterImage: {
      medium: string;
      small: string
    };
    serialization: string;

    [x: string]: string | Record<string, any> | string[] | number | Record<string, any>[]
  },
  links: Record<string, any>;
  relationships: Record<string, any>
}[]


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
    <Wrapper>
      <Header isDefault={true} />


      <Main>



        {/* ------------ Render the Jokes Collection ---------------- */}
        <Flex flexWrap="wrap">
          {jokesCollection.map((value, idx) => {
            return (
              <Box key={[idx, value.id].join("__")}>
                <Box>
                  <h4>{value.setup}</h4>
                  <h1>{value.punchline}</h1>
                </Box>

              </Box>
            )
          })}
        </Flex>
        {/* ------------ Render the Jokes Collection ---------------- */}


        {/* -------------- Render the Manga Anime Collections here ---------------- */}
        <Flex flexWrap="wrap" justify="space-between" width="100%">
          {mangaCollection.map((value, idx) => {
            const { attributes } = value
            return (
              <Box key={[idx, value.id].join("__")}>
                <MangaCard detail={attributes} />

              </Box>
            )
          })}
        </Flex>
        {/* -------------- Render the Manga Anime Collections here ---------------- */}


      </Main>

    </Wrapper>
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