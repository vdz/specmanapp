"use strict";

module.exports =  function(sequelize, DataTypes) {
    const Type =  sequelize.define('Type', {
        name            : DataTypes.STRING,
        description     : DataTypes.TEXT
    }, {
        underscored : true
    });

    return Type;
};