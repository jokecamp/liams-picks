let CONFIG = require('config');

import * as express from "express";
import * as errors from '../errors';
import { Game } from './model';

export function getGames(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    return Game.getAll()
        .then(function(items: Game[]) {
            return res.json(items);
        }).catch(next);
};
