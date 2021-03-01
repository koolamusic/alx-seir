import { ChakraProvider } from '@chakra-ui/react'
import Router from 'next/router'

import theme from '../theme'
import { AppProps } from 'next/app'
import Fonts from '../components/Global'
import progress from 'nprogress';


/* Configure N-progress Routing Feedback */
progress.configure({ showSpinner: false });

/* ------Apply NextJs Custom Routing------ */
Router.events.on('routeChangeStart', () => progress.start());
Router.events.on('routeChangeComplete', () => progress.done());
Router.events.on('routeChangeError', () => progress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
