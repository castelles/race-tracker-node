const express = require('express')
const { notFound } = require('../controller/ErrorController')
const Car = require('../model/car')
const error = require('../model/error')
const Round = require('../model/round')
const Track = require('../model/track')

const router = new express.Router()

router.post('/track', async (req, res, next) => {
    try {
        const car = await Car.findById(req.body.car)
        if (!car) return notFound(400, 'Car')
        const round = await Round.findById(req.body.round)
        if (!round) return notFound(400, 'Round')

        const track = new Track({
            ...req.body
        })
        await track.save()  
        res.status(201).send()  
    } catch (error) {
        next(err)
    }
})

router.get('/track/current', async (req, res, next) => {
    try {
        const track = await Track.find({ onTrack: true })
        if(!track) 
            return res.status(404).send(
                error(404, 'Track is empty.', 'There are no cars on track.')
            ) 
        res.send(track)
    } catch (err) {
        next(err)
    }
})

const leaveTrack = async body => {
    try {
        const car = await Car.findById(body.car)
        console.log(body.car)
        if (!car) {
            console.log('no car')
            return
        }
        const round = await Round.findById(body.round)
        if (!round) {
            console.log('no round') 
            return 
        }
        const track = await Track.findOne({ 
            car: body.car, 
            round: body.round,
            onTrack: true
        })
        if(track) {
            track.onTrack = false
            await track.save()
        }
    } catch (err) {
        throw err
    }
}

module.exports = { trackRouter: router, leaveTrack }