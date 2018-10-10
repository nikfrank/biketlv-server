const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');


const sequelize = new Sequelize('biketlv', 'biketlv', 'nikisgreat', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    aquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate()
         .then(() => {
           console.log('connection has been established successfully.');
         })
         .catch(err => {
           console.error('Unable to connect to the database:', err);
         });

const app = express();

const BikeLane = sequelize.define('bikelane', {
  startLat: Sequelize.FLOAT,
  startLng: Sequelize.FLOAT,
  endLat: Sequelize.FLOAT,
  endLng: Sequelize.TEXT,
  street: Sequelize.TEXT,
  status: Sequelize.TEXT,
  addressStart: Sequelize.INTEGER,
  addressEnd: Sequelize.INTEGER,
  notes: Sequelize.TEXT,
});

app.use(logger('dev'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/home', (req, res) => {
  console.log('people')
  res.json({people:[ 'tom','tim','timmy',' timmie' ]})
});

app.get('/bikelane', (req, res) => {
    BikeLane.findAll({})
            .then(rows => {
              res.json(rows)
            })
            .catch(err => res.status(err.code || 500).json({ err }))
  
});

app.post('/bikelane', (req, res) => {
    BikeLane.create(req.body.payload)
            .then(createdRow => {
              res.json(createdRow)
            })
         .catch(err => res.status(err.code || 500).json({ err }))

});


app.get('/hydrate', (req, res) => {
  BikeLane.sync({force: true})
          .then(() => {
    res.json({})
  });
  
});

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));


module.exports = app;
