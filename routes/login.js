const router = require('router');
const route = router();
const conn = require('../db/db-con/dbCon')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

route.use(cookieParser());

function midwar(req, res, next) {
    jwt.verify(req.cookies.token, "heyWelcome", function(err, resp){
        if(err === null) {next();}else{res.send("expired session ! Plz login to continue")}  
    })
}

route.post('/user/admin', (req, res) => {
    conn.query(`SELECT id, username, password, token FROM admin_login_ WHERE username = '${req.body.username}' AND password = '${req.body.password}'`,async function(err, result){
        if (result.length > 0){
            let datapack = JSON.parse(JSON.stringify(result));
            const tokenn = await jwt.sign({id: datapack[0].id}, "heyWelcome", { expiresIn: "3h"});
            await res.cookie('token', tokenn, {maxAge: 10000000})
            res.redirect('/log')
        };
    })
})

route.get('/log', (req, res)=>{
    res.render("adminPage/admin_page.ejs")    
})

module.exports = route;