require('./db/mongoose')
const express = require("express")
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')
const {errorController} = require('./controller/ErrorController')
const categoryRouter = require('./routers/category')
const carRouter = require('./routers/car')
const roundRouter = require('./routers/round')
const { router, registerLap } = require('./routers/laptime')
const championshipRouter = require('./routers/championship')
const { trackRouter } = require('./routers/track')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

//Insert Routes
app.use(categoryRouter)
app.use(carRouter)
app.use(roundRouter)
app.use(router) //laptimeRouter
app.use(championshipRouter)
app.use(trackRouter)

app.use(errorController)

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {
    socket.emit('onConnection', 'Socket connected')
    socket.on('registerLap', message => {
        console.log(`registering lap`)
        registerLap(message, resultMessage => {
            io.emit('message', resultMessage)
            io.emit('toWebsite', message)
        })
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})