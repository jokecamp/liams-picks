let CONFIG = require('config');

let logger = require('winston');
import * as express from "express";
import * as errors from '../errors';
import { Game } from './model';
import { IRestController } from '../bases/IRestController';

export class GameController implements IRestController {

    getItems(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let resWithItems = function(items: Game[]) {
            return res.json(items);
        }

        return Game.getAll()
            .then(resWithItems)
            .catch(next);
    };

    postItem(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let game = Game.parseFromReq(req);
        logger.info(game);

        let resWithItem = function(inserted: Game) {
            return res.json(inserted);
        };

        return game.create()
            .then(resWithItem)
            .catch(next);
    };

    putItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        let game = Game.parseFromReq(req);

        let resWithItem = function(inserted: Game) {
            return res.json(inserted);
        };

        return game.update()
            .then(resWithItem)
            .catch(next);
    }

    getItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.gameId;

        // prepare the successul func
        let resWithItem = function(item: Game) {
            if (item === null) {
                return errors.itemNotFound(req, res, next);
            }
            return res.json(item);
        };

        return Game.getById(id)
            .then(resWithItem)
            .catch(next);
    }

    deleteItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        var id = req.params.gameId;

        let resWithOk = function() {
            var json = {
                code: 200,
                message: 'item was deleted'
            };
            return res.json(json);
        };

        return Game.deleteById(id)
            .then(resWithOk)
            .catch(next);
    }
}
