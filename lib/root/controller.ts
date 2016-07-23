import * as express from "express";
import { Root } from './model';

// root is our landing page that tells the API
// consumer what links are available.
export function getRoot(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    let root = new Root();
    root.addLink('leagues', ['leagues']);
    root.addLink('rounds', ['rounds']);
    root.addLink('games', ['games']);
    root.addLink('picks', ['picks']);

    return res.json(root);
};
