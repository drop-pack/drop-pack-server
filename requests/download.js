const paths = require("../paths");
const fs = require("fs");
const sanitize = require("./request_sanitize");
const event = require("../event");

function download(req, res, config) {

    let fileName = req.headers.file_name;
    const requestPassword = req.headers.password;

    console.log(req.headers.user);
    console.log(req.headers.info);
    if(sanitize.sanitizePath(fileName)){
        if (requestPassword === config.accountPassword){

            res.status(202);

            fs.readFile(paths.file + "/" + fileName, (err, data)=>{

                if(err === null){
                    event.emit("downloadedFile", {fileName: fileName});
                    res.status(201);
                    res.send(data);
                }
                else{
                    res.status(500);
                    res.json({
                        error: {
                            code: "EURF",
                            message: "Error unable to read file"
                        }
                    });
                }

            });

        }
        else{
            res.status(401)
            res.json({
                error: {
                    code: "EU",
                    message: "Error unauthorised"
                }
            });
        }
    }
    else{
        res.status(401)
        res.json({
            error: {
                code: "EU",
                message: "Error unauthorised"
            }
        });
    }

}
module.exports={
    download
}