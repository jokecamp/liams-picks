"use strict";
var request = require('supertest');
var debug = require('debug')('liams');
var logger = require('winston');
var app = require('../../lib/server');
describe('Root', function () {
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
        var league = {
            name: 'Mock League',
        };
        request(app)
            .post('/leagues')
            .set('Accept', 'application/json')
            .expect(200)
            .send(league)
            .end(function (err, res) {
            if (err) {
                logger.error(res.body);
                return done(err);
            }
            done();
        });
    });
});
