import express from 'express';
import * as controller from './controllers'
import * as strategy from '../../core/auth'

const router = express.Router();


/* Proxy to the Jokes API */
router.get('/jokes/:id',
    //  [strategy.isAuthenticated], 
    controller.jokesApiProxyMiddleware);

/* Proxy to the KITSU Manga API */
router.get('/manga',
    // [strategy.isAuthenticated], 
    controller.mangaApiProxyMiddleware);
router.get('/manga/:id', [strategy.isAuthenticated], controller.mangaApiProxyMiddleware);

export default router;