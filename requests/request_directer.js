const config = require("../config");
const upload = require("./upload").upload;
const purge = require("./purge").purge;
const download = require("./download").download;
const size = require("./size").size;
const files = require("./files").files;

function direct(app, binaryParser){
    app.get('/', (req, res) => {
        res.status(200);
        res.send("12");
    })

    app.post('/upload', binaryParser ,(req, res)=>{
        upload(req, res, config);
    });
    app.delete('/delete', binaryParser, (req, res)=>{
        purge(req, res, config);
    });
    app.get('/download', binaryParser, (req, res)=>{
        download(req, res, config);
    });
    app.get('/size', binaryParser, (req, res)=>{
        size(req, res, config);
    });
    app.get('/files', binaryParser, (req, res)=>{
        files(req, res, config);
    });
}
module.exports = {
    direct
}