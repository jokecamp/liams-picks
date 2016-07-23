"use strict";
var request = require('supertest');
var debug = require('debug')('liams');
var chai = require('chai');
var assert = chai.assert;
var logger = require('winston');
var app = require('../../lib/server');
var game = null;
var gameHref = null;
logger.set = 'debug';
describe('Games', function () {
    it('Create Game - POST Game', function (done) {
        var item = {
            home: {
                team: "Manchester United",
                score: 3
            },
            away: {
                team: 'Arsenal',
                score: 0
            },
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
    it('Delete Game - DELETE Game', function (done) {
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
});
