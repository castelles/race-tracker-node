const express = require('express')
const Category = require('../model/category')
const Round = require('../model/round')

const router = new express.Router()
router.post('/rounds', async (req, res) => {

    const round = new Round({
        ...req.body
    })

    try {
        await round.save()
        res.status(201).send(round)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

router.get('/rounds', async (req, res) => {
    const asc = 1
    const rounds = await Round.find(null, null, {
        sort: {
            name: asc
        }
    })
    res.send(rounds)  
})

router.get('/rounds/:id', async (req, res) => {
    const round = await Round.findById(req.params.id)
    res.send(round)
})

module.exports = router