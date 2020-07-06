const jwt = require('jsonwebtoken');

const JWTUtils = {
    generateJWTToken(userData) {
        const user = {
            id: userData.id,
            name: userData.name,
            password: userData.password,
            email: userData.email,
        }
        return jwt.sign(user, process.env.JWT_SECRET_TCC, { expiresIn: '7d' });
    }
}

module.exports = JWTUtils;