let CONFIG = require('config');

var _ = require('lodash');
import * as Models from './models';
import { Pick } from './picks/model';
import { User } from './users/model';

function getPicks() {
    // generate fake data

    var user = _.shuffle(getUsers())[0];
    let picks: Array<Pick> = [];

    for (var x = 1; x <= 10; x++) {

        let p = new Pick();
        p.gameId = "100" + x;
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
    let users: Array<User> = [];

    for (var x = 1; x <= 3; x++) {

        let p = new User();
        p.userId = "20" + x;
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
