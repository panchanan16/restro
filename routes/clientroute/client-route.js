const router = require('router');
const route = router();
const body = require('body-parser');
const conn = require('../../db/db-con/dbCon')

let arr = [1,2,3,4]
arr.forEach((path)=>{
     route.get(`/menu/${path}`, (req, res)=>{
      conn.query("SELECT cat_agories.category, menu_items.* FROM menu_items JOIN cat_agories ON cat_agories.cat_id = menu_items.item_category", (err, result)=>{
        if(result.length > 0){
          res.render('./clientp/menu', {items: result});
        }
      })
    })
})

route.post('/getcartitem', async (req, res)=>{
    //console.log(req.body.date)
    conn.query(`SELECT menu_items.item_name, orders_.* FROM orders_ JOIN menu_items ON orders_.item_id = menu_items.item_id WHERE order_cus_number = '${req.body.num}' AND order_date = '${req.body.date}'`, (err, result)=>{
        if(!err && result.length > 0){
          res.send(result);
        }
    })
})

route.get('/category', (req, res)=>{
  conn.query(`SELECT category FROM cat_agories`, (err, result)=>{
    if(!err){res.send(result);}
  })
})

route.get('/:xyz/myAllorders', (req, res)=>{
  res.render('./clientp/myorder')
})

module.exports = route;