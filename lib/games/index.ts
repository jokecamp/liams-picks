import * as CONFIG from 'config';
import * as express from 'express';

import { GameController } from './controller';

let router = express.Router();
let controller = new GameController();

router.get('/', controller.getItems);
router.post('/', controller.postItem);
router.get('/:gameId', controller.getItemById);
router.put('/:gameId', controller.putItemById);
router.delete('/:gameId', controller.deleteItemById);

export = router;
