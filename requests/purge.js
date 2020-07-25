const paths = require("../paths");
const fs = require("fs");
const event = require("../event");

function purge(req, res, config){
    let fileName = req.headers.file_name;
    const requestPassword = req.headers.password

    if (requestPassword === config.accountPassword){
        res.status(202)
        fs.unlink(paths.file + "/" + fileName, (err)=>{

            if(err === null){
                res.status(201);
                res.json({
                    result: {
                        code: "SUCCESS",
                        message: "Successfully purged the file"
                    },
                    file: {
                        name: fileName,
                    }
                });
                event.emit("deletedFile" ,{fileName: fileName});

            }
            else{
                    res.status(500);
                    res.json({
                        error: {
                            code: "EUDF",
                            message: "Error unable to delete file"
                        }
                    });
            }

        })

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
    purge
}