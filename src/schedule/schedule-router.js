const express = require('express')
const ScheduleService = require('./schedule-service')
const EventsService = require('../events/events-service')
const scheduleRouter = express.Router()
const { requireAuth } = require('../middleware/jwt-auth')

const jsonBodyParser = express.json();

// req.user.id will be set in auth step. 
// Do not need .all after auth step is taken as well as :user_id

scheduleRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        const userId = req.user.id

        ScheduleService.getScheduleByUserId(knexInstance, userId)
            .then(schedule => {
                const newSchedule = schedule.map(sched => {
                    console.log(sched)
                    return ScheduleService.serializeSchedule(sched)  
                })

                res
                    .status(200)
                    .json(newSchedule)
            })
            
    })

scheduleRouter
    .route('/:schedule_id')
    .delete(requireAuth, jsonBodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')

        ScheduleService.deleteScheduleEvent(knexInstance, req.params.schedule_id)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = scheduleRouter