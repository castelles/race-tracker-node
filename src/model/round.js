const mongoose = require('mongoose')
const Category = require('./category')

const roundSchema = new mongoose.Schema({
    name: {
        type: Number,
        required: true,
        trim: true,
        default: 1,
        enum: [1, 2, 3, 4, 5]
    },
    championship: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Championship'
    }
})

roundSchema.virtual('laptimes', {
    ref: 'Laptime',
    localField: '_id',
    foreignField: 'round'
})

roundSchema.pre('find', async function (next) {
    this.populate('championship')
    next()
})

roundSchema.pre('findOne', async function (next) {
    this.populate('championship')
    next()
})

roundSchema.methods.toJSON = function () {
    const round = this
    const publicRound = round.toObject()
    delete publicRound.__v
    delete publicRound.championship.__v

    return publicRound
}

const Round = mongoose.model('Round', roundSchema)

module.exports = Round