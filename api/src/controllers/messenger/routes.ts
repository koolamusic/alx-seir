import express from 'express';
import * as strategy from '../../core/auth'

import controllers from './controllers';

const router = express.Router();

router.post('/send', controllers.create);
router.get('/:id', [strategy.isAuthenticated], controllers.show);

export default router;
