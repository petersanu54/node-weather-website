const request = require('request')
const geocode = (address, callback)=>{
    //console.log(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FudXBldGVyIiwiYSI6ImNqN3JqZm5wOTB1cW0zMnFydGNvM2EwM2UifQ.P5xwTcbHwGP-PI6DEb7baw&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect')
        }
        else if(body.features.length === 0){
            callback('Unable to find the data')
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                placename : body.features[0].place_name

            })
            
        }
    })
    }

const forecast = (lat,lon, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=80e8996e9a0a90f4a7cab6207906e104&query='+lat+','+lon
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect',undefined)
        }
         else if(response.body.error){
            callback('Please mention the coordinates',undefined)
        }
        else{
            callback(undefined,{
                temperature : response.body.current.temperature,
                weather : response.body.current.weather_descriptions[0],
                precip : response.body.current.precip,
                humidity : response.body.current.humidity,
                wind_speed : response.body.current.wind_speed,
                feels : response.body.current.feelslike
            })
        }
    })
}

    module.exports = {
        forecast,
        geocode        

    }
    
    