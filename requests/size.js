const paths = require("../paths");
const fs = require("fs");
const sanitize = require("./request_sanitize")
const sizeCheck = require("get-folder-size")
const event = require("../event");

function size(req, res, config) {

    let fileName = req.headers.file_name;
    const requestPassword = req.headers.password;


    if(sanitize.sanitizePath(fileName)){
        if (requestPassword === config.accountPassword){

            res.status(202);


            sizeCheck(paths.file + "/" +fileName, (err, size) => {
                if (err) {
                    res.status(500);
                    res.json({
                        error: {
                            code: "EURF",
                            message: "Error unable to read file"
                        }
                    });
                }
                else{
                    res.json({
                        file: {
                            name: fileName,
                            size: size
                        }
                    });
                    event.emit("sentSize" ,{fileName: fileName, fileSize: size});

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
    size
}