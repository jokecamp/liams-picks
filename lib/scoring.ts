let CONFIG = require('config');

import * as logger from 'winston';
import * as _ from 'lodash';

import { IResult } from './common-models/result';
import { Pick }  from './picks/model';

export function compute(
    picks: Array<Pick>,
    results: Array<IResult>) {

    logger.info('Running scoring compute');

    _.each(results, function(result: any) {

        let pick: Pick = _.find(picks, function(p: Pick) {
            return p.gameId === result.gameId;
        });

        if (pick === null) {
            pick = new Pick();
            pick.gameId = result.gameId;
        }

        pick.pointsEarned = getPointsEarnedForGame(pick, result);
    });

    return false;
};

export function getPointsEarnedForGame(
    pick: IResult,
    result: IResult) {

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
