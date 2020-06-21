const express = require('express')
const EventsService = require('./events-service')
const eventsRouter = express.Router();

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

eventsRouter
    .route('/:event_id')
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
        res.json({
            id: res.event.id,
            name: res.event.name,
            image_url: res.event.image_url,
            info_url: res.event.info_url,
            description: res.event.description,
            platform: res.event.platform,
            start_date: new Date(res.event.start_date),
            end_date: new Date(res.event.end_date)
        })
    })

module.exports = eventsRouter;