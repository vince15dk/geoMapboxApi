const request = require('request')
const {geoCodeToken} =require('../../config/config')

// const geocode = (address, callback) => {
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${geoCodeToken}&limit=1`
//     request({url, json:true}, (err, {body})=>{
//         if(err) {
//             callback('Unable to connect to geocode service!', undefined)
//         } else if (body.features.length === 0){
//             callback('Unable to find location',undefined)
//         } 
//         else {
//             callback(undefined, {
//                 longitude: body.features[0].geometry.coordinates[0],
//                 latitude: body.features[0].geometry.coordinates[1],
//                 location: body.features[0].place_name
//             })
           
//         }
//     })
// }

const geocode = (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${geoCodeToken}&limit=1`
    return new Promise((resolve, reject)=>{
        request({url, json:true}, (err, {body})=>{
            if(err) {
                reject('Unable to connect to geocode service!')
            } else if (body.features.length === 0){
                reject('Unable to find location')
            } 
            else {
                resolve({
                    longitude: body.features[0].geometry.coordinates[0],
                    latitude: body.features[0].geometry.coordinates[1],
                    location: body.features[0].place_name
                })
               
            }
        })

    })
    
    
}


module.exports = geocode