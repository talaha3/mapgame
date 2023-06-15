const express = require('express');
const Datastore = require('nedb')
const app = express();



app.listen(3000, () => console.log('Listening at 3000'));

app.use(express.static('public'));

app.use(express.json({limit: '1mb'}));
app.use(express.text());

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response)=>{
  //console.log('I got a request');
  console.log(request.body);
  database.insert({word: request.body})
  response.json({
    status: "success"
  }
  )
});



