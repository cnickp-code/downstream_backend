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
const usersRouter = require('./users/users-router')

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

app.use('/api/events', eventsRouter)
app.use('/api/schedule', scheduleRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)


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