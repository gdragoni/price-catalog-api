const Comment = require('../model/Comment');
const moment = require('moment');

class CommentController {

    async store(req, res) {
        var data;
        try {
            data = await Comment.create({ 
                ...req.body, 
                userID: req.user.id,
                date: moment().toDate(),
            });
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json(data);
    }

    async update(req, res) {
        try {
            await Comment.findByIdAndUpdate(req.body.id, req.body);
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json({ message: "Comentário alterado" });
    }

    async find(req, res) {
        var data;
        try {
            data = await Comment.find(req.query);
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json(data);
    }

    async delete(req, res) {
        try {
            const data = await Comment.findById(req.query.id);
            if(data && (data.userID == req.user.id || req.user.isAdmin)) {
                data.remove();
            } else {
                return res.status(400).json({ message: "Comentário não pertence ao usuário" })
            }
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json({ message: "Comentário removido" });
    }
}

module.exports = new CommentController();