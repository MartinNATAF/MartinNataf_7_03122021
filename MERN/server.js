const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes')

require('dotenv').config({path: './config/.env'})

const db = require("./config/db");
db.sequelize.sync();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})