let CONFIG = require('config');
import * as express from 'express';
import * as controller from './controller';
import { Root } from './model';

let router = express.Router();

router.get('/', controller.getRoot);

export = router;
