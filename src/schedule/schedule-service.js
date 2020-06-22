const EventsService = require('../events/events-service')

const ScheduleService = {
    getScheduleById(knex, id) {
        return knex
            .from('downstream_schedule')
            .select('*')
            .where('id', id)
    },
    getUserById(knex, id) {
        return knex
            .from('downstream_users')
            .select('*')
            .where('id', id)
            .first()
    },
    serializeSchedule(knex, id) {
        let currentEvent

        EventsService.getById(knex, id)
            .then(event => {
                currentEvent = EventsService.serializeEvents(event)
            })
        return currentEvent;
    }

}

module.exports = ScheduleService