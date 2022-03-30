const express = require('express')
const { notFound } = require('../controller/ErrorController')
const Car = require('../model/car')
const Laptime = require('../model/laptime')
const Round = require('../model/round')

const router = new express.Router()
router.post('/laptime/registerLap', async (req, res, next) => {
    const lap = new Laptime({
        ...req.body
    })

    try {
        const car = await Car.findById(req.body.car)
        const round = await Round.findById(req.body.round)
        if (!car) {
            return res.status(400).send(
                notFound(400, 'Car')
            )
        }
        if (!round) {
            return res.status(400).send(
                notFound(400, 'Round')
            )
        }

        await lap.save()
        res.status(201).send(lap)
    } catch (error) {
        next(error)
    }
})

router.get('/laptime/car/:carId',  async (req, res, next) => {
    const asc = 1
    try {
        const lap = await Laptime.find({ car: req.params.carId }, null, {
            sort: { time: asc }
        })
        if (!lap) {
            return res.status(400).send(notFound(400, 'Lap'))
        }
        res.send(lap)   
    } catch (err) {
        next(err)
    }
})

router.get('/laptime/overall/best', async (req, res, next) => {
    try {
        const lap = await Laptime.findMax()
        res.send(lap)    
    } catch (err) {
        next(err)
    }
})

router.get('/laptime/bestfive', async (req, res, next) => {
    const asc = 1
    try {
        const lap = await Laptime.find(null, null, {
            limit: 5
        }).sort('time')
        res.send(lap)   
    } catch (err) {
        next(err)
    }
})

router.get('/laptime/byRounds/:id', async (req, res) => {
    
})

module.exports = router