"use strict";

module.exports =  function(sequelize, DataTypes) {
    const Field =  sequelize.define('Field', {
        label           : DataTypes.STRING,
        value           : DataTypes.TEXT,
    }, {
        underscored : true
    });

    return Field;
};