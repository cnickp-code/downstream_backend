const express = require('express')
const ScheduleService = require('./schedule-service')
const EventsService = require('../events/events-service')
const scheduleRouter = express.Router()
const { requireAuth } = require('../middleware/jwt-auth')

const bodyParser = express.json();

scheduleRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        const userId = req.user.id

        ScheduleService.getScheduleByUserId(knexInstance, userId)
            .then(schedule => {
                const newSchedule = schedule.map(sched => {
                    return ScheduleService.serializeSchedule(sched)  
                })

                res
                    .status(200)
                    .json(newSchedule)
            })
            
    })
    .post(requireAuth, bodyParser, (req, res, next) => {
        const { event_id } = req.body
        const user_id = req.user.id
        const newScheduleItem = { event_id, user_id }

        for(const [key, value] of Object.entries(newScheduleItem)) {
            if(value == null) {
                return res.status(404).json({
                    error: { message: `Missing '${key}' in request body`}
                })
            }
        }

        ScheduleService.insertSchedule(req.app.get('db'), newScheduleItem)
            .then(item => {
                res
                    .status(201)
                    .location(`/api/schedule/${item.id}`)
                    .json(ScheduleService.serializeScheduleItem(item))
            })
    })

scheduleRouter
    .route('/:schedule_id')
    .all(requireAuth)
    .all((req, res, next) => {
        ScheduleService.getById(
            req.app.get('db'),
            req.params.schedule_id
        )
        .then(schedule => {
            if(!schedule) {
                return res.status(404).json({
                    error: { message: `Schedule item doesn't exist`}
                })
            }
            res.schedule = schedule
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res
            .status(200)
            .json(ScheduleService.serializeScheduleItem(res.schedule))
        
    })
    .delete(bodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')

        ScheduleService.deleteScheduleEvent(knexInstance, req.params.schedule_id)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = scheduleRouter