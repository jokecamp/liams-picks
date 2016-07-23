let request = require('supertest');
let debug = require('debug')('liams');
let chai = require('chai');
let assert = chai.assert;

let logger = require('winston');
import * as app from '../../lib/server';

let game: any = null;
let gameHref: string = null;

logger.set = 'debug';

describe('Games', function() {

    it('Create Game - POST Game', function(done) {

        let item = {
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
            .end(function(err: any, res: any) {

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

    it('Update Game - PUT Game', function(done) {

        let item = game;
        item.when = new Date();

        request(app)
            .put(gameHref)
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function(err: any, res: any) {

                console.log(res.body);
                var updated = res.body;
                //assert.equal('Mock League Updated', updated.name);

                if (err) {
                    logger.error(res.body);
                    return done(err);
                }
                done();
            });
    });

    it('Delete Game - DELETE Game', function(done) {

        request(app)
            .delete(gameHref)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err: any, res: any) {

                if (err) {
                    logger.error(err);
                    logger.error(res.body || null);
                    return done(err);
                }
                done();
            });
    });


});
