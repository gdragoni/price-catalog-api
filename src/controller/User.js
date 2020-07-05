const User = require('../model/User');
const jwt = require('jsonwebtoken');

class UserController {

    async register(req, res) {
        var data;
        try {
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
            });
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
            let token = jwt.sign(user, process.env.JWT_SECRET_TCC);
            return res.json({
                token,
            });
        } else {
            return res.status(401).json({
                message: "Usuário ou senha inválidos"
            })
        }
    }
}

module.exports = new UserController();