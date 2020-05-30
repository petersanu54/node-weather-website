const path = require('path')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')
const express = require('express')
const app = express()
const hbs = require('hbs')
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

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Peter'
    })
})

app.get('/weather',(req,res)=>{
    // res.render('weather',{
    //     title : 'Weather',
    //     creator : 'peter'
        //     if(!req.query.address){
        // return res.send({
        //     error: 'No address mentioned'
        //     })
        // }
        geocode(req.query.address,(error,{longitude,latitude,placename} = {})=>{
                    if(error){
                                return res.send({error : error})
                            }
                            console.log(latitude)
                            console.log(longitude)
                    forecast(latitude,longitude, (error, {weather,temperature,feels,precip,humidity,wind_speed}) => {
                        if(error){
                            return res.send(error)
                        }
            
                        res.send({
                            placename : placename,
                            weather : weather,
                            temperature : temperature
                        })
                        console.log(placename)
                         console.log(weather)
                         console.log(temperature)
                        // console.log('Temperature out is '+temperature+' degree and it feels like '+feels+' degree')
                        // console.log('Precipitation: '+precip)
                        // console.log('Humidity: '+humidity)
                        // console.log('Wind Speed: '+wind_speed)
                })
            })

    })
//})
    
    
//     if(!req.query.address){
//         return res.send({
//             error: 'No address mentioned'
//         })
//     }
    
//     geocode(req.query.address,(error,{longitude,latitude,placename} = {})=>{
//         if(error){
//                     return res.send({error : error})
//                 }
//                 console.log(latitude)
//                 console.log(longitude)
//         forecast(latitude,longitude, (error, {weather,temperature,feels,precip,humidity,wind_speed}) => {
//             if(error){
//                 return res.send(error)
//             }

//             res.send({
//                 placename : placename,
//                 weather : weather,
//                 temperature : temperature
//             })
//             console.log(placename)
//              console.log(weather)
//              console.log(temperature)
//             // console.log('Temperature out is '+temperature+' degree and it feels like '+feels+' degree')
//             // console.log('Precipitation: '+precip)
//             // console.log('Humidity: '+humidity)
//             // console.log('Wind Speed: '+wind_speed)
//     })
// })


 

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

// app.get('/products',(req,res)=>{

//     if(!req.query.search){
//         return res.send({
//             error : 'Please provide the search input'
//         })
        
//     }
//     console.log(req.search)
//     res.send({
//         products:[]
//     })
// })

app.get('*',(req,res)=>{
    res.render('404',{
        title : 404,
        errortext : 'This is the 404 page',
        creator : 'peter'
    })
})

app.listen(3000,()=>{
    console.log('Server started')
})