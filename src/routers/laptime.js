const express = require('express')
const Laptime = require('../model/laptime')

const router = new express.Router()
router.post('/laptime/registerLap', async (req, res) => {
    const lap = new Laptime({
        ...req.body
    })

    try {
        await lap.save()
        res.status(201).send(lap)
    } catch (error) {
        console.log({ error })
        res.status(500).send(error.message)
    }
})

router.get('/laptime/car/:carId',  async (req, res) => {
    const asc = 1
    const lap = await Laptime.find({ car: req.params.carId }, null, {
        sort: { time: asc }
    })
    if (!lap) {
        return res.status(404).send()
    }
    res.status(200).send(lap)
})

router.get('/laptime/overall/best', async (req, res) => {
    const lap = await Laptime.findMax()
    res.send(lap)
})

router.get('/laptime/bestfive', async (req, res) => {
    const asc = 1
    const lap = await Laptime.find(null, null, {
        limit: 5
    }).sort('time')
    res.send(lap)
})

router.get('/laptime/byRounds/:id', async (req, res) => {
    
})

module.exports = router