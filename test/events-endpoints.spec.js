const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');
const helpers = require('./test-helpers');
const { makeEventsArray } = require('./test-helpers');

describe('Events Endpoints', () => {
  let db

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

  describe('GET /api/events', () => {
    it('Should return 200 and empty array', () => {
      return supertest(app)
        .get('/api/events')
        // .set('authorization', 'bearer secret')
        .expect(200, []);
    })

    context('With data in the table', () => {
      const testEvents = helpers.makeEventsArray();

      beforeEach('Insert events', () => {
        return db
          .into('downstream_events')
          .insert(testEvents)
      })
      it('Should return 200 and test data', () => {
        return supertest(app)
          .get('/api/events')
          // .set('authorization', 'bearer secret')
          .expect(200, testEvents)
      })
    })

  });

  describe('GET /api/events/:event_id', () => {
    context('Given no events', () => {
      it('responds with 404', () => {
        const eventId = 123456
        return supertest(app)
          .get(`/api/events/${eventId}`)
          .expect(404, { error: { message: `Event doesn't exist`}})
      })
    })

    context('Given there are events in database', () => {
      const testEvents = helpers.makeEventsArray();

      beforeEach('insert test events', () => {
        return db
            .into('downstream_events')
            .insert(testEvents)
      })

     

      it('responds with 200 and given event', () => {
        const eventId = 1;
        const expectedEvent = testEvents[eventId - 1];

        return supertest(app)
          .get(`/api/events/${eventId}`)
          .expect(200, expectedEvent)
      })
    })
  });


})