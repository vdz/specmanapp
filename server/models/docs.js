"use strict";

module.exports =  function(sequelize, DataTypes) {
    const Doc =  sequelize.define('Doc', {
        label           : DataTypes.STRING,
        type            : DataTypes.STRING,
        remote_id       : DataTypes.STRING,
        url             : DataTypes.STRING,
        thumb           : DataTypes.STRING,
        meta            : DataTypes.TEXT
    }, {
        underscored : true
    });

    return Doc;
};