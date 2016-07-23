"use strict";
var request = require('supertest');
var debug = require('debug')('liams');
var chai = require('chai');
var assert = chai.assert;
var logger = require('winston');
var app = require('../../lib/server');
var league = null;
var leagueHref = null;
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
    it('Create League - POST League', function (done) {
        var item = {
            name: 'Mock League'
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
    it('Delete League - DELETE League', function (done) {
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
