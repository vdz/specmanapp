"use strict";

module.exports =  function(sequelize, DataTypes) {
    const Section =  sequelize.define('Section', {
        name            : DataTypes.STRING,
        description     : DataTypes.TEXT,
    }, {
        underscored : true
    });

    return Section;
};