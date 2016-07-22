import * as CONFIG from 'config';
import * as express from 'express';

import * as controller from './controller';

let router = express.Router();

router.get('/', controller.getLeagues);
router.post('/', controller.postLeague);

export = router;
