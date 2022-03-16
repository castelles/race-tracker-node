const mongoose = require('mongoose')

const mongodb_url = 'mongodb://127.0.0.1:27017/race-tracker-api'
mongoose.connect(mongodb_url, {
    useNewUrlParser: true
})