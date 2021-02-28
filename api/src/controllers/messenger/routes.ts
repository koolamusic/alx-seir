import express from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import * as strategy from '../../core/auth'
import controllers from './controllers';

const router = express.Router();

const jokesApiProxyOptions: Options = {
    target: 'https://official-joke-api.appspot.com/',
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
        '^/v1/outbox/jokes': '/jokes', // rewrite path
    }
}

const jokesApiProxyMiddleware = createProxyMiddleware(jokesApiProxyOptions)

/* Proxy to the Jokes API */
router.get('/jokes/:id', [strategy.isAuthenticated], jokesApiProxyMiddleware);

/* Proxy to the KITSU Manga API */
router.get('/manga/:id', [strategy.isAuthenticated], controllers.show);

export default router;