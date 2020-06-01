const path = require('path')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')
const express = require('express')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000
console.log(__dirname)
//Define path for express config
const dirpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname,'../templates/partials')

//set handlebar engine and views location
app.set('view engine','hbs')
app.set('views', viewpath)
hbs.registerPartials(partials)
app.use(express.static(dirpath))

//setup static directory to serve   

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        creator: 'Peter'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
        geocode(req.query.address,(error,{longitude,latitude,placename} = {})=>{
                    if(error){
                                     return res.send({error : error})
                            }
                    forecast(latitude,longitude, (error, {weather,temperature,precip,feelslike}) => {
                        if(error){
                            return res.send(error)
                        }
            
                        res.send({
                            placename : placename,
                            weather : weather,
                            temperature : temperature,
                            precip : precip,
                            feelslike : feelslike
                        })
                })
            })

    })

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        creator : 'peter'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        bodytext : 'hello customer',
        creator : 'peter'
    })
})

app.get('/help/*',(req,res)=>{
    res.send('Help article not found')
})


app.get('*',(req,res)=>{
    res.render('404',{  
        title : 404,
        errortext : 'This is the 404 page',
        creator : 'peter'
    })
})

app.listen(port,()=>{
    console.log('Server started and running on port: '+port)
})