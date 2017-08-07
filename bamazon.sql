USE bamazondb;

CREATE TABLE products (
	item_id int NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (100) NOT NULL,
	deptartment_name VARCHAR(100) NULL,
	price DECIMAL (10,2) NULL,
	stock_qty INT NULL,
	PRIMARY KEY (item_id)
	)



