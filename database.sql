CREATE TABLE admin_login_ (
     id int AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(20),
     password VARCHAR(20),
     token VARCHAR(100)
);

CREATE TABLE cat_agories (
     cat_id int AUTO_INCREMENT PRIMARY KEY,
     category VARCHAR(60)
);

CREATE TABLE menu_items (
     item_id int AUTO_INCREMENT PRIMARY KEY,
     item_name VARCHAR(60),
     item_category INT(60) NOT NULL,
     item_price INT(60),
     item_image VARCHAR(500),
     item_offer VARCHAR(10),
     item_avalibility INT(3),
     FOREIGN KEY (cat_id) REFERENCES cat_agories(cat_id)
);

CREATE TABLE orders_ (
     order_id int AUTO_INCREMENT PRIMARY KEY,
     item_id int(60),
     order_price VARCHAR(60),
     order_qnt VARCHAR(10),
     order_image VARCHAR(500),
     order_category VARCHAR(60),
     room_no VARCHAR(20),
     order_status BOOLEAN NOT NULL default FALSE,
     order_approved VARCHAR(15),
     order_date DATE,
     order_time TIME
);

ALTER TABLE `orders_` ADD CONSTRAINT `item_id` FOREIGN KEY (`i_id`) REFERENCES `menu_items`(`item_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE orders_ ADD COLUMN order_cus_number VARCHAR(12) AFTER order_time;

ALTER TABLE menu_items ADD COLUMN item_category VARCHAR(60) AFTER item_name;

ALTER TABLE `menu_items` ADD CONSTRAINT `item_category` FOREIGN KEY (`item_category`) REFERENCES `cat_agories`(`cat_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE menu_items ADD COLUMN item_avalibility INT(3) AFTER item_offer;

ALTER TABLE orders_ ADD COLUMN order_update VARCHAR(5) AFTER order_cus_number;