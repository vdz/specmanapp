"use strict";

module.exports =  function(sequelize, DataTypes) {
    const Spec =  sequelize.define('Spec', {
        name            : DataTypes.STRING,
        description     : DataTypes.TEXT
    }, {
        underscored : true
    });

    return Spec;
};