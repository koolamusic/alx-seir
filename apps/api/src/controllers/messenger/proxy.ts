import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import zlib from 'zlib'
import secrets from '../../core/secrets'
import logger from '../../core/logger'


const jokesApiProxyOptions: Options = {
  target: secrets.JOKES_API,
  headers: {
    'Access-Control-Allow-Origin': secrets.FRONTEND_ONE,
  },
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/v1/outbox/jokes': '/jokes', // rewrite path
  },
  selfHandleResponse: true,
  onProxyRes(proxyRes, _req, res) {
    const bodyChunks: any[] | Uint8Array[] = [];

    proxyRes.on('data', (chunk) => {
      bodyChunks.push(chunk);
    });

    proxyRes.on('end', () => {
      const gzippedBody = Buffer.concat(bodyChunks);
      const body = zlib.gunzipSync(gzippedBody).toString('utf8')

      // Managing response headers
      res.append('Accept-Encoding', 'gzip;q=0,compress,deflate,sdch')
      res.set('Transfer-Encoding', 'deflate, gzip, compress');
      res.set('Content-Encoding', 'deflate, gzip, compress');


      // Blacklist headers that should not be included in response
      const headerBlacklist = new Set(['access-control-allow-origin', 'transfer-encoding', 'content-encoding', 'vary', 'x-powered-by'])
      Object.keys(proxyRes.headers).filter(key => !headerBlacklist.has(key)).forEach((key) => {
        res.append(key, proxyRes.headers[key]);
      });


      /* Send the response back to user */
      res.status(proxyRes.statusCode as number).json(JSON.parse(body))
      res.end();


    });
  },
}

const mangaApiProxyOptions: Options = {
  target: secrets.KITSU_API,
  changeOrigin: true,
  pathRewrite: {
    '^/v1/outbox/manga': '/manga',
  },
  selfHandleResponse: true,
  onProxyRes(proxyRes, _req, res) {
    const bodyChunks: any[] | Uint8Array[] = [];

    proxyRes.on('data', (chunk) => {
      bodyChunks.push(chunk);
    });

    proxyRes.on('end', () => {
      const gzippedBody = Buffer.concat(bodyChunks);
      const body = zlib.brotliDecompressSync(gzippedBody).toString('utf8')

      // Managing response headers
      res.append('Accept-Encoding', 'gzip;q=0,br,compress,deflate,sdch')
      logger.debug(`Headers in [messenger:controllers]: ${JSON.stringify(proxyRes.headers)}`)

      /* Send the response back to user */
      res.status(proxyRes.statusCode as number).json(JSON.parse(body))
      res.end();


    });
  },
}

export const jokesApiProxyMiddleware = createProxyMiddleware(jokesApiProxyOptions)
export const mangaApiProxyMiddleware = createProxyMiddleware(mangaApiProxyOptions)