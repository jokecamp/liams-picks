"use strict";
var CONFIG = require('config');
var logger = require('winston');
var _ = require('lodash');
var model_1 = require('./picks/model');
function compute(picks, results) {
    logger.info('Running scoring compute');
    _.each(results, function (result) {
        var pick = _.find(picks, function (p) {
            return p.gameId === result.gameId;
        });
        if (pick === null) {
            pick = new model_1.Pick();
            pick.gameId = result.gameId;
        }
        pick.pointsEarned = getPointsEarnedForGame(pick, result);
    });
    return false;
}
exports.compute = compute;
;
function getPointsEarnedForGame(pick, result) {
    logger.info('Result: %s vs Pick: %s', JSON.stringify(result), JSON.stringify(pick));
    if (pick === null) {
        logger.info('user did not have picks');
        return 0;
    }
    if (pick.home.score === result.home.score &&
        pick.away.score === result.away.score) {
        logger.info('user picked the exact score.');
        return 3;
    }
    else {
        logger.info('user had incorrect score picks.');
        return 0;
    }
}
exports.getPointsEarnedForGame = getPointsEarnedForGame;
;
