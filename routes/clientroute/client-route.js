const router = require('router');
const route = router();
const body = require('body-parser');
const conn = require('../../db/db-con/dbCon')

let arr = [1,2,3,4]
arr.forEach((path)=>{
     route.get(`/menu/${path}`, (req, res)=>{
      conn.query("SELECT * FROM menu_items", (err, result)=>{
        if(result.length > 0){
          res.render('./clientp/menu', {items: result});
        }
      })
    })
})

route.post('/getcartitem', (req, res)=>{
    console.log(req.body)
    conn.query(`SELECT menu_items.item_name, orders_.* FROM orders_ JOIN menu_items ON orders_.item_id = menu_items.item_id WHERE order_cus_number = '${req.body.num}'`, (err, result)=>{
        if(!err && result.length > 0){
          res.send(result);
        }
    })
})

module.exports = route;