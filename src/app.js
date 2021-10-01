const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define for Express Config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlbar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
      res.render('index', {
            title: 'Weather App',
            name: 'Adam Prasetya'
      })
})

app.get('/about', (req, res) => {
      res.render('about', {
            title: 'About Me',
            name: 'Adam Prasetya'
      })
})

app.get('/help', (req, res) => {
      res.render('help', {
            title: 'Help Page',
            name: 'Adam Prasetya'
      })
})

app.get('/weather', (req, res) => {

      if(!req.query.address){
            return res.send({
                  error: "You must provide address."
            })
      }

      const address = req.query.address

      geocode(address, (error, {latitude, longitude, place_name} = {}) => {

            if(error){
                  return res.send({error})
            } 
      
            forecast(latitude, longitude, (error, forecastData) => {
                  if(error){
                        return res.send({error})
                  }

                  
                  res.send({
                        address: req.query.address,
                        location: place_name,
                        forecast: forecastData
                  })

            })
            
      })

})

app.get('/products', (req, res) => {

      if(!req.query.search){
            return res.send({
                  error: "You must provide search term."
            })
      }

      console.log(req.query.search)
      res.send({
            products: []
      })
      
})

app.get('/help/*', (req, res) => {
      res.render('404', {
            title: '404',
            message: 'Article not Found',
            name: 'Adam Prasetya'
      })
})

app.get('*', (req, res) => {
      res.render('404', {
            title: '404',
            message: 'Page not found',
            name: 'Adam Prasetya'
      })
})

app.listen(port, () => {
      console.log('Server Running on Port ' + port)
})