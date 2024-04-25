const express = require('express');
const createError = require('http-errors');
const path=require("path");
const cors = require('cors'); 
const app = express();
const dotenv = require('dotenv').config({path: path.join(__dirname, '.env')});

app.use(cors())


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.set("view engine", "ejs");



// Initialize DB
require('./initDB')();

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'content-type, Origin, X-Requested-With, Content-Type, Accept, X-Access-Token');
    //res.setHeader('Access-Control-Allow-Headers', '*');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {

  res.send('api is working...');
});




app.use('/uploads',express.static(__dirname + '/uploads')); 

// app.use('/public',express.static(path.join(__dirname,'uploads')));


// importing routes 
const UserRoute = require('./Routes/User.route');
app.use('/user', UserRoute);

const ProductRoute = require('./Routes/Product.route');
app.use('/product', ProductRoute);

const CategoryRoute = require('./Routes/Category.route');
app.use('/category', CategoryRoute);

const CartRoute = require('./Routes/Cart.route');
app.use('/cart', CartRoute);

const AddressRoute = require('./Routes/Address.route');
app.use('/address', AddressRoute);

const OrderRoute = require('./Routes/Order.route');
app.use('/order', OrderRoute);

const DashboardRoute=require('./Routes/Dashboard.route');
app.use('/count',DashboardRoute);



//404 handler and pass to error handler
app.use((req, res, next) => {
  /*
  const err = new Error('Not found');
  err.status = 404;
  next(err);
  */
  // You can use the above code if your not using the http-errors module
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

//  Settings 
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});



//npm run dev   (for start with nodemoon)
//npm start (for start)