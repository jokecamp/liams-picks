let CONFIG = require('config');

import * as express from "express";
import * as errors from '../errors';
import { Round } from './model';
import { IRestController } from '../bases/IRestController';

export class RoundController implements IRestController {

    getItems(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let resWithItems = function(items: Round[]) {
            return res.json(items);
        }

        return Round.getAll()
            .then(resWithItems)
            .catch(next);
    };

    postItem(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let round = Round.parseFromReq(req);

        let resWithItem = function(inserted: Round) {
            return res.json(inserted);
        };

        return round.create()
            .then(resWithItem)
            .catch(next);
    };

    putItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let round = Round.parseFromReq(req);

        let resWithItem = function(inserted: Round) {
            return res.json(inserted);
        };

        return round.update()
            .then(resWithItem)
            .catch(next);
    }

    getItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.roundId;

        let resWithItem = function(item: Round) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        };

        return Round.getById(id)
            .then(resWithItem)
            .catch(next);
    }

    deleteItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.roundId;

        let resWithOk = function() {
            var json = {
                code: 200,
                message: 'item was deleted'
            };
            return res.json(json);
        };

        return Round.deleteById(id)
            .then(resWithOk)
            .catch(next);
    }
}
