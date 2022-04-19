const mongoose = require('mongoose')

const trackRouter = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Track does not have a car associated. Send car field in the request body.'],
        ref: 'Car'
    },
    round: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Track does not have a round associated. Send round field in the request body.'],
        ref: 'Round'
    },
    onTrack: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false
})

trackRouter.pre('find', async function (next) {
    this.populate('car').populate('round')
})

trackRouter.pre('findOne', async function (next) {
    this.populate('car').populate('round')
})

trackRouter.methods.toJSON = function () {
    const public = this.toObject()
    delete public.onTrack
    return public
}

const Track = mongoose.model('Track', trackRouter)
module.exports = Track