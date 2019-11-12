var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Philly2019",
    database: "xat_martDB"
});

//console spacer/divider
var divider = "\n\n------------------------------------------------------------\n\n";

connection.connect(function (err) {
    if (err) throw err;
    welcome();
})

function welcome() {
    inquirer
        .prompt({
            name: "Welcome",
            type: "list",
            message: "Quick, ya wanna buy sumthin?",
            choices: ["Yea, what'd ya got?", "Nah, leave me alone!"]
        }).then(function (answer) {
            if (answer.Welcome === "Yea, what'd ya got?") {
                inventory();
            } else (answer.Welcome === "Nah, leave me alone!")
            console.log("Shit it's the cops!")
            connection.end();
        })
};

//products listed
function inventory() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.log("This is my haul today...")
        for (var i = 0; i < res.length; i++) {
            console.log(divider);
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        };
        orderPlacement();
    });
};

function orderPlacement() {
    inquirer.prompt([{
        name: "inputId",
        type: "input",
        message: "Wha'ya wanna buy, what's the id number?"
    }, {
        name: "inputQuantity",
        type: "input",
        message: "How many ya want?"
    }])
        .then(function (answer) {
            //selects from db the chosen id
            var query = "SELECT product_name, price FROM products WHERE item_id = " + answer.inputId;
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log(res);
                console.log("Your total is" + results[0].price * answers.inputQuantity);
                //checks if there is enough stock
                if (res[0].stock_quantity > answers.inputQuantity) {
                    //subtracts purchase
                    var stockUpdate = results[0].stock_quantity - answers.inputQuantity
                    //updates stock
                    console.log(stockUpdate);
                    connection.query("UPDATE products SET ? WHERE ?", [
                        { stock_quantity: stockUpdate },
                        { item_id: answers.inputId }
                    ]);
                };
            });
        });
};
