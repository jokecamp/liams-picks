let CONFIG = require('config');

var _ = require('lodash');
import * as Models from './models';

function getPicks() {
    // generate fake data

    var user = _.shuffle(getUsers())[0];
    let picks: Array<Models.Pick> = [];

    for (var x = 1; x <= 10; x++) {

        let p = new Models.Pick();
        p.gameId = 100 + x;
        p.homeScore = 1;
        p.awayScore = 2;
        p.userId = user.userId;

        if (x === 2) p.isBonus = true;

        picks.push(p);
    }

    return picks;
}

var names = ['Joe', 'Liam', 'Pat', 'Josh', 'Adam', 'Ryan'];

function getUsers() {
    let users: Array<Models.User> = [];

    for (var x = 1; x <= 3; x++) {

        let p = new Models.User();
        p.userId = 20 + x;
        p.name = _.shuffle(names)[0];
        users.push(p);
    }

    return users;
}

export function getData() {
    return {
        picks: getPicks(),
        users: getUsers()
    };
}
