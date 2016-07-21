let CONFIG = require('config');
import * as express from "express";
import * as data from '../data';

export function getLeagues(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    var leagues: any[] = [];
    return res.json(leagues);
};

export function postLeague(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    var leagues: any[] = [];
    return res.json(leagues);
};
