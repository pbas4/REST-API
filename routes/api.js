'user strict'

const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')

// Get a list of ninjas from the db
router.get('/ninjas', (req, res, next) => {
    // Ninja.findByIdAndUpdate({}).then((ninjas) => {
    //     res.send(ninjas)
    // })

    Ninja.aggregate().near({
        near: { type: "Point", coordinates: [parseFloat(req.query.lng) , parseFloat(req.query.lat)] },
                    distanceField: "dist.calculated",
                    maxDistance: 100000,
                    spherical: true
        }).then(function(ninjas){
            res.send(ninjas);
        }).catch(next);
})

// Add a ninja to db
router.post('/ninjas', (req, res, next) => {
    Ninja.create(req.body).then((ninja) => {
        res.send(ninja)
    }).catch(next)
})

// Update a ninja in the db
router.put('/ninjas/:id', (req, res, next) => {
    const id = req.params.id    
    Ninja.findByIdAndUpdate({ _id: id }, req.body).then(() => {
        Ninja.findOne({ _id: id }).then((ninja) => {
            res.send(ninja)
        })
    })
})

// Delete a ninja from de db
router.delete('/ninjas/:id', (req, res, next) => {
    const id = req.params.id
    Ninja.findByIdAndRemove({ _id: id }).then((ninja) => {
        res.send(ninja)
    })
})


module.exports = router