const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());

const accountSid = 'AC3f73df2a47a9687e623c5503bf103a77'; 
const authToken = '8d8931ac36e40b65f738e13b9d35535c'; 
const client = require('twilio')(accountSid, authToken); 

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });


app.post('https://app-2021-server.herokuapp.com/sms', (req, res) => {
    client.messages 
      .create({ 
         body: req.body.message,
         messagingServiceSid: 'MGda7af18591f0c237763fb5cf2be37db5',        
         to: `+1${req.body.number}`,
       }) 
      .then(message => console.log("Message Sent!")) 
      .done();
});
 


app.listen(process.env.PORT || 8080);