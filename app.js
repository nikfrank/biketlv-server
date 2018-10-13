const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');



const sequelize = !process.env.DATABASE_URL ? (
  new Sequelize('biketlv', 'biketlv', 'nikisgreat', {
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

sequelize
  .authenticate()
  .then(() => console.log('connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const app = express();

const Lane = sequelize.define('bikelane', {
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

app.get('/lane', (req, res) => {
  Lane.findAll({})
      .then(rows => res.json(rows))
      .catch(err => res.status(err.code || 500).json({ err }))
  
});

app.post('/lane', (req, res) => {
  Lane.create(req.body.payload)
      .then(createdRow => res.json(createdRow))
      .catch(err => res.status(err.code || 500).json({ err }))
});

app.get('/lane/deprecate/:id', (req, res) => {
  Lane.destroy({ where: { id: 1* req.params.id  } })
      .then((a) => res.json({ message: a }))
      .catch(err => res.status(err.code || 500).json({ err }))
});

app.put('/lane/:id', (req, res) =>
  Lane.findById(1 * req.params.id)
      .then(row =>
        (row ?
         row.update(req.body.payload)
            .then(patchedRow => res.json({
              schema: 'lane',
              payload: [patchedRow],
            })) :
         Promise.reject('lane with id ' + (req.params.id) + ' not found')
        ) )
      .catch(err => res.status(err.code || 500).json({ err }))
);


app.get('/hydrate', (req, res) => {
  Lane.sync({force: true})
      .then(() => res.json({}));
  
});

const buildDir = process.env.USER === 'nik' ? 'build' : 'dist';

app.get('*', (req, res) => res.status(200).sendFile(__dirname+'/'+buildDir+'/'+req.path));


module.exports = app;
