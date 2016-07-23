/// <reference path="../typings/globals/mocha/index.d.ts" />

let debug = require('debug')('liams');
let chai = require('chai');
let assert = chai.assert;

import * as scoring from '../lib/scoring';
import { IResult } from '../lib/common-models/result';

describe('Scoring', function() {

    it('User does not have picks = 0 points', function() {

        let pick: IResult = null;
        let result: IResult = {
            gameId: '123213123',
            home: {score: 0 },
            away: {score: 0 },
        };

        assert.equal(scoring.getPointsEarnedForGame(pick, result), 0);
    });

    it('User has wrong picks = 0 points', function() {

        let pick: IResult = {
            gameId: '123213123',
            home: {score: 1 },
            away: {score: 1 },
        };
        let result: IResult = {
            gameId: '123213123',
            home: {score: 0 },
            away: {score: 0 },
        };

        assert.equal(scoring.getPointsEarnedForGame(pick, result), 0);
    });

    it('User has correct picks = 3 points', function() {

        let pick: IResult = {
            gameId: '123213123',
            home: {score: 0 },
            away: {score: 0 },
        };
        let result: IResult = {
            gameId: '123213123',
            home: {score: 0 },
            away: {score: 0 },
        };

        assert.equal(scoring.getPointsEarnedForGame(pick, result), 3);
    });

});
