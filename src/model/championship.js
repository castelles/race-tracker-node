const mongoose = require('mongoose')

const championshipSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
})

championshipSchema.virtual('rounds', {
    ref: 'Round',
    localField: '_id',
    foreignField: 'championship'
})

championshipSchema.methods.toJSON = function () {
    const championship = this

    const public = championship.toObject()
    delete public.__v

    return public
}

const Championship = mongoose.model('Championship', championshipSchema)
module.exports = Championship