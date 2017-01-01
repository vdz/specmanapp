const db = require('./models');
const bodyParser = require('body-parser');
const epilogue = require('epilogue');

module.exports = {
    init: function(app) {

        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            next();
        });
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        epilogue.initialize({
            app : app,
            sequelize : db,
            base : '/api'
        });

        //_ define REST resources
        const projectResource = epilogue.resource({
            model : db.Project,
            endpoints : ['/projects', '/projects/:id']
        });
    }
};