const express = require('express')
const EventsService = require('./events-service')
const eventsRouter = express.Router();

const bodyParser = express.json();

eventsRouter
    .route('/')
    .get((req, res, next) => {
        EventsService.getAllEvents(req.app.get('db'))
            .then(events => {
                res.json(events);
            })
            .catch(next);
    })

module.exports = eventsRouter;