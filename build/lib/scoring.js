var CONFIG = require('config');
var logger = require('winston');
var _ = require('lodash');
var compute = function (picks, results) {
    logger.info('Running scoring compute');
    _.each(results, function (result) {
        var pick = _.find(picks, function (p) {
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
var getPointsEarnedForGame = function (pick, result) {
    logger.info('Result: %s vs Pick: %s', JSON.stringify(result), JSON.stringify(pick));
    if (pick === null) {
        logger.info('user did not have picks');
        return 0;
    }
    if (pick.homeScore === result.homeScore &&
        pick.awayScore === result.awayScore) {
        logger.info('user picked the exact score.');
        return 3;
    }
    else {
        logger.info('user had incorrect score picks.');
        return 0;
    }
};
module.exports = {
    compute: compute,
    getPointsEarnedForGame: getPointsEarnedForGame
};
