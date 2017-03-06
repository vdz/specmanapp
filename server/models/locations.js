"use strict";

module.exports =  function(sequelize, DataTypes) {
    const Location =  sequelize.define('Location', {
        name            : DataTypes.STRING,
        description     : DataTypes.TEXT,
        order           : DataTypes.INTEGER
    }, {
        underscored : true
    });

    return Location;
};