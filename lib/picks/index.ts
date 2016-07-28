import * as CONFIG from 'config';
import * as express from 'express';

import { PickController } from './controller';

let router = express.Router();

let controller = new PickController();

router.get('/', controller.getItems);
router.post('/', controller.postItem);
router.get('/:pickId', controller.getItemById);
router.put('/:pickId', controller.putItemById);
router.delete('/:pickId', controller.deleteItemById);

export = router;
