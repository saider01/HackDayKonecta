const express = require('express'); //Line 1
const app = express(); //Line 2
const https = require('https');
const port = process.env.PORT || 5000; //Line 3

// API URL
const __API_REST_PUBLIC = "https://mqjl9s6vf4.execute-api.eu-west-1.amazonaws.com/prod/v1/hackday/public/event";

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11


https.get(__API_REST_PUBLIC, (resp) => {
  let data = '';

  // Un fragmento de datos ha sido recibido.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // Toda la respuesta ha sido recibida. Imprimir el resultado.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
