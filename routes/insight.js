const router = require('router');
const route = router();
const body = require('body-parser');
const conn = require('../db/db-con/dbCon')


route.get('/insight', (req, res) => {
    res.render('./adminPage/insightData')
})

route.get('/totalorder', (req, res) => {
    conn.query(`SELECT order_approved,  COUNT(*) AS total FROM orders_ GROUP BY order_approved;`, (err, result)=>{
        if(!err){res.send(result)}
    })
})

route.post("/getByPeriod", (req, res)=>{
    console.log(req.body)    //                                 start             end
    conn.query(`SELECT * FROM orders_ WHERE order_date between date_sub('${req.body.start}',INTERVAL ${req.body.end} DAY) and '${req.body.start}';  SELECT order_approved,  COUNT(*) AS total FROM orders_ WHERE order_date between date_sub('${req.body.start}',INTERVAL ${req.body.end} DAY) and '${req.body.start}' GROUP BY order_approved;`, (err, result)=>{
        if (!err && result.length > 0) {res.send(result);}else{res.send({msg : "No data Available"});
            console.log(err);}
    })
})

route.post("/getByDate", (req, res)=>{
    console.log(req.body)    //                                
    conn.query(`SELECT menu_items.item_name, orders_.* FROM orders_ JOIN menu_items ON orders_.item_id = menu_items.item_id WHERE order_date = '${req.body.start}'; SELECT order_approved,  COUNT(*) AS total FROM orders_ WHERE order_date = '${req.body.start}' GROUP BY order_approved;`, (err, result)=>{
        if (!err && result.length > 0) {res.send(result);}else{res.send({msg : "No data Available"});
            console.log(err)
        }
    })
})

module.exports = route;