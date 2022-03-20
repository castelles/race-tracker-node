const express = require('express')
const Championship = require('../model/championship')
const Laptime = require('../model/laptime')
const Round = require('../model/round')

const router = express.Router()

router.post('/championship', async (req, res) => {
    const championship = new Championship({
        ...req.body
    })

    try {
        await championship.save()
        res.status(201).send(championship)
    } catch (error) {
        console.log({ error })
        res.status(500).send(error.message)
    }
})

router.get('/championship/:id', async (req, res) => {
    const championship = await Championship.findById(req.params.id)
    if (!championship) {
        return res.status(404).send()
    }
    res.status(200).send(championship)
})

router.patch('/championship/:id', async (req, res) => {
    const championship = await Championship.findById(req.params.id)
    if (!championship) {
        return res.status(404).send()
    }
    const updates = Object.keys(req.body)

    try {
        updates.forEach((update) => championship[update] = req.body[update])
        await championship.save()
        res.send(championship)
    } catch (err) {
        res.status(500).send()
        console.log({ err })
    }
})

const searchLaps = async function(round) {
    const laptimes = await Laptime.findWithNoRound(round._id)
    if (laptimes) {
        const { _id, name } = round
        return  {
            _id, 
            name,
            laptimes
        }
    }
    return null
}

router.get('/championship/:id/finalTable/', async (req, res) => {
    const table = []
    const rounds = await Round
        .find( { championship: req.params.id })
        .sort("name")

    for (const round of rounds) {
        const item = await searchLaps(round)
        if (item) {
            table.push(item)
        }
    }

    res.send(table)
})

module.exports = router