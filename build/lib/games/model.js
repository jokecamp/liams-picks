"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require('../common-models/base');
var storage_1 = require('./storage');
var storage = new storage_1.GameStorage('games');
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.apply(this, arguments);
    }
    Game.ROUTE = 'games';
    return Game;
}(base_1.BaseModel));
exports.Game = Game;
