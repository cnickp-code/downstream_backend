const express = require('express')
const EventsService = require('./events-service')
const eventsRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth')


const bodyParser = express.json();

eventsRouter
    .route('/')
    .get((req, res, next) => {
        EventsService.getAllEvents(req.app.get('db'))
            .then(events => {
                res.json(events.map(EventsService.serializeEvents));
            })
            .catch(next);
    })
    .post(requireAuth, bodyParser, (req, res, next) => {
        const { name, image_url, info_url, stream_url, description, platform, genre, start_date, end_date } = req.body
        const newEvent = { name, image_url, info_url, stream_url, description, platform, genre, start_date, end_date }

        for(const [key, value] of Object.entries(newEvent)) {
            if(value == null) {
                return res.status(404).json({
                    error: { message: `Missing '${key}' in request body`}
                })
            }
        }

        EventsService.insertEvent(req.app.get('db'), newEvent)
            .then(event => {
                res
                    .status(201)
                    .location(`/api/events/${event.id}`)
                    .json(EventsService.serializeEvents(event))
            })
    })

eventsRouter
    .route('/:event_id')
    .all(requireAuth)
    .all((req, res, next) => {
        EventsService.getById(
            req.app.get('db'),
            req.params.event_id
        )
        .then(event => {
            if(!event) {
                return res.status(404).json({
                    error: { message: `Event doesn't exist`}
                })
            }
            res.event = event
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res
            .status(200)
            .json(EventsService.serializeEvents(res.event))
    })
    .delete((req, res, next) => {
        const knexInstance = req.app.get('db')

        EventsService.deleteEvent(knexInstance, req.params.event_id)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = eventsRouter;