const request = require('request');
const fs = require('fs');

const CONFIG = {
    url : 'https://docraptor.com/docs',
    encoding : null,
    headers : {
        'Content-Type' : 'application/json'
    },
    json : {
        user_credentials : 'JFd9qZHboOcLdu6Bj2r',
        doc  : {
            document_content : '',
            type : 'pdf',
            test: true,
            javascript: false
        }
    }
};

function handler(req, res) {
    const content = req.body.doc;
    const file_name = req.body.name + '.pdf';
    let payload = Object.assign({}, CONFIG);
    payload.json.doc.document_content = content;

    request.post(payload, (err, response, body) => {
        fs.writeFile('./public/pdf/' + file_name, body, 'binary', (err) => {
            console.log('Saved!');
            res.json({
                created : true,
                url : '/pdf/' + file_name
            });
        })
    })
}

module.exports = {
    handler
};