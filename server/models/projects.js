"use strict";

module.exports =  function(sequelize, DataTypes) {
    const Project =  sequelize.define('Project', {
        name            : DataTypes.STRING,
        description     : DataTypes.TEXT,
        client          : DataTypes.STRING,
        address         : DataTypes.STRING,
        is_signed       : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        underscored : true
    });

    return Project;
};