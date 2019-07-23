const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

mongoose.connect('mongodb+srv://samitha:' + process.env.MONGO_ATLAS_PW + '@node-rest-sample-o1oex.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-requested-with, Content-Type, Accept, Authorization");
    if(req,header === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;