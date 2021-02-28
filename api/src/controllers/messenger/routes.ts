import express from 'express';
import * as strategy from '../../core/auth'
import controllers from './controllers';

const router = express.Router();

/* Proxy to the Jokes API */
router.get('/jokes', [strategy.isAuthenticated], controllers.create);

/* Proxy to the KITSU Manga API */
router.get('/manga/:id', [strategy.isAuthenticated], controllers.show);

export default router;
