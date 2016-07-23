import * as CONFIG from 'config';
import * as express from 'express';

import { LeagueController } from './controller';

let router = express.Router();

let controller = new LeagueController();

router.get('/', controller.getItems);
router.post('/', controller.postItem);
router.get('/:leagueId', controller.getItemById);
router.put('/:leagueId', controller.putItemById);
router.delete('/:leagueId', controller.deleteItemById);

export = router;
