require('dotenv').config()
const path = require('path');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const indexRouter = require('./route/index');
const inventoryRouter = require('./route/inventory');
const itemRouter = require('./route/item');
const categoryRouter = require('./route/category');

// use view engine ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse json data.
// without this, req.body will be null
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// serve static files .css and .js
app.use(express.static(path.join(__dirname, "public")));
app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);
app.use('/inventory/item', itemRouter);
app.use('/inventory/category', categoryRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});