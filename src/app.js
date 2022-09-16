const express = require('express');
const app = express();
const User = require('../user/User')

app.use(express.json())

app.post('/api/v1/users', (req, res) => {
    User.create(req.body).then(() => {
        return res.status(200).send({
            message: 'user created'
        });
    })
})

module.exports = app;