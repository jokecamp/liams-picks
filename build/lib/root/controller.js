"use strict";
var model_1 = require('./model');
function getRoot(req, res, next) {
    var root = new model_1.Root();
    root.addLink('leagues', ['leagues']);
    root.addLink('rounds', ['rounds']);
    root.addLink('games', ['games']);
    root.addLink('picks', ['picks']);
    root.addLink('users', ['users']);
    return res.json(root);
}
exports.getRoot = getRoot;
;
