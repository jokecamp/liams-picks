let request = require('supertest');
let debug = require('debug')('liams');
let chai = require('chai');
let assert = chai.assert;

let logger = require('winston');
import * as app from '../../lib/server';

let league: any = null;
let leagueHref: string = null;

let game: any = null;
let gameHref: string = null;

logger.set = 'debug';

describe('Leagues', function() {

    it('GET / root', function(done) {

        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err: any, res: any) {

                debug(res.body);

                if (err) {
                    logger.error(res.body);
                    return done(err);
                }
                done();
            });
    });

    it('Create League - POST League', function(done) {

        let item = {
            name: 'Mock League',
        };

        request(app)
            .post('/leagues')
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function(err: any, res: any) {

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

    it('Update League - PUT League', function(done) {

        let item = league;
        item.name = 'Mock League Updated';
        request(app)
            .put(leagueHref)
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function(err: any, res: any) {

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

    it('Delete League - DELETE League', function(done) {

        request(app)
            .delete(leagueHref)
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
