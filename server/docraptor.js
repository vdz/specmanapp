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
            test: false,
            javascript: false
        }
    }
};

function throwFile(file_name) {
    const file_location = './public/pdf/' + file_name;
    const file = fs.createReadStream(file_location);
    const stat = fs.statSync(file_location);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=' + file_name);
    file.pipe(res);
}

function handler(req, res) {
    const content = req.body.doc;
    const file_name = req.body.name + '.pdf';
    let payload = Object.assign({}, CONFIG);
    payload.json.doc.document_content = content;

    request.post(payload, (err, response, body) => {
        fs.writeFile('./public/pdf/' + file_name, body, 'binary', (err) => {
            console.log('Saved!', file_name);
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