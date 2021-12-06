const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(__dirname);
console.log(__filename);
//console.log(path.join(__dirname, '../public'))


const app = express();

// Defiine Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me'
    })
})

app.get('/product', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    else {
        res.send({
            product: []
        })
    }
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful Text',
        name: 'Andrew Mead'
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        helpText: 'Help article not found'
    })
})
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })
app.get('/weather', (req, res) => {
    console.log(req.query)
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Adresss is required'
        })
    }
    else {
        geocode(address, (error, { latitude, longitude, location } = {}) => {

            if (error) {
                return res.send({ 'Error': error })
            }

            forecast(latitude, longitude, (error, forecastData) => {

                if (error) {
                    return res.send({ 'Error': error })
                }

                res.send({
                    Location: location,
                    forecastData: forecastData,
                    address: address
                })

            })

        })
    }

})

app.get('*', (req, res) => {
    res.render('notfound', {
        helpText: '404 NOt Found'
    })
})
app.listen(3000, () => {
    console.log('Server is Up on port 3000')
})