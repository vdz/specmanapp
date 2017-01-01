"use strict";

module.exports =  function(sequelize, DataTypes) {
    const Media =  sequelize.define('Media', {
        label           : DataTypes.STRING,
        url             : DataTypes.STRING
    }, {
        underscored : true
    });

    return Media;
};