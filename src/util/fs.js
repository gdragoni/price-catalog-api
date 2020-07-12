const fs = require('fs')

class FSController {

    deleteFiles(fileNames) {
        fileNames.forEach((fileName) => {
            let filePath = __dirname + '/../../uploads/' + fileName;
            fs.unlink(filePath, (err) => {
                if(err) {
                    console.error(err);
                }
            });
        })
    } 
}

module.exports = new FSController();