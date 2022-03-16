const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
})

categorySchema.virtual('cars', {
    ref: 'Cars',
    localField: '_id',
    foreignField: 'category'
})

categorySchema.virtual('rounds', {
    ref: 'Rounds',
    localField: '_id',
    foreignField: 'category'
})

categorySchema.methods.toJSON = function () {
    const category = this

    const publicCategory = category.toObject()
    delete publicCategory.__v

    return publicCategory
}

const Category = mongoose.model('Category', categorySchema)

module.exports = Category