var _ = require('lodash');
var json = require('./data.json');

var storage = require('../build/lib/games/storage');

_.each(json, function(i) {
    //console.log(i);

    var scores = i.score.split('-');
    console.log(scores);

    var x = {
        when: i.date,
        homeTeam: i.home,
        homeScore: scores[0],
        awayTeam: i.away,
        awayScore: scores[1],
    };

    storage.insert(x);
});
