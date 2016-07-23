import * as CONFIG from 'config';
import * as express from 'express';

import * as controller from './controller';

let router = express.Router();


router.get('/', controller.getGames);

/*
router.post('/', controller.postLeague);
router.get('/:gameId', controller.getById);
router.put('/:gameId', controller.putById);
router.delete('/:gameId', controller.deleteById);
*/

export = router;
