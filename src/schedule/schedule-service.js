const xss = require('xss');

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
            .orderBy('schedule_id');
    },
    getSearchSchedule(knex, id, search) {
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
            .where({
                name: search
            })
            .orderBy('schedule_id');
    },
    getUserById(knex, id) {
        return knex
            .from('downstream_users')
            .select('*')
            .where('id', id)
            .first();
    },
    getById(knex, id) {
        return knex
            .from('downstream_schedule')
            .select('*')
            .where('id', id)
            .first();
    },
    insertSchedule(knex, newSchedule) {
        return knex
            .insert(newSchedule)
            .into('downstream_schedule')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },
    deleteScheduleEvent(knex, id) {
        return knex('downstream_schedule')
            .where({ id })
            .delete();
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
            start_date: schedule.start_date,
            end_date: schedule.end_date,
            event_popularity: schedule.count,
            artists: schedule.artists
        };
    },
    serializeScheduleItem(item) {
        return {
            id: item.id,
            event_id: item.event_id,
            user_id: item.user_id
        };
    }


}

module.exports = ScheduleService;