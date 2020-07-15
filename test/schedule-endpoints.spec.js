const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');
const helpers = require('./test-helpers');
const { expect } = require('chai');

describe('Schedule Endpoints', () => {
    let db

    let testUsers = helpers.makeUsersArray();
    let testEvents = helpers.makeEventsArray();

    before('setup db', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    })

    before('clean db', () => helpers.cleanTables(db));
    afterEach('clean db', () => helpers.cleanTables(db));
    after('end connection', () => db.destroy());

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
            });

            it('responds with 200 and corresponding events', () => {
                const userId = 4;
                let tempSchedule = testSchedule.filter(sched => sched.user_id === userId);
                let expectedResult = [];

                tempSchedule.forEach(sched => {
                    let ev = testEvents.find(event => event.id === sched.event_id);

                    expectedResult.push({
                        ...ev,
                        id: sched.id,
                        event_id: ev.id
                    });
                })

                return supertest(app)
                    .get(`/api/schedule/`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[userId - 1]))
                    .expect(200, expectedResult)

            })
        })
    })

    describe('GET /api/schedule/:schedule_id', () => {
        context('Should return 200 and given schedule', () => {
            const userId = 4;
            const testSchedule = helpers.makeScheduleArray();
            const validUser = testUsers[userId - 1];
    
            beforeEach('Insert test schedule', () => {
                return helpers.seedSchedule(
                    db,
                    testUsers,
                    testEvents,
                    testSchedule
                )
            })

            it('Responds with 200 and given schedule item', () => {
                const scheduleId = 1;
                const expectedSchedule = testSchedule[scheduleId - 1];

                return supertest(app)
                    .get(`/api/schedule/${scheduleId}`)
                    .set('Authorization', helpers.makeAuthHeader(validUser))
                    .expect(200, expectedSchedule)
            })
        })
    })

    describe('POST /api/schedule', () => {
        context('Should return 200 and the posted schedule item', () => {
            const testUsers = helpers.makeUsersArray();
            const testEvents = helpers.makeEventsArray();
            const testSchedule = helpers.makeScheduleArray();
            const validUser = testUsers[0];

            beforeEach('Insert test events', () => {
                return helpers.seedSchedule(
                    db,
                    testUsers,
                    testEvents,
                    testSchedule
                )
            })

            it('Responds with 201 and added schedule item', () => {
                const newScheduleItem = {
                    id: 9,
                    event_id: 4,
                    user_id: 1
                }



                return supertest(app)
                    .post('/api/schedule')
                    .set('Authorization', helpers.makeAuthHeader(validUser))
                    .send(newScheduleItem)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.be.an('object')
                        expect(res.body.event_id).to.eql(newScheduleItem.event_id)
                        expect(res.body.user_id).to.eql(newScheduleItem.user_id)
                    })
                    .then(res => {
                        return supertest(app)
                            .get(`/api/schedule/${newScheduleItem.id}`)
                            .set('Authorization', helpers.makeAuthHeader(validUser))
                            .expect(res.body)

                    })
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
                const scheduleId = 123456;
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
                const expectedSchedule = testSchedule.filter(sched => sched.id !== idToDelete).filter(sched => sched.user_id === userId);
                const expectedEventObject = expectedSchedule.map(item => {
                    let newItem = testEvents.find(event => event.id === item.event_id);
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