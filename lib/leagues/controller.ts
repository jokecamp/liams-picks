let CONFIG = require('config');
import * as express from "express";
import * as data from '../data';
import * as Models from '../models';
import * as storage from './storage';

export function getLeagues(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    return storage.getAll().then(function(items: any) {
        return res.json(items);
    });
};

export function postLeague(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    let league = new Models.League();
    league.name = req.body.name;

    return storage.insert(league)
        .then(function() {
            return res.json(league);
        });;
};
