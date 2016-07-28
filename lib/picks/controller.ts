let CONFIG = require('config');

import * as express from "express";
import * as errors from '../errors';
import { Pick } from './model';
import { IRestController } from '../bases/IRestController';

export class PickController implements IRestController {

    getItems(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let resWithItems = function(items: Pick[]) {
            return res.json(items);
        }

        return Pick.getAll()
            .then(resWithItems)
            .catch(next);
    };

    postItem(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let pick = Pick.parseFromReq(req);

        let resWithItem = function(inserted: Pick) {
            return res.json(inserted);
        };

        return pick.create()
            .then(resWithItem)
            .catch(next);
    };

    putItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let pick = Pick.parseFromReq(req);

        let resWithItem = function(inserted: Pick) {
            return res.json(inserted);
        };

        return pick.update()
            .then(resWithItem)
            .catch(next);
    }

    getItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.pickId;

        let resWithItem = function(item: Pick) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        };

        return Pick.getById(id)
            .then(resWithItem)
            .catch(next);
    }

    deleteItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.pickId;

        let resWithOk = function() {
            var json = {
                code: 200,
                message: 'item was deleted'
            };
            return res.json(json);
        };

        return Pick.deleteById(id)
            .then(resWithOk)
            .catch(next);
    }
}
