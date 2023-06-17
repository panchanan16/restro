const express = require('express');
const ejs = require('ejs');
const app = express();
const rout = require('./routes/login');
const MArout = require('./routes/main-admin-route');
const clientrout =  require('./routes/clientroute/client-route');
const insight =  require('./routes/insight');
const addItem = require('./routes/addmenu')
const body = require('body-parser');
const jwt = require('jsonwebtoken')
const path = require('path');
// const ad = require('./routes/adminpage-route')
const cookieParser = require('cookie-parser')

// app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(body.json());
app.use(express.static(path.join(__dirname, "public")))
app.get('/adm', (req, res)=>{
   res.render('adminPage/admin_login.ejs')
})
app.get('/', (req, res)=>{
    res.send("Welcome to restro");
    });
app.use('/', rout)
app.use('/', MArout)
app.use('/', clientrout)
app.use('/', insight)
app.use('/', addItem)

app.listen(3000, ()=>{
    console.log("server started")
})