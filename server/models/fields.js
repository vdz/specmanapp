"use strict";

module.exports =  function(sequelize, DataTypes) {
    const Field =  sequelize.define('Field', {
        label           : DataTypes.STRING,
        value           : DataTypes.TEXT,
        is_public       : {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        underscored : true
    });

    return Field;
};