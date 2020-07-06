const User = require('../model/User');
const jwt = require('jsonwebtoken');

class UserController {
    async check(req, res, next) {
        var data;
        try {
            if(!req.user) return next();
            data = await User.findById(req.user.id);
        } catch(e) {
            return res.status(500).json(e);
        }
        if(!data) {
            return res.status(401).json({ 
                message: "Token inválido" 
            });
        }
        next();
    }

    async register(req, res) {
        var data;
        try {
            const userEmail = await User.find({ email: req.body.email }).limit(1);
            if(userEmail.length) {
                return res.status(400).json({ message: "E-mail já cadastrado" });
            }
            data = await User.create(req.body);
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json(data);
    }

    async login(req, res) {
        var data;
        try {
            data = await User.find({
                email: req.body.login,
                password: req.body.password,
            }).limit(1);
        } catch(e) {
            return res.status(500).json(e);
        }
        if(data.length) {
            const user = {
                id: data[0].id,
                name: data[0].name,
                password: data[0].password,
                email: data[0].email,
            }
            let token = jwt.sign(user, process.env.JWT_SECRET_TCC, { expiresIn: '7d' });
            return res.json({
                token,
            });
        } else {
            return res.status(401).json({
                message: "Usuário ou senha inválidos"
            })
        }
    }

    async delete(req, res) {
        try {
            await User.findByIdAndDelete(req.user.id);
        } catch(e) {
            return res.status(500).json(e);
        }
        return res.json({ message: "Usuário removido" });
    }
}

module.exports = new UserController();