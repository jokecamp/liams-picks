let CONFIG = require('config');
import * as express from "express";

export function getPicks(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    return res.json(null);
};
