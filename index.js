var express = require('express');
var app = express();
const cors = require('cors')
const NedbAsyncStore = require('nedb-async-store');
const winston = require('winston'),
  expressWinston = require('express-winston');

const db = new NedbAsyncStore({
    filename: 'db.json',
    autoload: true
  });
db.loadDatabase().then(() => console.log('database loaded'));

app.use(cors())

app.get('/', function (req, res) {
  const result = filter(req.query);
  result.then(data => {
    res.status(200).send(JSON.stringify(data));
  })
});

const filter = async ({ gender, age, over }) => {
  const ageQuery = over !== 'true' ? '$lt' : '$gte'

  let query;
  if(gender){
    query = {
      ...query,
      gender
    }
  }
  if(age && over){
    query = {
      ...query,
      age: {
        [ageQuery] : Number(age)
      }
    }
  }

  return await db.find(query, {})
}

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  expressFormat: true, 
  colorize: false,
  ignoreRoute: function (req, res) { return false; } 
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

exports.filter = filter