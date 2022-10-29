const express = require("express");
const app = express(); //Line 2
const https = require('https');
const port = process.env.PORT || 5000; //Line 3

// create a GET route
app.get('/bk', (req, res) => { //Line 9
  res.send({ express: get_data() }); //Line 10
});

// API URL
const __API_REST_PUBLIC = "https://mqjl9s6vf4.execute-api.eu-west-1.amazonaws.com/prod/v1/hackday/public/event";

function parse_data()
{
  let json_data = JSON.parse(json);
  let events = JSON.parse(json_data.payload.data.onCreateHackathonEvents.event).detail.events;

  let indicators = events[1];

  let indicators_metrics = indicators.detail.eventBody.data.metrics;

  let final_data = {"metrics": indicators_metrics};

  let agent_status = events[0];

  let agents = agent_status.detail.eventBody.service.users;

  let agent_data = [];

  // Métricas de los agentes
  let agent_metrics = agent_status.detail.eventBody.data.metrics;

  // Lectura de métricas
  for(const metric in agent_metrics)
  {
    if(metric.metric == "rOnQueueUsers" && metric.usersId.length != 0)
    {
      let qualifier = metric.qualifier;
      console.log(qualifier);
      let user_name = "";
      for(const id in agent_metrics[1])
      {
        for(const agent in agents)
        {
          if(id == agent.id)
          {
            user_name = agent.name;
            console.log(user_name);
          }
        }
      }
      agent_data.push({
        "user_name": user_name,
        "status": "active",
        "state": qualifier
      });
    }
  }
  return(agent_data);
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

let json = "";

function get_data()
{
  https.get(__API_REST_PUBLIC, (resp) => {

    // Un fragmento de datos ha sido recibido.
    resp.on('data', (chunk) => {
      json += chunk;
    });

    // Toda la respuesta ha sido recibida. Imprimir el resultado.
    resp.on('end', () => { 
      return parse_data();
    });

    resp.on("error", (err) => {
    console.log("Error: " + err.message);
    });
  });
}