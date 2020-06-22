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
        
    before('clean db', () => helpers.cleanTables(db))
    afterEach('clean db', () => helpers.cleanTables(db))
    after('end connection', () => db.destroy())

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

            console.log()

            beforeEach('insert test schedule', () => {
                helpers.seedSchedule(
                    db,
                    testUsers,
                    testEvents,
                    testSchedule
                )

            })

            it('responds with 200 and corresponding events', () => {
                const userId = 4;
                let tempSchedule = testSchedule.filter(sched => sched.user_id === userId)
                let expectedResult = []

                tempSchedule.forEach(sched => {
                    let ev = testEvents.find(event => event.id === sched.event_id)

                    expectedResult.push(ev)
                })
                
                return supertest(app)
                    .get(`/api/schedule/${userId}`)
                    .expect(200, expectedResult)

            })
        })
    })
})