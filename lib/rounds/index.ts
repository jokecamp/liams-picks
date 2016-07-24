import * as CONFIG from 'config';
import * as express from 'express';

import { RoundController } from './controller';

let router = express.Router();
let controller = new RoundController();

router.get('/', controller.getItems);
router.post('/', controller.postItem);
router.get('/:roundId', controller.getItemById);
router.put('/:roundId', controller.putItemById);
router.delete('/:roundId', controller.deleteItemById);

export = router;
