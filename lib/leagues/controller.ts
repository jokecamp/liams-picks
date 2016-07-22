let CONFIG = require('config');

import * as express from "express";
import * as data from '../data';
import { League } from './model';

export function getLeagues(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    return League.getAll()
        .then(function(items: League[]) {
            return res.json(items);
        }).catch(next);
};

export function postLeague(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    let league = League.parseFromReq(req);

    return league.create()
        .then(function(inserted: League) {
            return res.json(inserted);
        }).catch(next);
};

export function putById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    let league = League.parseFromReq(req);
    league.leagueId = req.params.leagueId;

    return league.update()
        .then(function(item: League) {
            return res.json(item);
        }).catch(next);
}

export function getById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    var id = req.params.leagueId;

    return League.getById(id)
        .then(function(item: League) {
            return res.json(item);
        }).catch(next);
}

export function deleteById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    var id = req.params.leagueId;

    return League.deleteById(id)
        .then(function() {
            return res.json({});
        }).catch(next);
}
