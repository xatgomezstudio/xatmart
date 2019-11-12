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
    welcome();
})

function welcome() {
    inquirer
        .prompt({
            name: "Welcome",
            type: "list",
            message: "Quick and incognito, what do you want?",
            choices: ["STUFF", "NOTHIN"]
        }).then(function (answer) {
            if (answer.Welcome === "STUFF") {
                inventory();
            } else (answer.Welcome === "NOTHIN")
            // boiBye();
        })
};

//products listed
function inventory() {
    console.log("This is my haul today...\n");
    connection.query("SELECT * FROM products", function (err, res, fields) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(divider + result + divider);
    });
    // customerChooses();
}

// function customerChooses() {
//     inquirer
//         .prompt([{
//             name: "inputId",
//             type: "input",
//             message: "Wha'ya wanna buy, what's the id number?"
//         }, {
//             name: "inputQuantity",
//             type: "input",
//             message: "How many do you want?"
//         }]).then(function (answer) {
//             console.log("So you want " + answers.Quantity + " # " + answers.inputId);
//             connection.query("SELECT * FROM products WHERE item_id=?", [answer.inputId], function (err, results) {
//                 if (err) throw err;
//                 console.log(results);
//             });
//         });
//     boiBye();
// };

// //ends connection
// function boiBye() {
//     console.log("Shit it's the cops!")
//     connection.end();
// }