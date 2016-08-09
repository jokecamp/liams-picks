import * as CONFIG from 'config';
import * as express from 'express';

import { UserController } from './controller';

import { expectPasswordAndHash } from '../passwords';

let router = express.Router();
let controller = new UserController();

router.get('/', controller.getItems);
router.post('/', expectPasswordAndHash, controller.postItem);
router.get('/:userId', controller.getItemById);
router.put('/:userId', controller.putItemById);
router.delete('/:userId', controller.deleteItemById);

export = router;
