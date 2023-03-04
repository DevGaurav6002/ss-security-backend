const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const usersRoutes = require('./routers/users')

app.use(cors())
app.use(bodyParser.json())

app.use('/users',usersRoutes)

const start = () => {
    app.listen(3000, () => {
        console.log('server is running...')
    })
}

start();