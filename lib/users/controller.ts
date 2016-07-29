let CONFIG = require('config');

import * as express from "express";
import * as errors from '../errors';
import { User } from './model';
import { IRestController } from '../bases/IRestController';

export class UserController implements IRestController {

    getItems(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let resWithItems = function(items: User[]) {
            return res.json(items);
        }

        return User.getAll()
            .then(resWithItems)
            .catch(next);
    };

    postItem(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let user = User.parseFromReq(req);

        let resWithItem = function(inserted: User) {
            return res.json(inserted);
        };

        return user.create()
            .then(resWithItem)
            .catch(next);
    };

    putItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let user = User.parseFromReq(req);

        let resWithItem = function(inserted: User) {
            return res.json(inserted);
        };

        return user.update()
            .then(resWithItem)
            .catch(next);
    }

    getItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.userId;

        let resWithItem = function(item: User) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        };

        return User.getById(id)
            .then(resWithItem)
            .catch(next);
    }

    deleteItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.userId;

        let resWithOk = function() {
            var json = {
                code: 200,
                message: 'item was deleted'
            };
            return res.json(json);
        };

        return User.deleteById(id)
            .then(resWithOk)
            .catch(next);
    }
}
