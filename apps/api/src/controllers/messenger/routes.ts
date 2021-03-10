import express from 'express';
import * as proxy from './proxy'
import * as controller from './controller'
import * as strategy from '../../core/auth'

const router = express.Router();


/* Proxy to the Jokes API */
router.get('/jokes/:id', [strategy.isAuthenticated], controller.getJokesController);

/* Proxy to the KITSU Manga API */
router.get('/manga', [strategy.isAuthenticated], controller.getMangasController);
router.get('/manga/:id', [strategy.isAuthenticated], proxy.mangaApiProxyMiddleware);

export default router;