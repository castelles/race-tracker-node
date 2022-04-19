const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '"name" parameter not found on request body.'],
        trim: true
    },
    plate: {
        type: String,
        unique: [true, 'Plate value is already in use. Register another car.'],
        uppercase: true,
        trim: true
    },
    model: {
        type: String,
        required: false,
        trim: true
    },
    owner: {
        type: String,
        required: false,
        trim: true,
        default: "NO OWNER"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Car does not have a category associated. Send category field in the request body.'],
        ref: 'Category'
    } 
}, {
    timestamps: true,
    versionKey: false
})

carSchema.virtual('laptimes', {
    ref: 'Laptime',
    localField: '_id',
    foreignField: 'car'
})

carSchema.virtual('tracks', {
    ref: 'Track',
    localField: '_id',
    foreignField: 'car'
})

carSchema.pre('find', async function (next) {
    this.populate('category')
    next()
})


carSchema.pre('findOne', async function (next) {
    this.populate('category')
    next()
})

carSchema.methods.toJSON = function () {
    const car = this

    const publicCar = car.toObject()
    delete publicCar.createdAt
    delete publicCar.updatedAt

    return publicCar
}

const Car = mongoose.model('Car', carSchema)

module.exports = Car