/* const express = require('express');

const app = express();

// const cors = require('cors');


const port = 3000;

// app.use(cors());

app.use(express.json());





app.get("/", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + "/index.html");
})


app.use(express.json());

const accountSid = 'AC3f73df2a47a9687e623c5503bf103a77'; 
const authToken = '8d8931ac36e40b65f738e13b9d35535c'; 
const client = require('twilio')(accountSid, authToken); 

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});



app.post('/sms', (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    client.messages 
      .create({ 
         body: req.body.message,
         messagingServiceSid: 'MGda7af18591f0c237763fb5cf2be37db5',        
         to: `+1${req.body.number}`,
       }) 
      .then(message => console.log("Message Sent!")) 
      .done();
});


 


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

*/

const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());

const accountSid = 'AC3f73df2a47a9687e623c5503bf103a77'; 
const authToken = 'c6fb65e1fc2b06f9a69ad24fbcd74ba2'; 
const client = require('twilio')(accountSid, authToken); 


const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

const schedule = require('node-schedule');


app.post('/sms', (req, res) => {
  let time = {
    alarmTime: req.body.alarmTime
  }

  console.log(time.alarmTime)

  let TIME = '2021-08-06 ' + time.alarmTime + ':00';
  console.log(TIME)

  let someDate = new Date(TIME);

  let obj = {
    body: req.body.message,
    messagingServiceSid: 'MGda7af18591f0c237763fb5cf2be37db5',        
    to: `+1${req.body.number}`
  };

  schedule.scheduleJob(someDate, () => {
    client.messages 
    .create({ 
      body: obj.body,
      messagingServiceSid: obj.messagingServiceSid,        
      to: obj.to,
    }) 
    .then(message => console.log("Message Sent!")) 
    .done();
  });
});





/*
let dateObj = new Date();

console.log(dateObj.toTimeString());
// dateObj.toTimeString() = "17:05:29 GMT-0700 (Pacific Daylight Time)"

let i = 0;
let myFunction = () => {
  let i = 0;
  if (i = 0) {
    console.log('it works')
    client.messages 
    .create({ 
      body: obj.body,
      messagingServiceSid: obj.messagingServiceSid,        
      to: obj.to,
    }) 
    .then(message => console.log("Message Sent!")) 
    .done();
  }
};




app.post('/sms', (req, res) => {
  
  let obj = {
    body: req.body.message,
    messagingServiceSid: 'MGda7af18591f0c237763fb5cf2be37db5',        
    to: `+1${req.body.number}`
  }

  
  setInterval (
    () => {
      if (1 < 5) {
        client.messages
        .create({ 
          body: obj.body,
          messagingServiceSid: obj.messagingServiceSid,        
          to: obj.to,
        }) 
        .then(message => console.log("Message Sent!")) 
        .done();

        break;
      }
    },
    1000
  );
  

});

.create({ 
  body: obj.body,
  messagingServiceSid: obj.messagingServiceSid,        
  to: obj.to,
}) 
.then(message => console.log("Message Sent!")) 
.done();
*/

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});