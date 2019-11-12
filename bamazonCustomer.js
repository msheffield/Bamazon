var mysql = require("mysql");

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

    connection.end();
});


function printItems(artist) {
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
