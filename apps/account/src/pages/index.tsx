import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Grid
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import nookies, { parseCookies, setCookie } from 'nookies'
import { NextPageContext } from 'next'

import { Wrapper } from '../components/Container'
import { Main } from '../components/Main'
import MovieCard from '../components/MovieCard'
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



export default function Page(props: any): JSX.Element {


  const onRequest = async (data: any): Promise<void> => {
    console.log(data, "DATA IN PAYLOAD REQUEST")
    // setCookie(null, 'fromClient', 'rudimentary-closure', {
    //   maxAge: 30 * 24 * 60 * 60,
    //   path: '/',
    // })

    console.warn(parseCookies(), "cookies from nookies")
    try {
      const result = await Manga.list()
      alert(result.status)
      console.log(result.data)

    } catch (error) {
      alert(error)
    }
  };

  console.log(props)


  return (
    <Wrapper>
      <Header isDefault={true} />
      <Main>
        <Text>
          Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
          <Code>typescript</Code>.
      </Text>
        <Grid templateColumns={{ md: 'repeat(4, 1fr)' }} gap={{ md: 2 }}>
          <MovieCard width={150} />
          <MovieCard width={150} />
          <MovieCard width={150} />
          <MovieCard width={150} />
        </Grid>


        <List spacing={3} my={0}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              onClick={onRequest}
              flexGrow={1}
              mr={2}
            >
              Chakra UI <LinkIcon />
            </ChakraLink>
          </ListItem>
        </List>
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