const express = require('express')
const ScheduleService = require('./schedule-service')
const scheduleRouter = express.Router()

scheduleRouter
    .route('/:user_id')
    .all((req, res, next) => {
        ScheduleService.getUserById(
            req.app.get('db'),
            req.params.user_id
        )
        .then(user => {
            if(!user) {
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
        ScheduleService.getScheduleById(req.app.get('db'), res.user.id)
            .then(schedule => {
                res.json(schedule.map(schedule => {
                    return ScheduleService.serializeSchedule(req.app.get('db'), schedule.event_id)
                }))
            })
    })

module.exports = scheduleRouter