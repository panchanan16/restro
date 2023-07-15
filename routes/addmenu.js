const router = require('router');
const route = router();
const conn = require('../db/db-con/dbCon')
const multer = require('multer');
const body = require('body-parser');

route.use(body.json());

route.use(body.urlencoded({ extended: false }))

const storage = multer.diskStorage(
    {destination : (req, file, cb)=>{cb(null, "public/uploads/");},
     filename: (req, file, cb) => {cb(null, file.originalname)},
    }
)

const uploadStorage =  multer({ storage: storage })

route.get('/add-item', (req, res) => {
    res.render('./adminPage/add_menu');
})

route.post('/submit-items', uploadStorage.single('item-photo'), (req, res) =>{
//    console.log(req.body);
   let pathName = `${req.file.destination.replace('public', '')}${req.file.originalname}`
   conn.query(`INSERT INTO menu_items (item_name, item_category, item_price, half_price, item_image, item_offer, item_avalibility) VALUES ('${req.body.itemName}', '${req.body.category}', '${req.body.price}', '${req.body.half_price}', '${pathName}', '${req.body.offer}', '${req.body.avail}');`, (err, result) => {
    if (!err) {
        res.send("Submitted successfully!");
    }else{console.log(err)}
   })
})

route.get('/getitembyadmin', (req, res) => {
    conn.query(`SELECT cat_agories.category, menu_items.* FROM cat_agories JOIN menu_items ON cat_agories.cat_id = menu_items.item_category`, (err, result) => {
        if (!err) {
            res.send(result);
        }
    })
})

route.post('/deleteitem', (req, res) => {
    conn.query(`DELETE FROM menu_items WHERE item_id = ${req.body.data};`, (err, result) => {
        if (!err) {res.send("Item deleted successfully!")}
    });
})

route.post('/updateMenuItem', uploadStorage.single('item-photo'), (req, res) => {
   conn.query(`UPDATE menu_items SET item_name = '${req.body.itemName}', item_price = '${req.body.price}', item_offer = '${req.body.offer}', item_avalibility = '${req.body.avail}' WHERE item_id = '${req.body.itemId}'`, (err, result) => {
        if (!err) {
            res.send({msg : "Item updated!"})
        }
   })
})

route.get('/categ-ories', (req, res)=>{
    conn.query(`SELECT * FROM cat_agories`, (err, result)=>{
        if (!err) {
            res.send(result);
        }
    })
})

route.post('/createcategory', (req, res)=>{
    conn.query(`INSERT INTO cat_agories (category) VALUES ('${req.body.Category}')`, (err, result)=>{
        if(!err) {
            res.send({msg: 'created category!'})
        }
    })
})

module.exports = route;