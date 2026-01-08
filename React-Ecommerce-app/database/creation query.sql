create database reactdb;

use reactdb;

CREATE TABLE `user_register` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `area` VARCHAR(150) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `pincode` INT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `brand_id` INT NOT NULL,
  `price` INT NOT NULL,
  `sizes` INT NOT NULL,
  `image_path` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_brand` (`brand_id`),
  KEY `idx_product_name` (`product_name`)
);

CREATE TABLE `cartlist` (
  `cart_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `size` VARCHAR(10) DEFAULT NULL,
  `added_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),

  -- Indexes for fast search
  KEY `idx_user` (`user_id`),
  KEY `idx_product` (`product_id`),

  -- Foreign keys
  CONSTRAINT `fk_cart_user`
    FOREIGN KEY (`user_id`) REFERENCES `user_register`(`id`)
    ON DELETE CASCADE,

  CONSTRAINT `fk_cart_product`
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
    ON DELETE CASCADE
);

ALTER TABLE products
MODIFY COLUMN price VARCHAR(50) NOT NULL,
MODIFY COLUMN sizes VARCHAR(100) NOT NULL,
MODIFY COLUMN brand VARCHAR(100) NOT NULL,
MODIFY COLUMN image_path VARCHAR(255) NOT NULL,
MODIFY COLUMN description TEXT NOT NULL;


INSERT INTO `products` (
  id, product_id, product_name, brand, price, sizes, image_path, description
) VALUES
(1, 1, 'Nike Phantom GX Elite', 'Nike', 8999, '["7","8","9","10"]', './data/PHANTOM+GX+ELITE+FG.jpg', 'Engineered for precision and control on firm ground pitches.'),
(2, 2, 'Adidas Predator Accuracy FG', 'Adidas', 8499, '["6","7","8","9"]', './data/Adidas Predator Accuracy+ FG.jpg', 'Designed for ultimate ball control and power with grippy upper zones.'),
(3, 3, 'Puma Future Ultimate FG/AG', 'Puma', 7999, '["7","8","9","10","11"]', './data/Puma Future Ultimate.jpg', 'Lightweight and dynamic for agile playmakers and creative players.'),
(4, 4, 'Nike Mercurial Superfly 9', 'Nike', 9999, '["6","7","8","9","10"]', './data/Nike Mercurial Superfly.jpg', 'Ultra-light design for explosive speed and precision acceleration.'),
(5, 5, 'Adidas X Crazyfast.1', 'Adidas', 8799, '["6","7","8","9","10"]', './data/Adidas X Crazyfast.1.jpg', 'Built for top speed and lightweight comfort on firm ground.'),
(6, 6, 'Puma Ultra Match FG/AG', 'Puma', 7299, '["7","8","9","10"]', './data/Puma Ultra Match.jpeg', 'Speed-focused boots crafted for ultimate acceleration.'),
(7, 7, 'New Balance Furon v7 Pro', 'New Balance', 8199, '["6","7","8","9","10"]', './data/New Balance Furon v7 Pro.jpg', 'Designed for attacking players who thrive on explosive power.'),
(8, 8, 'Nike Tiempo Legend 10 Elite', 'Nike', 9499, '["7","8","9","10","11"]', './data/Nike Tiempo Legend 10 Elite.jpeg', 'Classic leather comfort meets modern performance and grip.'),
(9, 9, 'Adidas Copa Pure II', 'Adidas', 7699, '["6","7","8","9","10","11"]', './data/Adidas Copa Pure II.jpg', 'Premium leather feel offering touch and precision on every strike.'),
(10, 10, 'Puma King Ultimate', 'Puma', 8999, '["7","8","9","10"]', './data/Puma King Ultimate.jpg', 'Iconic boot re-engineered for comfort, control, and performance.'),
(11, 11, 'Umbro Velocita Alchemist Pro', 'Umbro', 7499, '["6","7","8","9","10"]', './data/Umbro Velocita Alchemist Pro.jpg', 'Made for players who combine agility with precision movement.'),
(12, 12, 'Mizuno Morelia Neo III', 'Mizuno', 9999, '["7","8","9","10","11"]', './data/Mizuno Morelia Neo III.jpg', 'Handcrafted Japanese quality with lightweight K-leather upper.'),
(13, 13, 'Nike Phantom Luna II', 'Nike', 9299, '["5","6","7","8","9"]', './data/Nike Phantom Luna II.jpg', 'Tailored fit for enhanced touch and precision for agile players.'),
(14, 14, 'Adidas Predator Edge.1', 'Adidas', 8799, '["6","7","8","9","10"]', './data/Adidas Predator Edge.1.jpg', 'Enhanced power zones designed for maximum curve and accuracy.'),
(15, 15, 'Puma Future Z 1.4', 'Puma', 8299, '["7","8","9","10"]', './data/Puma Future Z 1.4.jpg', 'Dynamic compression band ensures a snug, adaptive fit.'),
(16, 16, 'Nike Zoom Mercurial Vapor 15', 'Nike', 9499, '["6","7","8","9"]', './data/Nike Zoom Mercurial Vapor 15.jpg', 'Made for explosive acceleration and precision passing.'),
(17, 17, 'Adidas X Speedportal', 'Adidas', 8799, '["7","8","9","10"]', './data/Adidas X Speedportal.jpg', 'Lightweight boot for maximum energy return and top speed.'),
(18, 18, 'Puma Ultra Ultimate FG', 'Puma', 8999, '["6","7","8","9","10"]', './data/Puma Ultra Ultimate FG.jpg', 'Ultra-light and comfortable, perfect for fast-paced players.'),
(19, 19, 'Nike StreetGato Turf', 'Nike', 6999, '["6","7","8","9","10"]', './data/Nike StreetGato Turf.jpg', 'For street and turf players — comfort, traction, and control.'),
(20, 20, 'Adidas Copa Mundial Classic', 'Adidas', 9999, '["7","8","9","10","11"]', './data/Adidas Copa Mundial Classic.jpg', 'Iconic leather boot offering timeless style and unmatched touch.');
