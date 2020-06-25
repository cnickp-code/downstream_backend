const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function makeUsersArray() {
    return [
        {
            id: 1,
            user_name: 'Crayzix',
            password: 'password1',
            email: 'nick@nick.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 2,
            user_name: 'Zixith',
            password: 'password2',
            email: 'carlo@carlo.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 3,
            user_name: 'Zero',
            password: 'password3',
            email: 'mark@mark.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 4,
            user_name: 'Bigbarrels',
            password: 'password4',
            email: 'mario@mario.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 5,
            user_name: 'Liquid',
            password: 'password5',
            email: 'hayden@hayden.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
    ]
}

function makeEventsArray() {
    return [
        {
            id: 1,
            name: 'Test Event 1',
            image_url: 'https://www.google.com',
            info_url: 'https://www.google.com',
            stream_url: 'https://www.google.com',
            description: 'test description 1',
            platform: 'twitch',
            genre: 'house',
            start_date: '2029-01-22T16:28:32.615Z',
            end_date: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 2,
            name: 'Test Event 2',
            image_url: 'http://placehold.it/500x500',
            info_url: 'https://www.google.com',
            stream_url: 'https://www.google.com',
            description: 'test description 2',
            platform: 'plamp',
            genre: 'other',
            start_date: '2029-01-22T16:28:32.615Z',
            end_date: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 3,
            name: 'Test Event 3',
            image_url: 'http://placehold.it/500x500',
            info_url: 'https://www.google.com',
            stream_url: 'https://www.google.com',
            description: 'test description 3',
            platform: 'youtube',
            genre: 'dubstep',
            start_date: '2029-01-22T16:28:32.615Z',
            end_date: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 4,
            name: 'Test Event 4',
            image_url: 'http://placehold.it/500x500',
            info_url: 'https://www.google.com',
            stream_url: 'https://www.google.com',
            description: 'test description 4',
            platform: 'facebook',
            genre: 'multi',
            start_date: '2029-01-22T16:28:32.615Z',
            end_date: '2029-01-22T16:28:32.615Z',
        },
    ]
}

function makeScheduleArray() {
    return [
        {
            id: 1,
            user_id: 1,
            event_id: 3
        },
        {
            id: 2,
            user_id: 1,
            event_id: 2
        },
        {
            id: 3,
            user_id: 1,
            event_id: 1
        },
        {
            id: 4,
            user_id: 2,
            event_id: 1
        },
        {
            id: 5,
            user_id: 2,
            event_id: 4
        },
        {
            id: 6,
            user_id: 3,
            event_id: 1
        },
        {
            id: 7,
            user_id: 3,
            event_id: 3
        },
        {
            id: 8,
            user_id: 4,
            event_id: 2
        },
    ]
}

// function makeGenresArray() {
//     return [
//         {
//             id: 1,
//             type: 'house'
//         },
//         {
//             id: 2,
//             type: 'dubstep'
//         },
//         {
//             id: 3,
//             type: 'trance'
//         },
//         {
//             id: 4,
//             type: 'trap'
//         },
//         {
//             id: 5,
//             type: 'techno'
//         },
//         {
//             id: 6,
//             type: 'dnb'
//         },
//         {
//             id: 7,
//             type: 'experimental'
//         },
//         {
//             id: 8,
//             type: 'mixed'
//         },
//         {
//             id: 9,
//             type: 'other'
//         }
//     ]
// }

// function eventsWithGenres() {
//     return [
//         {
//             id: 1,
//             event_id: 1,
//             genre_id: 2
//         },
//         {
//             id: 2,
//             event_id: 1,
//             genre_id: 3
//         },
//         {
//             id: 3,
//             event_id: 2,
//             genre_id: 4
//         },
//         {
//             id: 4,
//             event_id: 3,
//             genre_id: 8
//         },
//         {
//             id: 5,
//             event_id: 2,
//             genre_id: 5
//         },
//         {
//             id: 6,
//             event_id: 4,
//             genre_id: 2
//         },
//         {
//             id: 7,
//             event_id: 1,
//             genre_id: 2
//         },
//         {
//             id: 8,
//             event_id: 1,
//             genre_id: 2
//         }
//     ]
// }

// function makeEventsWithGenres(events, genres) {
//     const eventsWithGenres = events.map(event => {

//     })
// }

function seedUsers(db, users) {
        const preppedUsers = users.map(user => {
            let { id, ...newUser } = user;
            newUser.password = bcrypt.hashSync(user.password, 1);
            
            return newUser
    })
    return db
        .into('downstream_users')
        .insert(preppedUsers)
        .then(() => db.raw(`SELECT setval('downstream_users_id_seq', ?)`, [users[users.length - 1].id] ))
}

function cleanTables(db) {
    return db.transaction(trx => 
        trx.raw(
            `
            TRUNCATE downstream_schedule CASCADE;
            TRUNCATE downstream_users CASCADE;
            TRUNCATE downstream_events CASCADE;
            `
        )
        .then(() => 
            Promise.all([
                trx.raw(`ALTER SEQUENCE downstream_users_id_seq minvalue 0 START WITH 1`),
                trx.raw(`ALTER SEQUENCE downstream_events_id_seq minvalue 0 START WITH 1`),
                trx.raw(`ALTER SEQUENCE downstream_schedule_id_seq minvalue 0 START WITH 1`),
                trx.raw(`SELECT setval('downstream_users_id_seq', 0)`),
                trx.raw(`SELECT setval('downstream_events_id_seq', 0)`),
                trx.raw(`SELECT setval('downstream_schedule_id_seq', 0)`),
            ])
        )
    )
}

function seedSchedule(db, users, events, schedule) {
    
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('downstream_events').insert(events.map(event => {
            let { id, ...newEvent } = event

            return newEvent;
        }))
        await trx.raw(`SELECT setval('downstream_events_id_seq', ?)`, [events[events.length - 1].id])
        await trx.into('downstream_schedule').insert(schedule.map(item => {
            let { id, ...newSchedule } = item

            return newSchedule;
        }))
        await trx.raw(`SELECT setval('downstream_events_id_seq', ?)`, [schedule[schedule.length - 1].id])
    })
}

function makeMaliciousEvent() {
    const maliciousEvent = {
        id: 911,
        name: 'Bad Event <script>alert("xss");</script>',
        image_url: 'http://placehold.it/500x500',
        info_url: 'https://www.google.com',
        stream_url: 'https://www.google.com',
        description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
        platform: 'facebook',
        genre: 'multi',
        start_date: '2029-01-22T16:28:32.615Z',
        end_date: '2029-01-22T16:28:32.615Z'
    }

    const cleanedEvent = {
        ...maliciousEvent,
        name: 'Bad Event &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
        maliciousEvent,
        cleanedEvent
    }

}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256'
    })
    return `Bearer ${token}`
}

module.exports = {
    makeEventsArray,
    makeUsersArray,
    makeScheduleArray,

    makeMaliciousEvent,
    cleanTables,
    seedUsers,
    seedSchedule,
    makeAuthHeader
}