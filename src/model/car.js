const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    plate: {
        type: String,
        required: true,
        unique: true,
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
        require: true,
        ref: 'Category'
    } 
}, {
    timestamps: true
})

carSchema.virtual('laptime', {
    ref: 'Laptime',
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
    delete publicCar.__v
    delete publicCar.createdAt
    delete publicCar.updatedAt
    delete publicCar.category.__v

    return publicCar
}

const Car = mongoose.model('Car', carSchema)

module.exports = Car