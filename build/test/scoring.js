"use strict";
var debug = require('debug')('liams');
var chai = require('chai');
var assert = chai.assert;
var scoring = require('../lib/scoring');
describe('Scoring', function () {
    it('User does not have picks = 0 points', function () {
        var pick = null;
        var result = {
            gameId: '123213123',
            homeScore: 0,
            awayScore: 0
        };
        assert.equal(scoring.getPointsEarnedForGame(pick, result), 0);
    });
    it('User has wrong picks = 0 points', function () {
        var pick = {
            gameId: '123213123',
            homeScore: 1,
            awayScore: 1
        };
        var result = {
            gameId: '123213123',
            homeScore: 0,
            awayScore: 0
        };
        assert.equal(scoring.getPointsEarnedForGame(pick, result), 0);
    });
    it('User has correct picks = 3 points', function () {
        var pick = {
            gameId: '123213123',
            homeScore: 0,
            awayScore: 0
        };
        var result = {
            gameId: '123213123',
            homeScore: 0,
            awayScore: 0
        };
        assert.equal(scoring.getPointsEarnedForGame(pick, result), 3);
    });
});
