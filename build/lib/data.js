"use strict";
var CONFIG = require('config');
var _ = require('lodash');
var Models = require('./models');
function getPicks() {
    var user = _.shuffle(getUsers())[0];
    var picks = [];
    for (var x = 1; x <= 10; x++) {
        var p = new Models.Pick();
        p.gameId = "100" + x;
        p.homeScore = 1;
        p.awayScore = 2;
        p.userId = user.userId;
        if (x === 2)
            p.isBonus = true;
        picks.push(p);
    }
    return picks;
}
var names = ['Joe', 'Liam', 'Pat', 'Josh', 'Adam', 'Ryan'];
function getUsers() {
    var users = [];
    for (var x = 1; x <= 3; x++) {
        var p = new Models.User();
        p.userId = "20" + x;
        p.name = _.shuffle(names)[0];
        users.push(p);
    }
    return users;
}
function getData() {
    return {
        picks: getPicks(),
        users: getUsers()
    };
}
exports.getData = getData;
