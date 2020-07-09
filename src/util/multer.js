const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const fileName = `${req.query.id}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
        req.body.fileName = fileName
    }
});

module.exports = multer({ storage });