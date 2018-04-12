require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");
var password = process.env.PASSWORD;


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: password,
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  showItem();
});

function showItem() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    var tab = " | ";
    
    for (var i = 0; i < res.length; i++) {
      console.log("item "+ res[i].item_id + tab + res[i].product_name + tab +
        res[i].department_name + tab + res[i].price + tab + res[i].stock_quantity);
    }
    userInput(res);
  });
};

function userInput(res) {
  inquirer.prompt([
    {
    type: "input",
    message: "What item would you like to purchase?",
    name: "choice"
    }
]).then(function(answer) {


    for (var i = 0; i < res.length; i++) {

      if ((res[i].product_name === answer.choice) || (res[i].item_id === answer.choice)) {
        
        var itemSelect = answer.choice;
        var itemId = i;
        

        inquirer.prompt([
          {
            type: "input",
            message: "Enter quantity: ",
            name: "quantity"
          }
        ]).then(function(answer){
          if ((res[itemId].stock_quantity - answer.quantity) > 0) {
            connection.query(
              "UPDATE products SET stock_quantity='" + (res[itemId].stock_quantity - answer.quantity) +
              "' WHERE product_name='" + itemSelect + "'",
              function(err, result) {
                if (err) {
                  throw err;
                }

                console.log("You have purchased " + itemSelect);
                showItem();
          });
        }
        else {
          console.log("The item you selected can't be found, please select another");
          userInput(res);
            }
        });
      }
    }
  });
};
    

