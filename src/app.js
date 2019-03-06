const express = require('express')
const rp = require('request-promise')
const bodyParser = require('body-parser')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicdirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicdirectoryPath))

app.use(bodyParser.json())

// console.log(__dirname)

app.get('/',(req, res)=>{
    res.render('index',{
        title: 'Weahter',
        name: 'SJ'
    })
})


app.get('/about', (req,res)=>{
    res.render('about/about',{
        title: 'About',
        name: 'SJ'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'SJ'
    })
})

app.get('/weather', (req, res)=>{
  if(!req.query.address){
      return res.send({
          error: 'You must provide an address!'
      })
  }
  geocode(req.query.address).then(({latitude, longitude, location }={})=>{
    forecast(latitude, longitude)
    .then(forecastData=>{
        console.log(location)
        console.log(forecastData)
        res.send({
            address: req.query.address,
            location,
            forecast: forecastData
        })

    })
}).catch(err=>{
    return res.send({err})
})
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error/404', {
        title:'404',
        errorMessage: 'Help article not found',
        name: 'SJ'

    })
})


app.get('*',(req, res)=>{
    res.render('error/404', {
        title:'404',
        errorMessage: 'My 404 Page',
        name: 'SJ'
    })
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}.`)
})