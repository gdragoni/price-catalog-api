const Product = require('../model/Product');
const moment = require('moment');

const FSController = require('../util/fs');

class ProductController {

    async store(req, res) {
        var data;
        try {
            data = await Product.create(req.body);
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json(data);
    }

    async uploadImage(req, res) {
        try {
            await Product.findByIdAndUpdate(req.query.id, { imageName: req.body.fileName });
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json({ message: "Sucesso!" });
    }

    async find(req, res) {
        var data;
        try {
            const {
                marketID
            } = req.query;
            data = await Product.find({ marketID });
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json(data);
    }

    async findAndRemoveLastWeek(req, res) {
        var data;
        try {
            data = await Product.find({ 
                data: { 
                    $lte: moment().subtract(7, 'day').toDate() 
                }, 
                imageName: { $ne: null } 
            });
            let filesToDelete = data.map((p) => p.imageName).filter((imgName) => imgName.length);
            FSController.deleteFiles(filesToDelete);
            await data.forEach((p) => p.remove());
        } catch(e) {
            if (!res) {
                return console.log(e);
            }
            return res.status(500).json(e);
        }
        if (!res) {
            return console.log("Sucesso!");
        }
        return res.json({ message: "Sucesso!" });
    }
}

module.exports = new ProductController();