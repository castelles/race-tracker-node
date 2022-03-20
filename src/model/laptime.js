const mongoose = require('mongoose')

const laptime = new mongoose.Schema({
    time: {
        type: String,
        trim: true,
        require: true,
    },
    car: {
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
    this.populate('car').populate('round')
    next()
})

laptime.pre('findOne', async function (next) {
    this.populate('car').populate('round')
    next()
})

laptime.statics.findMax = async function () {
    const fastestLap = await Laptime
        .findOne() 
        .sort('time')
        
    return fastestLap
}

laptime.statics.findWithNoRound = async function (roundId) {
    const laptimes = await Laptime.find ({ round: roundId }).sort('time')
    const laps = []
    for (const laptime of laptimes) {
        const {_id, time, car} = laptime
        laps.push({
            _id,
            time,
            car
        })
    }
    return laps
}

laptime.methods.toJSON = function () {
    const laptime = this

    const publicLap = laptime.toObject()
    delete publicLap.__v
    delete publicLap.car.createdAt
    delete publicLap.car.updatedAt
    delete publicLap.car.__v
    delete publicLap.round.__v

    return publicLap
}

const Laptime = mongoose.model('Laptime', laptime)
module.exports = Laptime
