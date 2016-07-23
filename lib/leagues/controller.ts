let CONFIG = require('config');

import * as express from "express";
import * as errors from '../errors';
import { League } from './model';
import { IRestController } from '../bases/IRestController';

export class LeagueController implements IRestController {

    getItems(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        return League.getAll()
            .then(function(items: League[]) {
                return res.json(items);
            }).catch(next);
    };

    postItem(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let league = League.parseFromReq(req);

        return league.create()
            .then(function(inserted: League) {
                return res.json(inserted);
            }).catch(next);
    };

    putItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let league = League.parseFromReq(req);

        return league.update()
            .then(function(item: League) {
                return res.json(item);
            }).catch(next);
    }

    getItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.leagueId;

        return League.getById(id)
            .then(function(item: League) {

                if (item === null) {
                    return errors.itemNotFound(req, res, next);
                }

                return res.json(item);
            }).catch(next);
    }

    deleteItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.leagueId;

        return League.deleteById(id)
            .then(function() {
                return res.json({});
            }).catch(next);
    }
}
