const router = require('router');
const route = router();
const body = require('body-parser');
const conn = require('../db/db-con/dbCon')

route.use(body.json());

route.get('/real', (req, res)=>{
    res.writeHead(200,  {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      })
     setInterval(()=> {
        conn.query(`SELECT menu_items.item_name, orders_.* FROM orders_ JOIN menu_items ON orders_.item_id = menu_items.item_id WHERE order_status = '0'`, (err, result)=>{
            if (result.length > 0) {
              res.write(`data: ${JSON.stringify(result)}\n\n`);
            }
        })
     }, 2000)
  
})

route.post('/order', (req, res) => {
let arr = req.body.data;
 conn.query(`INSERT INTO orders_ (item_id, order_price, order_qnt, order_image, order_category, room_no, order_status, order_approved, order_date, order_time, order_cus_number) VALUES ?`, [arr], (err, result)=>{
  if (!err) {res.send({msg : "inserted succesfully"})}
 })
})

route.post('/statusAccept', (req, res) => {
  conn.query(`UPDATE orders_ SET order_status = '1', order_approved = 'accepted' WHERE order_id = '${req.body.Id}'`,
   (err, result)=>{
      if(!err){
        res.send({msg : "Order Accepted"})
      }
  })
})

route.post('/statusReject', (req, res) => {
  conn.query(`UPDATE orders_ SET order_status = '1', order_approved = 'rejected' WHERE order_id = '${req.body.Id}'`,
   (err, result)=>{
      if(!err){
        res.send({msg : "Order Rejected"})
      }
  })
})

route.post('/adminhome', (req, res)=>{
  conn.query(`SELECT menu_items.item_name, orders_.* FROM orders_ JOIN menu_items ON orders_.item_id = menu_items.item_id WHERE order_date BETWEEN date_sub('${req.body.start}',INTERVAL ${req.body.end} DAY) AND '${req.body.start}' AND order_approved = 'accepted';`, (err, result)=>{
    if(!err){res.send({result});}
  })
})

module.exports = route;