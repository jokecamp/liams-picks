let CONFIG = require('config');

import * as express from "express";
import * as errors from '../errors';
import { LeagueUser } from './model';
import { IRestController } from '../bases/IRestController';

export class LeagueUserController implements IRestController {

    getItems(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let resWithItems = function(items: LeagueUser[]) {
            return res.json(items);
        }

        return LeagueUser.getAll()
            .then(resWithItems)
            .catch(next);
    };

    postItem(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let league = LeagueUser.parseFromReq(req);

        let resWithItem = function(inserted: LeagueUser) {
            return res.json(inserted);
        };

        return league.create()
            .then(resWithItem)
            .catch(next);
    };

    putItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let league = LeagueUser.parseFromReq(req);

        let resWithItem = function(inserted: LeagueUser) {
            return res.json(inserted);
        };

        return league.update()
            .then(resWithItem)
            .catch(next);
    }

    getItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.leagueId;

        let resWithItem = function(item: LeagueUser) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        };

        return LeagueUser.getById(id)
            .then(resWithItem)
            .catch(next);
    }

    deleteItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.leagueId;

        let resWithOk = function() {
            var json = {
                code: 200,
                message: 'item was deleted'
            };
            return res.json(json);
        };

        return LeagueUser.deleteById(id)
            .then(resWithOk)
            .catch(next);
    }
}
