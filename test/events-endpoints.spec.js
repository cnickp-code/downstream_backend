const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');
const helpers = require('./test-helpers');
const { makeEventsArray } = require('./test-helpers');
const { expect } = require('chai');

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

    context('Given an XSS attack', () => {
      const { maliciousEvent, cleanedEvent } = helpers.makeMaliciousEvent();

      beforeEach('insert malicious event', () => {
        return db
          .into('downstream_events')
          .insert(maliciousEvent)
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/events/${maliciousEvent.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.name).to.eql(cleanedEvent.name)
            expect(res.body.description).to.eql(cleanedEvent.description)
          })
      })
    })
  });
  describe('POST /api/events', () => {
    it('Should return 200 and the new event with valid data', () => {
      const newEvent = {
        name: 'Test Event 5',
        image_url: 'https://www.yahoo.com',
        info_url: 'https://www.yahoo.com',
        description: 'test description 5',
        platform: 'twitch',
        genre: 'dubstep',
        start_date: '2029-01-22T16:28:32.615Z',
        end_date: '2029-01-22T16:28:32.615Z'
      }

      return supertest(app)
        .post('/api/events')
        .send(newEvent)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.eql(newEvent.name)
          expect(res.body.image_url).to.eql(newEvent.image_url)
          expect(res.body.info_url).to.eql(newEvent.info_url)
          expect(res.body.description).to.eql(newEvent.description)
          expect(res.body.platform).to.eql(newEvent.platform)
          expect(res.body.genre).to.eql(newEvent.genre)
          expect(res.body.start_date).to.eql(newEvent.start_date)
          expect(res.body.end_date).to.eql(newEvent.end_date)
        })
        .then(res => {
          return supertest(app)
            .get(`/api/events/${res.body.id}`)
            .expect(res.body)
        })
    })
  })

})