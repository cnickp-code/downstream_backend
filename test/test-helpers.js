// const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        {
            id: 1,
            user_name: 'Crayzix',
            password: 'password1',
            email: 'nick@nick.com'
        },
        {
            id: 2,
            user_name: 'Zixith',
            password: 'password2',
            email: 'carlo@carlo.com'
        },
        {
            id: 3,
            user_name: 'Zero',
            password: 'password3',
            email: 'mark@mark.com'
        },
        {
            id: 4,
            user_name: 'Bigbarrels',
            password: 'password4',
            email: 'mario@mario.com'
        },
        {
            id: 5,
            user_name: 'Liquid',
            password: 'password5',
            email: 'hayden@hayden.com'
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
            description: 'test description 1',
            platform: 'twitch',
            genre: 'house',
            start_date: '2029-01-22T16:28:32.615Z',
            end_date: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 2,
            name: 'Test Event 2',
            image_url: 'http://placehold.it/500x500',
            info_url: 'https://www.google.com',
            description: 'test description 2',
            platform: 'plamp',
            genre: 'other',
            start_date: '2029-01-22T16:28:32.615Z',
            end_date: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 3,
            name: 'Test Event 3',
            image_url: 'http://placehold.it/500x500',
            info_url: 'https://www.google.com',
            description: 'test description 3',
            platform: 'youtube',
            genre: 'dubstep',
            start_date: '2029-01-22T16:28:32.615Z',
            end_date: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 4,
            name: 'Test Event 4',
            image_url: 'http://placehold.it/500x500',
            info_url: 'https://www.google.com',
            description: 'test description 4',
            platform: 'facebook',
            genre: 'multi',
            start_date: '2029-01-22T16:28:32.615Z',
            end_date: '2029-01-22T16:28:32.615Z'
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

function makeMaliciousEvent() {
    const maliciousEvent = {
        id: 911,
        name: 'Bad Event <script>alert("xss");</script>',
        image_url: 'http://placehold.it/500x500',
        info_url: 'https://www.google.com',
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

module.exports = {
    makeEventsArray,
    makeMaliciousEvent,
    makeUsersArray
}