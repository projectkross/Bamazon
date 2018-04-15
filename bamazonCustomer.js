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
  query = "SELECT * FROM products";

    connection.query(query, function(err, res) {
        if (err) throw err;

        console.log("Store Inventory");
        console.log("---------------\n");

        var itemInfo = "";
        for (var i = 0; i < res.length; i++) {
            itemInfo = "";
            itemInfo += "Item ID: " + res[i].item_id;
            itemInfo += " | Product Name: " + res[i].product_name;
            itemInfo += " | Price: $" + res[i].price;
            itemInfo += " | Quantity: " + res[i].stock_quantity;
            console.log(itemInfo);
    }
    userInput(res);
  });
};



function userInput(res) {
  inquirer.prompt([
    {
    type: "input",
    message: "Enter the Item ID you would like to purchase: ",
    name: "choice",
    validate: function (value) {
      if (isNaN(value) === false) {
          return true;
      }
      return false;
    }
  }
]).then(function(value) {

  query = "SELECT * FROM products";

    connection.query(query, function(err, res) {
        if (err) throw err;

    for (var i = 0; i < res.length; i++) {

      if (res[i].item_id == value.choice) {
        
        var itemSelect = value.choice;
        var itemId = i;
        

        inquirer.prompt([
          {
            type: "input",
            message: "Enter quantity: ",
            name: "quantity",
            validate: function (value) {
              if (isNaN(value) === false) {
                  return true;
              }
              return false;
          }
          }
        ]).then(function(val){
          if ((res[itemId].stock_quantity - val.quantity) > 0) {
            connection.query(
              "UPDATE products SET stock_quantity = " + (res[itemId].stock_quantity - val.quantity) + " WHERE item_id = '" + itemSelect + "'",
              function(err, result) {
                if (err) {
                  throw err;
                }

                console.log("You have purchased item " + res[itemId].product_name + "");
                showItem();
          });
        }
        else {
          console.log("The item you selected is out of stock, please select another");
          userInput(res);
            }
        });
      }
    }
  });
});
};
    

