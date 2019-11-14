var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Smell3gg$",

    database: "bamazon"
});

mainMenu();


function mainMenu() {
    var options = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"];

    inquirer.prompt([
        {
            name: "option",
            message: "Menu Options",
            type: "list",
            choices: options
        }
    ]).then(function (response) {
        console.log(response);

        switch (response.option) {
            case options[0]:
                printInventory();
                break;

            case options[1]:
                printLowInventory();
                break;

            case options[2]:
                addToInventory();
                break;

            case options[3]:
                addNewProduct();
                break;

            default:
                break;
        }
    })
}

function checkDone() {
    inquirer.prompt([
        {
            name: "done",
            message: "Are you done?",
            type: "confirm"
        }
    ]).then(function (response) {
        if (response.done) {
            connection.end()
        }
        else {
            mainMenu();
        }
    })
}



function printInventory() {
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;

            res.forEach(item => {
                console.log(
                    "ID: " + item.item_id + "\n" +
                    "Name: " + item.product_name + "\n" +
                    "Price: " + item.price + "\n" +
                    "Stock: " + item.stock_quantity + "\n" +
                    "-----------------------------"
                )
            })
        }
    )

    console.log("Press any key to continue");
    checkDone();
}

function printLowInventory() {
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 10",
        function (err, res) {
            if (err) throw err;

            res.forEach(item => {
                console.log(
                    "ID: " + item.item_id + "\n" +
                    "Name: " + item.product_name + "\n" +
                    "Price: " + item.price + "\n" +
                    "Stock: " + item.stock_quantity + "\n" +
                    "-----------------------------"
                )
            })
        }
    )

    console.log("Press any key to continue");
    checkDone();
}

function addToInventory() {
    inquirer.prompt([
        {
            name: "id",
            message: "Enter the ID of the product to add inventory to",
            type: "number"
        },
        {
            name: "quantity_to_add",
            message: "Enter amount to add to inventory",
            type: "number"
        }
    ]).then(function (response) {
        getItem(response.id, response.quantity_to_add);
    })
}


function getItem(id, quantity_to_add) {
    let stock_item_quantity = 0;

    connection.query(
        "SELECT * FROM products WHERE item_id = ?",
        id,
        function (err, res) {
            if (err) throw err;
            stock_item_quantity = res[0].stock_quantity;

            new_quantity = stock_item_quantity + quantity_to_add;

            updateQuantity(id, new_quantity);
        }
    )
}


function updateQuantity(id, new_quantity) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: new_quantity
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            if (err) throw err;

            console.log("Item inventory updated");
        }
    )

    console.log("Press any key to continue");
    checkDone();
}


function addNewProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            message: "Enter the product name",
            type: "input"
        },
        {
            name: "department_name",
            message: "Enter the department name",
            type: "input"
        },
        {
            name: "price",
            message: "Enter the price",
            type: "number"
        },
        {
            name: "stock_quantity",
            message: "Enter the stock quantity",
            type: "number"
        }
    ]).then(function (response) {
        connection.query(
            "INSERT INTO products SET ?",
            [
                {
                    product_name: response.product_name,
                    department_name: response.department_name,
                    price: response.price,
                    stock_quantity: response.stock_quantity,
                    product_sales: 0
                }
            ],
            function (err, res) {
                if (err) throw err;

                console.log("Added item: " + response.product_name);
            }
        )

        console.log("Press any key to continue");
        checkDone();
    })
}