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
    },
    serializeEvents(event) {
        return {
            id: event.id,
            name: event.name,
            image_url: event.image_url,
            info_url: event.info_url,
            description: event.description,
            platform: event.platform,
            start_date: new Date(event.start_date),
            end_date: new Date(event.end_date)
        }
    }
}

module.exports = EventsService
