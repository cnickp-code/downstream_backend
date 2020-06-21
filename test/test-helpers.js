// const jwt = require('jsonwebtoken')

function makeEventsArray() {
    return [
        {
           id: 1,
           name: 'Test Event 1',
           image_url: 'https://www.google.com',
           info_url: 'https://www.google.com',
           description: 'test description 1',
           platform: 'twitch' ,
           start_date: '2029-01-22T16:28:32.615Z',
           end_date: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 2,
            name: 'Test Event 2',
            image_url: 'https://www.google.com',
            info_url: 'https://www.google.com',
            description: 'test description 2',
            platform: 'plamp', 
            start_date: '2029-01-22T16:28:32.615Z',
            end_date: '2029-01-22T16:28:32.615Z'
        },
    ]
}

module.exports = {
    makeEventsArray,
}