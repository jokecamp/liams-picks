/* run with
    node test/import.js
 */

var rp = require('request-promise');
var _ = require('lodash');

var rounds = require('./epl-schedule-15-16.json');

var leaugeHref = null;
var roundsHref = null;
var gamesHref = null;
var picksHref = null;

function postJson(url, json) {
    var options = {
        method: 'POST',
        uri: url,
        json: true,
        body: json
    };
    return rp(options);
}

function getJson(url) {
    var options = {
        uri: url,
        json: true
    };
    return rp(options);
}

function getHref(links, rel) {
    var match = _.find(links, {
        rel: rel
    });
    if (match) return match.href;
    return null;
}

// Creates the league then each round and each game in the round.
getLinks().then(createLeague);

function getLinks() {
    return getJson('http://localhost:1337').then(function(json) {
        console.log(json);
        leaugeHref = getHref(json.links, 'leagues');
        roundsHref = getHref(json.links, 'rounds');
        gamesHref = getHref(json.links, 'games');
        picksHref = getHref(json.links, 'picks');
    });
}

function createLeague() {

    var l = {
        name: 'EPL 15-16'
    };

    return postJson(leaugeHref, l).then(function(league) {
        console.log(league);

        var i = 1;
        _.each(rounds, function(r) {
            createRound(league.leagueId, i, r);
            i++;
        });

    });
}

function createRound(leagueId, i, r) {
    var num = i;
    var round = {
        leagueId: leagueId,
        number: num,
        deadline: r[0].deadline_time
    };

    return postJson(roundsHref, round).then(function(x) {
        console.log('Round %s added', x.number);

        _.each(r, function(g) {
            createGame(x.roundId, g);
        });

    });

}

function createGame(roundId, game) {

    console.log(game);
    var newGame = {
        roundId: roundId,
        home: {
            team: game.team_h
        },
        away: {
            team: game.team_a
        },
        when: game.kickoff_time
    };

    return postJson(gamesHref, newGame).then(function(y) {
        console.log('game added');
        console.log(y);
    });
}
