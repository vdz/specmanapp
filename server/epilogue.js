const db = require('./models');
const bodyParser = require('body-parser');
const epilogue = require('epilogue');

module.exports = {
    init: function(app) {

        app.use(bodyParser.json());
        app.use(bodyParser.json({limit: '100mb'}));
        app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

        epilogue.initialize({
            app : app,
            sequelize : db,
            base : '/api'
        });

        //_ define REST resources
        const projectResource = epilogue.resource({
            model : db.Project,
            endpoints : ['/projects', '/projects/:id'],
            pagination : false
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
            pagination : false
        });

        const locationResource = epilogue.resource({
            model : db.Location,
            endpoints : ['/locations', '/locations/:id'],
            pagination : false
        });

        const typeResource = epilogue.resource({
            model : db.Type,
            endpoints : ['/types', '/types/:id'],
            search: {
                param: 'section',
                attributes: [ 'section_id' ]
            },
            pagination : false
        });

        const specResource = epilogue.resource({
            model : db.Spec,
            include : [
                {
                    model : db.Field,
                    as : 'fields'
                },
                {
                    model : db.Doc,
                    as : 'docs'
                }
            ],
            endpoints : ['/specs', '/specs/:id'],
            search: {
                param: 'project',
                attributes: [ 'project_id' ]
            },
            pagination : false
        });

        specResource.update.write((req, res, context) => {
            let promises = [];
            const spec_id = context.attributes.id;

            context.attributes.docs.forEach(item => {
                item.spec_id = spec_id;
                promises.push(db.Doc.upsert(item));
            });
            context.attributes.fields.forEach(item => {
                item.spec_id = spec_id;
                promises.push(db.Field.upsert(item));
            });

            return Promise.all(promises).then(()=> {
                db.Spec.findOne({
                    where : {
                        id : parseInt(context.attributes.id)
                    },
                    include : [
                        {
                            model : db.Doc,
                            as : 'docs'
                        },
                        {
                            model : db.Field,
                            as : 'fields'
                        }
                    ]
                }).then(spec => {
                    context.instance = spec;
                    context.continue();
                });
            });
        });

        const docResource = epilogue.resource({
            model : db.Doc,
            endpoints : ['/docs', '/docs/:id'],
            search: {
                param: 'spec',
                attributes: [ 'spec_id' ]
            },
            pagination : false
        });

        const fieldResource = epilogue.resource({
            model : db.Field,
            endpoints : ['/fields', '/fields/:id'],
            search: {
                param: 'spec',
                attributes: [ 'spec_id' ]
            },
            pagination : false
        });
    }
};