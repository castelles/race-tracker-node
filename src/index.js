require('./db/mongoose')
const express = require("express")
const cors = require('cors')
const categoryRouter = require('./routers/category')
const carRouter = require('./routers/car')
const roundRouter = require('./routers/round')
const lapRouter = require('./routers/laptime')
const championshipRouter = require('./routers/championship')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

//Insert Routes
app.use(categoryRouter)
app.use(carRouter)
app.use(roundRouter)
app.use(lapRouter)
app.use(championshipRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})