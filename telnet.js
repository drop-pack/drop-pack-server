let net = require('net');
const event = require("./event")
const port = 8124
let server = net.createServer({
    allowHalfOpen: false,
},function(c) { //'connection' listener
    console.log('telnet client connected');

    c.on('end', function() {
        console.log('client disconnected');
    });
    event.on("downloadFile", (data)=>{
        c.write(`Downloaded a file file:${data.fileName}\n`)
    })
    event.on("sentFiles", (data)=>{
        c.write(`Sent uploaded files fileList:${data.fileName}\n`)

    })
    event.on("sentSize", (data)=>{
        c.write(`sent file size file:${data.fileName} size:${data.fileSize}\n`)

    })
    event.on("uploadedFile", (data)=>{
        c.write(`Uploaded a file file:${data.fileName} size:${data.fileSize}\n`)

    })
    event.on("deletedFile", (data)=>{
        c.write(`Deleted a file file:${data.fileName}\n`)
    })

/*
    c.pipe(c);
*/
},);
function start(){
    server.listen(port, function() { //'listening' listener
        console.log('telnet server started on ' + port);

    });
}
function stop(){
    server.close();
}
module.exports ={
    start,
    stop
}
