const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// All Characters
router.get('/characters', (req, res) => {
    const URL = 'https://api.sampleapis.com/futurama/info/characters'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/characters', {
                title: 'Futurama Characters',
                name: 'Some Futurama Characters',
                data
            })
        })
})

// Single Characters
router.get('/characters/:id', (req, res) => {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/futurama/characters/${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-characters', {
                    title: 'Single Characters',
                    name: 'Single Characters List',
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})

// All Episodes
router.get('/episodes', (req, res) => {
    const URL = 'https://api.sampleapis.com/futurama/episodes'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/episodes', {
                title: 'Futurama Episodes',
                name: 'Futurama Episodes',
                data
            })
        })
})

// Cast
router.get('/cast', (req, res) => {
    const URL = 'https://api.sampleapis.com/futurama/cast'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/cast', {
                title: 'Futurama Cast Members',
                name: 'Futurama Cast Members',
                data
            })
        })
})

module.exports = router