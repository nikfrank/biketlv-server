const Sequelize = require('sequelize');

module.exports = db=>
  db.define('bug', {
    code: Sequelize.TEXT,
    tags: Sequelize.ARRAY( Sequelize.TEXT ),
    addressStart: Sequelize.JSON,
  });
