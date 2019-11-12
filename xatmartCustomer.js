var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Philly2019",
    database: "xat_martDB"
});

//console spacer/divider
var divider = "\n\n------------------------------------------------------------\n\n";


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
})

//global variables
var inputName = "";
var inputPrice = "";
var inputQuantity = "";


function welcome() {
    inquirer
        .prompt({
            name: "Welcome",
            type: "Checkbox",
            message: "Quick and incognito, what do you want?",
            choices: ["Yea, what'cha got in that coat?", "I'm looking for something specific...", "Nah man leave me alone!!!"]
        })
        .then(function (answer) {
            if (answer.welcome === "What cha got in that coat?") {
                inventory();
            } else if(answer.greeting === "I'm looking for something specific...") {
                customerChooses();
            } else (answer.greeting === "Nah man leave me alone!!!")
                connection.end();
        })
};
welcome();

//products listed
function inventory() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
    });
}

function customerChooses() {
    inquirer
        .prompt([{
            name: "inputName",
            type: "Input",
            message: "What do you want to buy?",
        }])
        .prompt([{
            name: "inputQuantity",
            type: "number",
            message: "How many do you want?",
        }])
        .prompt([{
            name: "inputPrice",
            type: "number",
            message: "How much money do you have??",
        }])
}
//ends connection
function boiBye() {
    console.log("Shit it's the cops!")
    connection.end();
}