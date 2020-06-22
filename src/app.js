require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const winston = require('winston')
const eventsRouter = require('./events/events-router')
const genresRouter = require('./genres/genres-router')
const scheduleRouter = require('./schedule/schedule-router')
const authRouter = require('./auth/auth-router')

const app = express()

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'info.log' })
    ]
});

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

// app.use(function validateBearerToken(req, res, next) {
//     const apiToken = process.env.API_TOKEN
//     const authToken = req.get('Authorization')
//     console.log(`ApiToken: ${apiToken}`)
//     console.log(authToken);


//     if (!authToken || authToken.split(' ')[1] !== apiToken) {
//         logger.error(`Unauthorized request to path: ${req.path}`);
//         return res.status(401).json({ error: 'Unauthorized request' })
//     }
//     // move to the next middleware
//     next()
// })

app.use('/api/events', eventsRouter)
// app.use('/api/genres', genresRouter)
app.use('/api/schedule', scheduleRouter)
// app.use('/api/auth', authRouter)


app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.log(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app