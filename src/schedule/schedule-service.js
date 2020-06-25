const EventsService = require('../events/events-service')
const xss = require('xss')

const ScheduleService = {
    getScheduleByUserId(knex, id) {
        return knex
            .from('downstream_schedule')
            .join('downstream_events', 'downstream_events.id', 'event_id')
            .select('*')
            .select(
                knex.raw(
                    '"downstream_schedule"."id" AS "schedule_id"'
                )
            )
            .where('user_id', id)
            .orderBy('schedule_id')
    },
    getUserById(knex, id) {
        return knex
            .from('downstream_users')
            .select('*')
            .where('id', id)
            .first()
    },
    getById(knex, id) {
        return knex
            .from('downstream_schedule')
            .select('*')
            .where('id', id)
            .first()
    },
    deleteScheduleEvent(knex, id) {
        return knex('downstream_schedule')
            .where({ id })
            .delete()
    },
    serializeSchedule(schedule) {
        return {
            id: schedule.schedule_id,
            event_id: schedule.event_id,
            name: xss(schedule.name),
            image_url: schedule.image_url,
            stream_url: schedule.stream_url,
            info_url: schedule.info_url,
            description: xss(schedule.description),
            platform: schedule.platform,
            genre: schedule.genre,
            start_date: new Date(schedule.start_date),
            end_date: new Date(schedule.end_date)
        }
    }


}

module.exports = ScheduleService