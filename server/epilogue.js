const db = require('./models');
const bodyParser = require('body-parser');
const epilogue = require('epilogue');

module.exports = {
    init: function(app) {
        const corsOptions = {
            optionsSuccessStatus : 200
        };

        app.use('/api', function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
            // intercept OPTIONS method
            if ('OPTIONS' == req.method) {
                res.send(200);
            }
            else {
                next();
            }
        });
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        /*epilogue.initialize({
            app : app,
            sequelize : db,
            base : '/api'
        });

        //_ define REST resources
        const projectResource = epilogue.resource({
            model : db.Project,
            endpoints : ['/projects', '/projects/:id']
        });

        const sectionResource = epilogue.resource({
            model : db.Section,
            endpoints : ['/sections', '/sections/:id'],
        });

        const locationResource = epilogue.resource({
            model : db.Location,
            endpoints : ['/locations', '/locations/:id'],
        });

        const typeResource = epilogue.resource({
            model : db.Type,
            endpoints : ['/types', '/types/:id'],
            search: {
                param: 'section',
                attributes: [ 'section_id' ]
            }
        });

        const specResource = epilogue.resource({
            model : db.Spec,
            include : [
                {
                    model : db.Field,
                    as : 'fields'
                }
            ],
            endpoints : ['/specs', '/specs/:id'],
            search: {
                param: 'project',
                attributes: [ 'project_id' ]
            }
        });

        const fieldResource = epilogue.resource({
            model : db.Field,
            endpoints : ['/fields', '/fields/:id'],
            search: {
                param: 'spec',
                attributes: [ 'spec_id' ]
            }
        });*/
    }
};