const express = require("express");
const app = express(); //Line 2
const https = require('https');
const port = process.env.PORT || 5000; //Line 3

// API URL
const __API_REST_PUBLIC = "https://mqjl9s6vf4.execute-api.eu-west-1.amazonaws.com/prod/v1/hackday/public/event";

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

let json = "";
https.get(__API_REST_PUBLIC, (resp) => {

  // Un fragmento de datos ha sido recibido.
  resp.on('data', (chunk) => {
    json += chunk;
  });

  // Toda la respuesta ha sido recibida. Imprimir el resultado.
  resp.on('end', () => {	
	let json_data = JSON.parse(json);
	let events = JSON.parse(json_data.payload.data.onCreateHackathonEvents.event).detail.events;

	let agent_status = events[0];
	let indicators = events[1];

	let agent_status_service = agent_status.detail.eventBody.service;
	let agent_status_metrics = agent_status.detail.eventBody.data.metrics;
	console.log(agent_status_service);
	console.log(agent_status_metrics);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
		
