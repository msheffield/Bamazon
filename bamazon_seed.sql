DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  product_sales INTEGER(10) NULL,

  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs INT(10) NOT NULL,

    PRIMARY KEY (department_id)
);

USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Charger", "Electronics", 15, 100, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Baseball Cap", "Clothing", 10, 50, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Toothpaste", "Toiletries", 7, 200, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Hydroflask", "Outdoor", 45, 40, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Phone Case", "Electronics", 25, 75, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Waffle Iron", "Kitchen", 40, 5, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Sonicare", "Toiletries", 65, 20, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Sunglasses", "Accessories", 30, 125, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Coffee Mug", "Kitchen", 16, 45, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Garlic Crusher", "Kitchen", 25, 50, 0);


SELECT * FROM products;

SELECT * FROM departments;