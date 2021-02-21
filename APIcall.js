let zip_code = input.getValueAsString(`zipcode`)
const apiKey = context.getValueAsString(`owm.APIkey`)


//import Zip Code and API KEY 
const axios = require('axios'); 
var url = `https://api.openweathermap.org/data/2.5/weather?zip=` + zip_code + `,&units=imperial&appid=` + apiKey; 
axios({ 
method: `GET`, 
url: url  }) 
.then(function(res) { 
// handle success 
// Print out JSON response & other variable checks if context warning is Enabled
if (context.isWarningEnabled()) {
context.bot(JSON.stringify(res.data)) 
context.bot(JSON.stringify(res.data.main.temp))
context.bot(JSON.stringify(res.data.name))
context.bot(JSON.stringify(res.data.weather[0].description)) }
  
var temp = (JSON.stringify(res.data.main.temp))
// setting the variable temp as a session variable to be used later
context.setValueAsString (`temp`, (JSON.stringify(res.data.main.temp)) )

// used .replace(/['"]+/g to remove double quotes from variables
var city_name = ((JSON.stringify(res.data.name)).replace(/['"]+/g, ''))

// setting the variable city_name as a session variable to be used later
context.setValueAsString (`city_name`, ((JSON.stringify(res.data.name)).replace(/['"]+/g, '')) )
  
var description = (JSON.stringify(res.data.weather[0].description).replace(/['"]+/g, '')) 

// setting the variable description as a session variable to be used later
context.setValueAsString (`description`, (JSON.stringify(res.data.weather[0].description)).replace(/['"]+/g, '') )

// bot will say the current temp, city_name & weather description in message node flow
//context.bot(`It is currently ${temp}°F in ${city_name} with ${description}`)
response.return(true) 
})
.catch(function (error) { 
// handle error 
if (context.isWarningEnabled()) { 
context.warning(`error: ${error}`) 
} 
context.bot(`Oops. I couldn't get the weather in ${zip_code}`) 
response.return(true) 
})
