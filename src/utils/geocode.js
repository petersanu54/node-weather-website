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


    module.exports = geocode