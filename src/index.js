const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('I love you, Greiziele <3!'));

app.listen(process.env.PORT || 3000, function() {
    console.log('Is running');
});