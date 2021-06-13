const express = require('express')
const router = express.Router()

const data = require('../data/data.json')

router.get('/suggestions', (req, res) => {
    res.json(data.suggestions)
})

router.get('/meals', (req, res) => {
    res.json(data.meals)
})

module.exports = router