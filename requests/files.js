const paths = require("../paths");
const fs = require("fs");
const sanitize = require("./request_sanitize")
const event = require("../event");

function files(req, res, config) {
    const requestPassword = req.headers.password;

    if (requestPassword === config.accountPassword){

        res.status(202);

        fs.readdir(paths.file , (err, files)=>{

            if(err === null){
                res.status(201);
                const filteredFile = files.filter((value, index , array)=>{
                    if(sanitize.pathSanitizeDotREGEXP.test(value)){
                        return false
                    }else{
                        return true
                    }
                })
                res.json({
                    files: {
                                names: filteredFile,
                            }
                });
                event.emit("sentFiles" , {files: files});


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


module.exports={
    files
}