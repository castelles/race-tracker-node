require('./db/mongoose')
const express = require("express")
const error = require('./model/error')
const categoryRouter = require('./routers/category')
const carRouter = require('./routers/car')
const roundRouter = require('./routers/round')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
//Insert Routes
app.use(categoryRouter)
app.use(carRouter)
app.use(roundRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})