'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'dev';
var config    = require(__dirname + '/../../config/db-config.json')[env];
var db        = {};

var sequelize = new Sequelize(config.database,
    config.username,
    config.password,
    config);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Associations
db.Project.hasMany(db.Spec);

db.File.belongsTo(db.Project);

db.Section.hasMany(db.Type, { as : 'types' })
db.Type.belongsTo(db.Section);

db.Spec.belongsTo(db.Section);
db.Spec.belongsTo(db.Location);
db.Spec.belongsTo(db.Type);

db.Spec.hasMany(db.Field, { as : 'fields' });
db.Field.belongsTo(db.Spec);

db.Spec.hasMany(db.Doc, { as : 'docs' });
db.Doc.belongsTo(db.Spec);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//_ sync for first run only
sequelize.sync();

module.exports = db;
