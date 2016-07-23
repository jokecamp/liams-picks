import * as express from "express";

export interface IRestController {

    getItems(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction): any;

    postItem(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction): any;

    putItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction): any;

    getItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction): any;

    deleteItemById(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction): any;
}
