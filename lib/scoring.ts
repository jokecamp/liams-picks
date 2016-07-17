var CONFIG = require('config');
var logger = require('winston');
var _ = require('lodash');

import * as Models from './models';

export function compute(picks: Models.Picks, results: Models.Resuts) {
    logger.info('Running scoring compute');

    _.each(results, function(result: any) {

        var pick = _.find(picks, function(p: Models.IResult) {
            return p.gameId === result.gameId;
        });

        if (pick === null) {
            pick = {
                gameId: result.gameId
            };
        }

        pick.pointsEarned = getPointsEarnedForGame(pick, result);
    });

    return false;
};

export function getPointsEarnedForGame(pick: Models.IResult, result: Models.IResult) {

    logger.info('Result: %s vs Pick: %s',
        JSON.stringify(result), JSON.stringify(pick));


    if (pick === null) {
        logger.info('user did not have picks');
        return 0;
    }

    if (pick.homeScore === result.homeScore &&
        pick.awayScore === result.awayScore) {
        logger.info('user picked the exact score.');
        return 3;
    } else {
        logger.info('user had incorrect score picks.');
        return 0;
    }
};
