import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.post('/send', controllers.create);
router.get('/:id', controllers.show);

export default router;
