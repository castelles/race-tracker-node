const express = require('express')
const Category = require('../model/category')

const router = new express.Router()
router.post('/category', async (req, res) => {
    const category = new Category({
        ...req.body
    })

    try {
        await category.save()
        res.status(201).send(category)
    } catch (err) {
        console.log(err)
        if (err.message.endsWith('required.')) {
            return res.status(400).send('Bad request')
        }
        res.status(500).send(err)
    }
})

router.get('/category', async (req, res) => {
    const categories = await Category.find()
    res.status(200).send(categories)
})

router.get('/category/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const category = await Category.findOne({ _id })
        if (!category) {
            return res.status(404).send()
        }
        res.send(category)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

module.exports = router