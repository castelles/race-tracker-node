const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name parameter not found on request body.'],
        unique: [true, 'Category name already exists.'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'description parameter not found on request body.'],
        trim: true
    }
}, {
    versionKey: false
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

    return publicCategory
}

const Category = mongoose.model('Category', categorySchema)

module.exports = Category