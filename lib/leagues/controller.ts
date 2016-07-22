let CONFIG = require('config');

import * as express from "express";
import * as data from '../data';
import { League } from './model';

export function getLeagues(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    return League.getAll().then(function(items: League[]) {
        return res.json(items);
    });
};

export function postLeague(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    let league = new League();
    league.name = req.body.name;

    return league.create()
        .then(function() {
            return res.json(league);
        });;
};
