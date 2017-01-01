"use strict";

module.exports =  function(sequelize, DataTypes) {
    const Location =  sequelize.define('Location', {
        name            : DataTypes.STRING,
        description     : DataTypes.TEXT
    }, {
        underscored : true
    });

    return Location;
};