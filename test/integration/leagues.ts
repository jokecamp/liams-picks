let request = require('supertest');
let debug = require('debug')('liams');

import * as logger from 'winston';
import * as app from '../../lib/server';

describe('Root', function() {

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

        var league = {
            name: 'Mock League',
        };

        request(app)
            .post('/leagues')
            .set('Accept', 'application/json')
            .expect(200)
            .send(league)
            .end(function(err: any, res: any) {

                if (err) {
                    logger.error(res.body);
                    return done(err);
                }
                done();
            });

    });

});
