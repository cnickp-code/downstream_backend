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

    describe('GET /api/schedule/', () => {
        context('Given valid user', () => {
            const testSchedule = helpers.makeScheduleArray();

            beforeEach('insert test schedule', () => {
                return helpers.seedSchedule(
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
                    // ev['event_id'] = ev['id']
                    // ev['id'] = sched.id

                    expectedResult.push({
                        ...ev,
                        id: sched.id,
                        event_id: ev.id
                    })
                })

                return supertest(app)
                    .get(`/api/schedule/`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[userId - 1]))
                    .expect(200, expectedResult)

            })
        })
    })

    describe('DELETE /api/schedule/:schedule_id', () => {


        context('Given no schedule', () => {
            const testSchedule = helpers.makeScheduleArray();
            beforeEach('insert test schedule', () => {
                return helpers.seedSchedule(
                    db,
                    testUsers,
                    testEvents,
                    testSchedule
                )
            })
            it('Responds with 404', () => {
                const scheduleId = 123456
                const validUser = testUsers[0];
                return supertest(app)
                    .delete(`/api/schedule/${scheduleId}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(404)
            })
        })

        context('Given schedule in database', () => {
            const testSchedule = helpers.makeScheduleArray();

            beforeEach('insert test schedule', () => {
                return helpers.seedSchedule(
                    db,
                    testUsers,
                    testEvents,
                    testSchedule
                )
            })

            it('Responds with 204 and removes scheduled event', () => {
                const idToDelete = 2;
                const userId = 1;
                const expectedSchedule = testSchedule.filter(sched => sched.id !== idToDelete).filter(sched => sched.user_id === userId)
                const expectedEventObject = expectedSchedule.map(item => {
                    let newItem = testEvents.find(event => event.id === item.event_id)
                    const event_id = newItem.id;
                    const newObject = {
                        id: item.id,
                        event_id: event_id,
                        name: newItem.name,
                        image_url: newItem.image_url,
                        info_url: newItem.info_url,
                        stream_url: newItem.stream_url,
                        description: newItem.description,
                        platform: newItem.platform,
                        genre: newItem.genre,
                        start_date: newItem.start_date,
                        end_date: newItem.end_date
                    };

                    return newObject;
                })

                return supertest(app)
                    .delete(`/api/schedule/${idToDelete}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(204)
                    .then(res => {
                        return supertest(app)
                            .get('/api/schedule')
                            .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                            .expect(expectedEventObject)
                    })
            })
        })
    })
})