let request = require('supertest');
let debug = require('debug')('liams');
let chai = require('chai');
let assert = chai.assert;

let logger = require('winston');
import * as app from '../../lib/server';

let userId: string = '2bb5687c-0895-4497-a25d-6d1bce4bcd04';

let league: any = null;
let leagueHref: string = null;

let game: any = null;
let gameHref: string = null;

let pick: any = null;
let pickHref: string = null;

let round: any = null;
let roundHref: string = null;

let user: any = null;
let userHref: string = null;

let leagueUser: any = null;
let leagueUserHref: string = null;

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

    it('Create User League Owner', function(done) {

        let item = {
            name: 'John Doe',
            username: 'jdoe',
            email: 'jdoe@gmail.com',
            password: 'jdoe@gmail.com'
        };

        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function(err: any, res: any) {

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

    it('Set a League Admin', function(done) {

        let item = {
            userId: user.userId,
            leagueId: league.leagueId,
            isAdmin: true
        };

        request(app)
            .post('/league-users')
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function(err: any, res: any) {

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

    it('Create Round - POST Round', function(done) {

        let item = {
            leagueId: league.leagueId,
            number: 1
        };

        request(app)
            .post('/rounds')
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function(err: any, res: any) {

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

    it('Update Round - PUT Round', function(done) {

        let item = round;
        item.number = 2;

        request(app)
            .put(roundHref)
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function(err: any, res: any) {

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

    it('Create Game - POST Game', function(done) {

        let item = {
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
            .end(function(err: any, res: any) {

                game = res.body;
                console.log(game);
                gameHref = game.links[0].href

                assert.equal('Manchester United', game.home.team);
                assert.equal('Arsenal', game.away.team);
                assert.equal(3, game.home.score, 'home score wrong');
                assert.equal(0, game.away.score, 'away score wrong');
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

    it('Create Pick by user id- POST Pick', function(done) {

        let item = {
            user:{
                userId:  user.userId
            },
            gameId: game.gameId,
            home: {
                score: 2
            },
            away: {
                score: 1
            },
            isFinal: true
        };

        console.log(item);
        request(app)
            .post('/picks')
            .set('Accept', 'application/json')
            .expect(200)
            .send(item)
            .end(function(err: any, res: any) {

                pick = res.body;
                console.log(pick);
                pickHref = pick.links[0].href

                assert.equal(3, game.home.score);
                assert.equal(0, game.away.score);

                if (err) {
                    logger.error(res.body);
                    return done(err);
                }
                done();
            });
    });

    it('Create Pick by user token - POST Pick', function(done) {

        let item = {
            user: {
                token: user.token
            },
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
            .end(function(err: any, res: any) {

                pick = res.body;
                console.log(pick);
                pickHref = pick.links[0].href

                assert.equal(3, game.home.score);
                assert.equal(0, game.away.score);

                if (err) {
                    logger.error(res.body);
                    return done(err);
                }
                done();
            });
    });

    it.skip('Delete Game - DELETE Game', function(done) {

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

    it.skip('Delete Round - DELETE Round', function(done) {

        request(app)
            .delete(roundHref)
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

    it.skip('Delete League - DELETE League', function(done) {

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
