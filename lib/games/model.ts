let _ = require('lodash');
import * as logger from 'winston';
import * as express from "express";
import { IResult } from '../common-models/result';
import { BaseModel } from '../common-models/base'
import { Link } from '../common-models/link'

import { GameStorage, GameRow } from './storage';
let storage: GameStorage = new GameStorage('games');

/*
    A game is a result/fixture.
    It can be scheduled or already completed
*/
export class Game extends BaseModel implements IResult {

    static ROUTE: string = 'games';

    gameId: string;
    roundId: string;

    // how to handle dates?
    when: string;

    home: {
        team: string;
        score: number;
    }

    away: {
        team: string;
        score: number;
    }

    isFinal: boolean;

    constructor() {
        super();
        this.gameId = null;
        this.when = null;
        this.roundId = null;

        this.home = {
            team: null,
            score: null
        };
        this.away = {
            team: null,
            score: null
        };
        this.isFinal = false;
    }

    populateFromRow(row: GameRow) {

        if (row === null) {
            throw new Error('row is null');
        }

        this.gameId = row.id;
        this.when = row.scheduled_at;
        this.roundId = row.round_id;

        this.home.team = row.home_team;
        this.home.score = row.home_score;

        this.away.team = row.away_team;
        this.away.score = row.away_score;

        this.isFinal = row.is_final || false;
        this.roundId = row.round_id || null;

        // load the inherited class BaseModel fromRow
        super.populateFromRow(row);
        this.addLink(Link.REL_SELF, [Game.ROUTE, this.gameId]);
    }

    create() {
        logger.info('Game: create');
        let item: Game = this;
        return storage.insert(item).then(function() {
            return Game.getById(item.gameId);
        });
    }

    update() {
        logger.info('Game: update');
        let item = this;
        return storage.update(item).then(function() {
            return Game.getById(item.gameId);
        });
    }

    /* Statics */
    static parseFromReq(req: express.Request) {
        let game = new Game();

        if (req.params && req.params.gameId) {
            game.gameId = req.params.gameId;
        }

        game.home.team = req.body.home.team;
        game.home.score = req.body.home.score;

        game.away.team = req.body.away.team;
        game.away.score = req.body.away.score;

        game.isFinal = req.body.isFinal;
        game.when = req.body.when;
        game.roundId = req.body.roundId;

        return game;
    }

    static fromRow(row: GameRow) {
        if (row === null) return null;

        var game = new Game();
        game.populateFromRow(row);
        return game;
    }

    static fromRows(rows: Object[]) {
        return _.map(rows, Game.fromRow);
    }

    static getAllByLeague(leagueId: string) {
        logger.info('Game: getAllByLeague');
        return storage.getAllByLeague(leagueId)
            .then(Game.fromRows);
    }

    static getAll() {
        logger.info('Game: getAll');
        return storage.getAll().then(Game.fromRows);
    }

    static getById(id: string) {
        logger.info('Game: getById', id);
        return storage.getById(id).then(Game.fromRow);
    }

    static deleteById(id: string) {
        logger.info('Game: deleteById', id);
        return storage.deleteById(id);
    }
}
