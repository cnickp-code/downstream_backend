const express = require('express')
const ScheduleService = require('./schedule-service')
const EventsService = require('../events/events-service')
const scheduleRouter = express.Router()

scheduleRouter
    .route('/:user_id')
    .all((req, res, next) => {
        ScheduleService.getUserById(
            req.app.get('db'),
            req.params.user_id
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        const userId = res.user.id



        ScheduleService.getScheduleByUserId(req.app.get('db'), res.user.id)
            .then(schedule => {
                const newSchedule = schedule.map(sched => {
                    EventsService.getById(req.app.get('db'), sched.event_id)
                        .then(event => {
                            currentEvent = EventsService.serializeEvents(event)
                            console.log(currentEvent)
                            return currentEvent
                        })
                    
                })

                res
                    .status(200)
                    .json(newSchedule)
            })
    })

module.exports = scheduleRouter