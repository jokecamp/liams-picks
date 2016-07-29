import * as CONFIG from 'config';
import * as express from 'express';

import { LeagueUserController } from './controller';

let router = express.Router();

let controller = new LeagueUserController();

router.get('/', controller.getItems);
router.post('/', controller.postItem);
router.get('/:leagueUserId', controller.getItemById);
router.put('/:leagueUserId', controller.putItemById);
router.delete(':leagueUserId', controller.deleteItemById);

export = router;
