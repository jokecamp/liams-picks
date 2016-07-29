"use strict";
var request = require('supertest');
var debug = require('debug')('liams');
var chai = require('chai');
var assert = chai.assert;
var logger = require('winston');
var app = require('../../lib/server');
var userId = '2bb5687c-0895-4497-a25d-6d1bce4bcd04';
var league = null;
var leagueHref = null;
var game = null;
var gameHref = null;
var pick = null;
var pickHref = null;
var round = null;
var roundHref = null;
var user = null;
var userHref = null;
var leagueUser = null;
var leagueUserHref = null;
logger.set = 'debug';
describe('Leagues', function () {
    it('GET / root', function (done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
            debug(res.body);
            if (err) {
                logger.error(res.body);
                return done(err);
            }
            done();
        });
    });
    it('Create User League Owner', function (done) {
        var item = {
            name: 'John Doe',
            username: 'jdoe',
            email: 'jdoe@gmail.com'
        };
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function (err, res) {
            user = res.body;
            console.log(user);
            userHref = user.links[0].href;
            if (err) {
                logger.error(res.body);
                return done(err);
            }
            done();
        });
    });
    it('Create League - POST League', function (done) {
        var item = {
            name: 'Mock League',
        };
        request(app)
            .post('/leagues')
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function (err, res) {
            league = res.body;
            console.log(league);
            leagueHref = league.links[0].href;
            if (err) {
                logger.error(res.body);
                return done(err);
            }
            done();
        });
    });
    it('Set a League Admin', function (done) {
        var item = {
            userId: user.userId,
            leagueId: league.leagueId,
            isAdmin: true
        };
        request(app)
            .post('/league-users')
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function (err, res) {
            leagueUser = res.body;
            console.log(leagueUser);
            leagueUserHref = leagueUser.links[0].href;
            if (err) {
                logger.error(res.body);
                return done(err);
            }
            done();
        });
    });
    it('Update League - PUT League', function (done) {
        var item = league;
        item.name = 'Mock League Updated';
        request(app)
            .put(leagueHref)
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function (err, res) {
            console.log(res.body);
            var updated = res.body;
            assert.equal('Mock League Updated', updated.name);
            if (err) {
                logger.error(res.body);
                return done(err);
            }
            done();
        });
    });
    it('Create Round - POST Round', function (done) {
        var item = {
            leagueId: league.leagueId,
            number: 1
        };
        request(app)
            .post('/rounds')
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function (err, res) {
            round = res.body;
            console.log(round);
            roundHref = round.links[0].href;
            if (err) {
                logger.error(res.body);
                return done(err);
            }
            done();
        });
    });
    it('Update Round - PUT Round', function (done) {
        var item = round;
        item.number = 2;
        request(app)
            .put(roundHref)
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function (err, res) {
            console.log(res.body);
            var updated = res.body;
            assert.equal(2, round.number);
            if (err) {
                logger.error(res.body);
                return done(err);
            }
            done();
        });
    });
    it('Create Game - POST Game', function (done) {
        var item = {
            roundId: round.roundId,
            home: {
                team: 'Manchester United',
                score: 3
            },
            away: {
                team: 'Arsenal',
                score: 0
            },
            isFinal: true,
            when: new Date()
        };
        request(app)
            .post('/games')
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function (err, res) {
            game = res.body;
            console.log(game);
            gameHref = game.links[0].href;
            assert.equal('Manchester United', game.home.team);
            assert.equal('Arsenal', game.away.team);
            assert.equal(3, game.home.score);
            assert.equal(0, game.away.score);
            assert.isTrue(game.when !== null);
            assert.equal(round.roundId, game.roundId);
            assert.equal(true, game.isFinal);
            if (err) {
                logger.error(res.body);
                return done(err);
            }
            done();
        });
    });
    it('Update Game - PUT Game', function (done) {
        var item = game;
        item.when = new Date();
        request(app)
            .put(gameHref)
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function (err, res) {
            console.log(res.body);
            var updated = res.body;
            if (err) {
                logger.error(res.body);
                return done(err);
            }
            done();
        });
    });
    it('Create Pick - POST Pick', function (done) {
        var item = {
            userId: user.userId,
            gameId: game.gameId,
            home: {
                score: 2
            },
            away: {
                score: 1
            },
            isFinal: true
        };
        request(app)
            .post('/picks')
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function (err, res) {
            pick = res.body;
            console.log(pick);
            pickHref = pick.links[0].href;
            assert.equal(3, game.home.score);
            assert.equal(0, game.away.score);
            if (err) {
                logger.error(res.body);
                return done(err);
            }
            done();
        });
    });
    it.skip('Delete Game - DELETE Game', function (done) {
        request(app)
            .delete(gameHref)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
            if (err) {
                logger.error(err);
                logger.error(res.body || null);
                return done(err);
            }
            done();
        });
    });
    it.skip('Delete Round - DELETE Round', function (done) {
        request(app)
            .delete(roundHref)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
            if (err) {
                logger.error(err);
                logger.error(res.body || null);
                return done(err);
            }
            done();
        });
    });
    it.skip('Delete League - DELETE League', function (done) {
        request(app)
            .delete(leagueHref)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
            if (err) {
                logger.error(err);
                logger.error(res.body || null);
                return done(err);
            }
            done();
        });
    });
});
