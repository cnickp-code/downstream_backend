const EventsService = require('../events/events-service')

const ScheduleService = {
    getScheduleByUserId(knex, id) {
        return knex
            .from('downstream_schedule')
            .join('downstream_events', 'downstream_events.id', 'event_id')
            .select('*')
            .where('user_id', id)

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
                console.log(currentEvent)
                return currentEvent
            })
        // console.log('SMILE')
        // console.log(currentEvent)
        // return currentEvent;
    },


}

module.exports = ScheduleService