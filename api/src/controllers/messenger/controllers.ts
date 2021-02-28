import { createProxyMiddleware, Options } from 'http-proxy-middleware';


const jokesApiProxyOptions: Options = {
  target: 'https://official-joke-api.appspot.com/',
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/v1/outbox/jokes': '/jokes', // rewrite path
  }
}

const mangaApiProxyOptions: Options = {
  target: 'https://kitsu.io/api/edge',
  changeOrigin: true,
  pathRewrite: {
    '^/v1/outbox/manga': '/manga',
  }
}

export const jokesApiProxyMiddleware = createProxyMiddleware(jokesApiProxyOptions)
export const mangaApiProxyMiddleware = createProxyMiddleware(mangaApiProxyOptions)