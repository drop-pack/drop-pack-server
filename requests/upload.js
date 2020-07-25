const paths = require("../paths");
const fs = require("fs");
const event = require("../event");

function upload(req, res, config) {
    let fileName = req.headers.file_name;
    const fileContent = req.body;
    const requestPassword = req.headers.password;


    if (requestPassword === config.accountPassword){

        res.status(202);

        fs.writeFile(paths.file + "/" + fileName, fileContent, {flag: "wx"}, (err)=>{

            if(err === null){
                res.status(201);
                    res.json({
                        result: {
                            code: "SUCCESS",
                            message: "Successfully written the file to storage"
                        },
                        file: {
                            name: fileName,
                            size: fileContent.length
                        }

                    });
                event.emit("uploadedFile" ,{fileName: fileName, fileSize: fileContent.length});

            }
            else{
                if(err.code === "EEXIST"){
                    res.status(500);
                    res.json({
                        error: {
                            code: "EEXIST",
                            message: "Error file already exists"
                        }
                    });

                }
                else{
                    res.status(500);
                    res.json({
                        error: {
                            code: "EUWF",
                            message: "Error unable to write file"
                        }
                    });
                }
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
    upload
}