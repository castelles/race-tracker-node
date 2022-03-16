const express = require('express')
const { send } = require('process')
const Car = require('../model/car')

const router = new express.Router()

router.post('/cars', async (req, res) => {
    const car = new Car({
        ...req.body
    })

    try {
        await car.save()
        res.status(201).send(car)
    } catch (err) {
        console.log(err.message)
        if (err.message.endsWith('\"category\"'))
            return res.status(404).send()
        res.status(500).send()
    }
})

router.get('/cars', async (req, res) => {
    const {
        limit,
        offset,
        orderBy
    } = req.query

    var parsedOffset = 0
    if (offset) 
        parsedOffset = offset

    var parsedLimit = 10
    if (limit)
        parsedLimit = limit

    var order = -1
    if (orderBy) {
        if (orderBy === 'asc') order = 1
        else if (orderBy === 'desc') order = -1
        else return res.status(400).send()
    }

    const sort = {
        'createdAt': order
    }

    const cars = await Car.find(null, null, {
        limit: parseInt(parsedLimit),
        skip: parseInt(parsedOffset),
        sort
    })
    res.status(200).send(cars)
})

router.get('/cars/:categoryId', async (req, res) => {
    const match = { category: req.params.categoryId }

    const {
        limit,
        offset,
        orderBy
    } = req.query

    var parsedOffset = 0
    if (offset) 
        parsedOffset = offset

    var parsedLimit = 10
    if (limit)
        parsedLimit = limit

    var order = -1
    if (orderBy) {
        if (orderBy === 'asc') order = 1
        else if (orderBy === 'desc') order = -1
        else return res.status(400).send()
    }

    const sort = {
        'createdAt': order
    }

    const cars = await Car.find(
        match,
        null,
        {
            limit: parseInt(parsedLimit),
            skip: parseInt(parsedOffset),
            sort
        }
    ) 

    res.send(cars)
})

router.patch('/cars/:id', async (req, res) => {
    const car = await Car.findById(req.params.id)

    const updates = Object.keys(req.body)
    if (!car) {
        return res.status(404).send()
    }

    try {
        updates.forEach((update) => car[update] = req.body[update])
        await car.save()
        res.send(car)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

router.delete('/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        await car.remove()
        res.send(car)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

module.exports = router