const mongoose = require('mongoose')

console.log(process.env.MONGODB_URL)
const mongodb_url = process.env.MONGODB_URL
mongoose.connect(mongodb_url, {
    useNewUrlParser: true
})