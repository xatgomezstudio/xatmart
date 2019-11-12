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
            boiBye();
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
        customerChooses()
    });
};

function customerChooses() {
    inquirer
        .prompt([{
            name: "inputId",
            type: "input",
            message: "Wha'ya wanna buy, what's the id number?"
        }, {
            name: "inputQuantity",
            type: "input",
            message: "How many ya want?"
        }]).then(function (answer) {
            console.log("So you want " + answers.Quantity + " # " + answers.inputId);
            connection.query("SELECT * FROM products WHERE item_id=?", [answer.inputId], function (err, results) {
                if (err) throw err;
                console.log(results);
            });
        });
};
// boiBye();

//ends connection
function boiBye() {
    console.log("Shit it's the cops!")
    connection.end();
};