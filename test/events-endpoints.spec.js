const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');
const helpers = require('./test-helpers');
const { makeEventsArray } = require('./test-helpers');
const { expect } = require('chai');

describe('Events Endpoints', () => {
  let db;

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

  describe('GET /api/events', () => {
    it('Should return 200 and empty array', () => {
      return supertest(app)
        .get('/api/events')
        // .set('authorization', 'bearer secret')
        .expect(200, []);
    })

    context('With data in the table', () => {
      let testEvents = helpers.makeEventsArray();

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

    context('Given an XSS attack', () => {
      const { maliciousEvent, cleanedEvent } = helpers.makeMaliciousEvent();

      beforeEach('insert malicious event and users', () => {
        return db
          .into('downstream_events')
          .insert(maliciousEvent)
          .then()
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/events`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].name).to.eql(cleanedEvent.name)
            expect(res.body[0].description).to.eql(cleanedEvent.description)
          })
      })
    })

  });

  describe('GET /api/events/:event_id', () => {
    const testUsers = helpers.makeUsersArray();
    const validUser = testUsers[0];

    beforeEach(() => 
      helpers.seedUsers(db, testUsers)
    )

    context('Given no events', () => {
      it('responds with 404', () => {
        const eventId = 123456
        return supertest(app)
          .get(`/api/events/${eventId}`)
          .set('Authorization', helpers.makeAuthHeader(validUser))
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
          .set('Authorization', helpers.makeAuthHeader(validUser))
          .expect(200, expectedEvent)
      })
    })


  });

  describe('DELETE /api/events/:event_id', () => {
    context('Given no event', () => {
      const testUsers = helpers.makeUsersArray();
      const testEvents = helpers.makeEventsArray();
      const testSchedule = helpers.makeScheduleArray();

      beforeEach('Insert test events', () => {
          return helpers.seedSchedule(
            db,
            testUsers,
            testEvents,
            testSchedule
        )
      })

      it('Responds with 404', () => {
        const eventId = 123456;
        const validUser = testUsers[0];

        return supertest(app)
          .delete(`/api/events/${eventId}`)
          .set('Authorization', helpers.makeAuthHeader(validUser))
          .expect(404)
      })
    })

    context('Given event is in database', () => {
      const testUsers = helpers.makeUsersArray();
      const testEvents = helpers.makeEventsArray();
      const testSchedule = helpers.makeScheduleArray();

      beforeEach('Insert test events', () => {
          return helpers.seedSchedule(
            db,
            testUsers,
            testEvents,
            testSchedule
        )
      })

      it('Responds with 204 and removes event', () => {
        const idToDelete = 2;
        const validUser = testUsers[0];
        const expectedEvents = testEvents.filter(event => event.id !== idToDelete);

        return supertest(app)
          .delete(`/api/events/${idToDelete}`)
          .set('Authorization', helpers.makeAuthHeader(validUser))
          .expect(204)
          .then(res => {
            return supertest(app)
              .get('/api/events')
              .expect(expectedEvents)
          })
      })
    })
  })


  describe('POST /api/events', () => {
    const testUsers = helpers.makeUsersArray();
    const validUser = testUsers[0];

    beforeEach(() => 
      helpers.seedUsers(db, testUsers)
    )

    it('Should return 201 and the new event with valid data', () => {
      const newEvent = {
        name: 'Test Event 5',
        image_url: 'https://www.yahoo.com',
        info_url: 'https://www.yahoo.com',
        stream_url: 'https://www.yahoo.com',
        description: 'test description 5',
        platform: 'twitch',
        genre: 'dubstep',
        start_date: '2029-01-22T16:28:32.615Z',
        end_date: '2029-01-22T16:28:32.615Z'
      };

      return supertest(app)
        .post('/api/events')
        .set('Authorization', helpers.makeAuthHeader(validUser))
        .send(newEvent)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.eql(newEvent.name)
          expect(res.body.image_url).to.eql(newEvent.image_url)
          expect(res.body.info_url).to.eql(newEvent.info_url)
          expect(res.body.stream_url).to.eql(newEvent.stream_url)
          expect(res.body.description).to.eql(newEvent.description)
          expect(res.body.platform).to.eql(newEvent.platform)
          expect(res.body.genre).to.eql(newEvent.genre)
          expect(res.body.start_date).to.eql(newEvent.start_date)
          expect(res.body.end_date).to.eql(newEvent.end_date)
        })
        .then(res => {
          return supertest(app)
            .get(`/api/events/${res.body.id}`)
            .set('Authorization', helpers.makeAuthHeader(validUser))
            .expect(res.body)
        })
    })
  })

})