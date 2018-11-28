const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');


const db = !process.env.DATABASE_URL ? (
  new Sequelize('bugkill', 'bugkill', 'nikisgreat', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    
    pool: {
      max: 5,
      min: 0,
      aquire: 30000,
      idle: 10000
    }
  })
) : (
  new Sequelize(process.env.DATABASE_URL)
);

db.authenticate()
  .then(() => console.log('connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const app = express();

app.use(logger('dev'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// import models

const schemas = require('./schemas/');


// apply grammar to schemas
const grammar = require('./grammar/');


const daos = Object.keys(schemas).map( (schemaName)=> [
  schemas[schemaName](db), schemaName
]);


daos.forEach( ([ dao, schemaName ])=> {

  app.get('/bug', grammar.findAll(dao, schemaName));
  app.post('/bug', grammar.create(dao, schemaName));
  app.get('/bug/deprecate/:id', grammar.deprecate(dao, schemaName));
  app.put('/bug/:id', grammar.patch(dao, schemaName));
});


// hydrate the db

app.get('/hydrate', (req, res) => {
  daos[0][0].sync({ force: true })
  // here also insert the stubs
         .then(() => res.json({}));
  
});

module.exports = app;
