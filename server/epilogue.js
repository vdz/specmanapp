const db = require('./models');
const bodyParser = require('body-parser');
const epilogue = require('epilogue');

module.exports = {
    init: function(app) {

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

        const sectionResource = epilogue.resource({
            model : db.Section,
            include : [
                {
                    model : db.Type,
                    as : 'types'
                }
            ],
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
        });
    }
};