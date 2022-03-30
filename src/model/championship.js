const mongoose = require('mongoose')

const championshipSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name parameter not found on request body.']
    }
}, {
    versionKey: false
})

championshipSchema.virtual('rounds', {
    ref: 'Round',
    localField: '_id',
    foreignField: 'championship'
})

championshipSchema.methods.toJSON = function () {
    const championship = this

    const public = championship.toObject()

    return public
}

const Championship = mongoose.model('Championship', championshipSchema)
module.exports = Championship