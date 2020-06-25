const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const { makeEventsArray, makeScheduleArray, makeUsersArray } = require('./test-helpers')

describe('Auth Endpoints', function () {
    let db

    const testUsers = makeUsersArray();
    const testEvents = makeEventsArray();
    const testSchedule = makeScheduleArray();

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    before('clean db', () => helpers.cleanTables(db))
    afterEach('clean db', () => helpers.cleanTables(db))
    after('end connection', () => db.destroy())

    describe('Protected endpoints', () => {
        beforeEach('insert data into tables', () => {
            return helpers.seedSchedule(
                db,
                testUsers,
                testEvents,
                testSchedule
            )
        })

        const protectedEndpoints = [
            {
                name: 'GET /api/events/:event_id',
                path: '/api/events/1'
            },
            {
                name: 'GET /api/schedule',
                path: '/api/schedule'
            },
            {
                name: 'GET /api/schedule/:schedule_id',
                path: '/api/schedule'
            }
        ]

        protectedEndpoints.forEach(endpoint => {
            describe(endpoint.name, () => {
              it(`responds with 401 'Missing bearer token' when no bearer token`, () => {
                return supertest(app)
                  .get(endpoint.path)
                  .expect(401, { error: `Missing bearer token` })
              })
      
              it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
                const validUser = testUsers[0]
                const invalidSecret = 'bad-secret'
                return supertest(app)
                  .get(endpoint.path)
                  .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
                  .expect(401, { error: `Unauthorized request` })
              })
      
              it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
                const invalidUser = { user_name: 'user-not-existy', id: 1}
                return supertest(app)
                  .get(endpoint.path)
                  .set('Authorization', helpers.makeAuthHeader(invalidUser))
                  .expect(401, { error: `Unauthorized request` })
              })
            })
          })
    })
})
