var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Smell3gg$",

    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    printItems();

    promptUser();

});


function printItems() {
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;

            res.forEach(item => {
                console.log(
                    "ID: " + item.item_id + "\n" +
                    "Name: " + item.product_name + "\n" +
                    "Price: " + item.price + "\n" +
                    "-----------------------------"
                )
            })
        }
    )
}

function promptUser() {
    inquirer.prompt([
        {
            name: "id",
            message: "Input the ID of the product you wish to order",
            type: "number"
        },
        {
            name: "quantity",
            message: "Input the quantity you would like to purchase",
            type: "number"
        }
    ]).then(function (response) {

        getItem(response.id, response.quantity);


    })
}

function getItem(id, quantity) {
    let stock_item_quantity = 0;
    let stock_item_sales = 0;
    let price = 0;

    connection.query(
        "SELECT * FROM products WHERE item_id = ?",
        id,
        function (err, res) {
            if (err) throw err;

            console.log(res);
            stock_item_quantity = res[0].stock_quantity;
            stock_item_sales = res[0].product_sales;
            price = res[0].price;

            let new_sales = (price * quantity) + stock_item_sales;

            console.log("stock item = " + stock_item_quantity);

            if (stock_item_quantity < quantity) {
                console.log("Insufficient quantity");
            }
            else {
                let new_quantity = stock_item_quantity - quantity;

                updateItem(id, new_quantity, new_sales);
            }
        }
    )
}


function updateItem(id, new_quantity, new_sales) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: new_quantity,
                product_sales: new_sales
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            if (err) throw err;

            console.log(res)
        }
    )
}