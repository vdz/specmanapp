"use strict";

module.exports =  function(sequelize, DataTypes) {
    const File =  sequelize.define('File', {
        label           : DataTypes.STRING,
        url             : DataTypes.STRING
    }, {
        underscored : true
    });

    return File;
};