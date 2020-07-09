const Product = require('../model/Product');

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
}

module.exports = new ProductController();