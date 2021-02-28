import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import secrets from '../../core/secrets'


const jokesApiProxyOptions: Options = {
  target: secrets.JOKES_API,
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/v1/outbox/jokes': '/jokes', // rewrite path
  }
}

const mangaApiProxyOptions: Options = {
  target: secrets.KITSU_API,
  changeOrigin: true,
  pathRewrite: {
    '^/v1/outbox/manga': '/manga',
  }
}

export const jokesApiProxyMiddleware = createProxyMiddleware(jokesApiProxyOptions)
export const mangaApiProxyMiddleware = createProxyMiddleware(mangaApiProxyOptions)