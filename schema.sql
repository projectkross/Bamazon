CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  product_sales DECIMAL(10,2) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (item_id)
);

select * from products;

INSERT INTO products (product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Pandemic", 0, "Board Games", 39.99, 70),
  ("Munchkin", 0, "Board Games", 29.99, 100),
  ("Microsoft Xbox One S", 0, "Game Console", 299.99, 50),
  ("Sony PlayStation 4 Pro", 0, "Game Console", 399.99, 30),
  ("Nintendo Switch", 0, "Game Console", 299.99, 40),
  ("Mountain Dew 12oz", 0, "Food & Beverage", 1.25, 120),
  ("Doritos", 0, "Food & Beverage", 1.99, 90),
  ("Deer Park Spring Water 16oz 24 pack", 0, "Food & Beverage", 19.99, 47),
  ("Samsung UHDTV 70in", 0, "Electronics", 1350.00, 15),
  ("Vizio 4k TV 75in", 0, "Electronics", 1399.99, 23);