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
    var options = ["View Product Sales by Department", "Create New Department"];

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
                viewProductSalesByDepartment();
                break;

            case options[1]:
                CreateNewDepartment();
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

