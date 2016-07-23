let CONFIG = require('config');

import * as express from "express";
import * as errors from '../errors';
import { Game } from './model';
import { IRestController } from '../bases/IRestController';

export class GameController implements IRestController {

    getItems(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        return Game.getAll()
            .then(function(items: Game[]) {
                return res.json(items);
            }).catch(next);
    };

    postItem(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let game = Game.parseFromReq(req);

        return game.create()
            .then(function(inserted: Game) {
                return res.json(inserted);
            }).catch(next);
    };

    putItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let game = Game.parseFromReq(req);

        return game.update()
            .then(function(item: Game) {
                return res.json(item);
            }).catch(next);
    }

    getItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.gameId;

        return Game.getById(id)
            .then(function(item: Game) {

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

        var id = req.params.gameId;

        return Game.deleteById(id)
            .then(function() {
                return res.json({});
            }).catch(next);
    }
}
