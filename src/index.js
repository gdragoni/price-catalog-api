const express = require('express');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
const UserController = require('./controller/User');
const MarketController = require('./controller/Market');
const pathsWithoutSession = [
    '/',
    '/user/register',
    '/user/login',
];
const pathsOnlyAdmin = [
    '/loja/add',
    '/loja/update',
    '/loja/delete',
]

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(jwt({ 
    secret: process.env.JWT_SECRET_TCC, 
    algorithms: ['HS256', 'RS256'],
    getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
    },
}).unless({ path: pathsWithoutSession }));
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({
            message: "Token inválido"
        });
    }
});
app.use(async (req, res, next) => {
    if(pathsWithoutSession.includes(req.originalUrl)) return next();
    if(pathsOnlyAdmin.includes(req.originalUrl) && req.user.email != process.env.TCC_USER_ADMIN) {
        return res.status(401).json({
                    message: "Token inválido"
                });
    }
    await UserController.check(res, req, next);
});

app.get('/', (req, res) => res.send("<h1>Greiziele amor da minha vida <3</h1>"));

app.get('/loja', MarketController.find);
app.post('/loja/add', MarketController.store);
app.put('/loja/update', MarketController.update);
app.delete('/loja/delete', MarketController.delete);

app.post('/user/register', UserController.register);
app.post('/user/login', UserController.login);
app.delete('/user/delete', UserController.delete);
app.put('/user/update', UserController.update);

mongoose.connect(process.env.MONGOLAB_URI, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useFindAndModify: false,
}).then(() => console.log(`MongoDB succefully`));

app.listen(process.env.PORT || 3000, () => console.log('Is running'));