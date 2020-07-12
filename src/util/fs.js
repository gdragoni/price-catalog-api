const fs = require('fs')

class FSController {

    createUploadDirIfNeeded() {
        var dir = __dirname + '/../../uploads';

        if (!fs.existsSync(dir)){
            console.log('Criando diretório uploads')
            fs.mkdirSync(dir);
        }
    }

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