const request = require('request')
const forecast = (lon,lat, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=80e8996e9a0a90f4a7cab6207906e104&query='+lon+','+lat
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
                weather : response.body.current.weather_descriptions[0]+'. It is currently '+response.body.current.temperature+' degrees out. There is a '+response.body.current.precip+'% chances of rain.'
            })
        }
        
    })
}

    module.exports = forecast
    