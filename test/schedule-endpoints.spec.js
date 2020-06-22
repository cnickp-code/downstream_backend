const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');
const helpers = require('./test-helpers');

describe('Schedule Endpoints', () => {
    let db

    let testUsers = helpers.makeUsersArray();
    let testEvents = helpers.makeEventsArray();

    before('setup db', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    const cleanDb = () => db.raw('TRUNCATE downstream_events RESTART IDENTITY CASCADE;');
    before('clean db', cleanDb);
    afterEach('clean db', cleanDb);
    after('end connection', () => db.destroy());

    describe.only('GET /api/schedule/:user_id', () => {
        context('Given invalid user id', () => {
            it('responds with 404', () => {
                const userId = 123456
                return supertest(app)
                    .get(`/api/schedule/${userId}`)
                    .expect(404, { error: { message: `User doesn't exist` }})
            })
        })

        context('Given valid user', () => {
            const testSchedule = helpers.makeScheduleArray();
            const expectedEvent = testEvents[1]

            beforeEach('insert test schedule', () => {
                return db
                    .into('downstream_events')
                    .insert(testEvents)
                    .then(() => {
                        return db
                            .into('downstream_users')
                            .insert(testUsers)
                            .then(() => {
                                return db
                                    .into('downstream_schedule')
                                    .insert(testSchedule)
                            })
                    })

            })

            it('responds with 200 and corresponding events', () => {
                const userId = 4;
                
                return supertest(app)
                    .get(`/api/schedule/${userId}`)
                    .expect(200, expectedEvent)

            })
        })
    })
})