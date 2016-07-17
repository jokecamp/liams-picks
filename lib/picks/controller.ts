let CONFIG = require('config');
import * as express from "express";
import * as data from '../data';

export function getPicks(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    var picks = data.getData();
    return res.json(picks);
};
