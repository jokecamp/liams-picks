/// <reference path="../typings/globals/mocha/index.d.ts" />

var debug = require('debug')('liams');
var chai = require('chai');
var assert = chai.assert;

var scoring = require('../lib/scoring.js');

import * as Models from '../lib/models';

describe('Scoring', function() {

    it('User does not have picks = 0 points', function() {

        let pick: Models.IResult = null;
        let result: Models.IResult = {
            gameId: 123213123,
            homeScore: 0,
            awayScore: 0
        };

        assert.equal(scoring.getPointsEarnedForGame(pick, result), 0);
    });

    it('User has wrong picks = 0 points', function() {

        let pick: Models.IResult = {
            gameId: 123213123,
            homeScore: 1,
            awayScore: 1
        };
        let result: Models.IResult = {
            gameId: 123213123,
            homeScore: 0,
            awayScore: 0
        };

        assert.equal(scoring.getPointsEarnedForGame(pick, result), 0);
    });

    it('User has correct picks = 3 points', function() {

        let pick: Models.IResult = {
            gameId: 123213123,
            homeScore: 0,
            awayScore: 0
        };
        let result: Models.IResult = {
            gameId: 123213123,
            homeScore: 0,
            awayScore: 0
        };

        assert.equal(scoring.getPointsEarnedForGame(pick, result), 3);
    });

});
