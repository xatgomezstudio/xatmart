DROP DATABASE IF EXISTS xat_martDB;

CREATE DATABASE xat_martDB;

USE xat_martDB;

CREATE TABLE products (
 item_id INT AUTO_INCREMENT NOT NULL,
 product_name VARCHAR(45) NULL,
 department_name VARCHAR(45) NULL,
 price DECIMAL(10,2) NULL,
 stock_quantity INT,
 PRIMARY KEY (item_id)
);

SELECT * FROM products