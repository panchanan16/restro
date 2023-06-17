const router = require('router');
const route = router();
const conn = require('../db/db-con/dbCon')
const multer = require('multer');

const storage = multer.diskStorage(
    {
        destination : (req, file, cb)=>{
            cb(null, "public/uploads/");
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
    }
)

const uploadStorage =  multer({ storage: storage })

route.get('/add-item', (req, res) => {
    res.render('./adminPage/add_menu');
})

route.post('/submit-items', uploadStorage.single('item-photo'), (req, res) =>{
   //console.log(req.body.itemName);
   let pathName = `${req.file.destination.replace('public', '')}${req.file.originalname}`
   conn.query(`INSERT INTO menu_items (item_id, item_name, item_category, item_price, item_image, item_offer) VALUES (NULL, '${req.body.itemName}', '1', '100', '${pathName}', '20');`, (err, result) => {
    if (!err) {
        res.send("Submitted successfully!");
    }
   })
})

module.exports = route;