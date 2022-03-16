const mongoose = require('mongoose')

const laptime = new mongoose.Schema({
    time: {
        type: String,
        trim: true,
        require: true,
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Car'
    },
    round: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Round'
    }
})

laptime.pre('find', async function (next) {
    this.populate('round')
    next()
})

laptime.pre('findOne', async function (next) {
    this.populate('round')
    next()
})

laptime.methods.TOJSON = function () {
    const laptime = this

    const public = laptime.toObject()
    delete public.__v
    delete public.round.__v

    return public
}

const Laptime = mongoose.model('laptime', laptime)
module.exports = Laptime
