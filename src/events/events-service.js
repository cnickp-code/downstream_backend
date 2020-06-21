const EventsService = {
    getAllEvents(knex) {
        return knex
            .select('*')
            .from('downstream_events')
    },
    insertEvent(knex, newEvent) {
        return knex
            .insert(newEvent)
            .into('downstream_events')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex
            .from('downstream_events')
            .select('*')
            .where('id', id)
            .first()
    },
    deleteEvent(knex, id) {
        return knex('downstream_events')
            .where({ id })
            .delete()
    }
}

module.exports = EventsService
