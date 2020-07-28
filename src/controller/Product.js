const Product = require('../model/Product');
const Comment = require('../model/Comment');
const moment = require('moment');
const sharp = require('sharp');

const FSController = require('../util/fs');

class ProductController {

    async store(req, res) {
        var data;
        try {
            data = await Product.create({ 
                ...req.body, 
                userID: req.user.id,
                date: moment().toDate(),
            });
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json(data);
    }

    async uploadImage(req, res) {
        try {
            const imageBuffer = await sharp(req.file.path).resize({ width: 800 }).toBuffer();
            await Product.findByIdAndUpdate(req.query.id, { imageName: req.body.fileName, image: `data:${req.file.mimetype};base64,${imageBuffer.toString("base64")}` });
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
            data = await Product.find({ marketID }).sort({ date: -1 });
            data.forEach(function(p) {
                const likes = p.likes;
                const userLiked = likes.includes(req.user.id);
                if(userLiked && likes && likes.length == 2) {
                    p.likeMessage = `Você e outra pessoa curtiu esse produto`;
                } else if(userLiked && likes && likes.length == 1) {
                    p.likeMessage = "Você curtiu esse produto";
                } else if(userLiked && likes && likes.length > 2) {
                    p.likeMessage = `Você e outros ${likes.length-1} curtiram esse produto`;
                } else if(!userLiked && likes && likes.length > 1) {
                    p.likeMessage = `${likes.length} curtiram esse produto`;
                } else if(!userLiked && likes && likes.length == 1) {
                    p.likeMessage = `1 pessoa curtiu esse produto`;
                } else if(likes.length == 0) {
                    p.likeMessage = "Ninguém curtiu esse produto ainda";
                }
            });
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json(data);
    }

    async delete(req, res) {
        try {
            let data = await Product.findById(req.query.id);
            if(data && (data.userID == req.user.id || req.user.isAdmin)) {
                const imageName = data.imageName;
                if(imageName && imageName.length) {
                    FSController.deleteFiles([data.imageName]);
                }
                await Comment.deleteMany({ productID: data.id });
                await data.remove();
            } else {
                return res.status(400).json({ message: "Produto não pertence ao usuário" })
            }
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json({ message: "Produto removido" });
    }

    async findAndRemoveLastWeek(req, res) {
        var data;
        try {
            data = await Product.find({ date: { $lte: moment().subtract(7, 'day').toDate() } });
            let filesToDelete = data.map((p) => p.imageName).filter((imgName) => imgName && imgName.length);
            FSController.deleteFiles(filesToDelete);
            await data.forEach((p) => Comment.deleteMany({ productID: p.id }) );
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

    async like(req, res) {
        var data;
        try {
            const {
                id: productID
            } = req.query;
            const {
                id: userID
            } = req.user;
            data = await Product.findById(productID);
            if(data.likes.includes(userID)) {
                data.likes = data.likes.filter((d) => d != userID);
            } else {
                data.likes.push(userID);
            }
            data.save();
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json(data);
    }
}

module.exports = new ProductController();