const xss = require('xss');

const EventsService = {
    getAllEvents(knex) {
        return knex
            .select('downstream_events.*')
            .count('downstream_schedule.id')
            .from('downstream_events')
            .leftJoin('downstream_schedule', 'downstream_events.id', 'event_id')
            .groupBy('downstream_events.id')
            .orderBy('downstream_events.id');
    },
    getSearchEvents(knex, search) {
        return knex
            .select('*')
            .from('downstream_events')
            .where({ 
                name: search
            })
            .orderBy('id');
    },
    insertEvent(knex, newEvent) {
        return knex
            .insert(newEvent)
            .into('downstream_events')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },
    getById(knex, id) {
        return knex
            .from('downstream_events')
            .select('*')
            .where('id', id)
            .first();
    },
    deleteEvent(knex, id) {
        return knex('downstream_events')
            .where({ id })
            .delete()
    },
    serializeEvents(event) {
        return {
            id: event.id,
            name: xss(event.name),
            image_url: event.image_url,
            info_url: event.info_url,
            stream_url: event.stream_url,
            description: xss(event.description),
            platform: event.platform,
            genre: event.genre,
            start_date: new Date(event.start_date),
            end_date: new Date(event.end_date),
            event_popularity: event.count,
            artists: event.artists
        };
    }
}

module.exports = EventsService;
