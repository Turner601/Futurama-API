const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

router.use(express.static('public'))

const futuramaRoutes = require('./api/futuramaRoutes')

router.use('/futurama', futuramaRoutes)


router.get('/characters', (req, res) => {
    const URL = 'https://api.sampleapis.com/futurama/characters'
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        res.render('pages/characters', {
            title: 'Futurama Characters',
            name: 'Futurama Characters',
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
    
// Home Route
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/futurama/info'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'My Site All About Futurama',
                name: 'My Site All About Futurama',
                data
            })
        })
})

router.get('*', (req, res) => {
    if (req.url == '/favicon.ico/') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 Error',
            name: '404 Error'
        })
    }
})

module.exports = router