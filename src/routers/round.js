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

const getCategory = async function (categoryId) {
    return await Category.findById(categoryId)
}

const updateList = async function (rounds) {
    const list = []
    rounds.forEach((round) => {
        getCategory(round.categoryId).then((result) => {
            list.push({ ...round, result })
        })
    })
    return list
}

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