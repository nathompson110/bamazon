var mysql = require('mysql');
var inquirer = require('inquirer');
var items = [];
var itemLength = 0;
var ans = 0;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'root',
    database: 'bamazondb'
});

connection.connect(function(err){
    if (err) {throw err};
    promptList();   
});

function promptList() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          listOptions();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addProduct();
          break;
      }
    });
}

function listOptions() {
      connection.query("SELECT * FROM products", function(err, res) {
        itemLength = res.length;
        console.log("\n");
        for (var i = 0; i < res.length; i++) {
          console.log(
            "ID: " +
              res[i].item_id +
              " || Product: " +
              res[i].product_name +
              " || Dept: " +
              res[i].deptartment_name +
              " || Price: " +
              res[i].price +
              " || Quantity: " +
              res[i].stock_qty
          );

        }
      });
   
    };

     function lowInventory(){

         connection.query("SELECT * FROM products", function(err, res) {
        itemLength = res.length;
        console.log("\n");
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_qty < 5)
          console.log(
            "ID: " +
              res[i].item_id +
              " || Product: " +
              res[i].product_name +
              " || Dept: " +
              res[i].deptartment_name +
              " || Price: " +
              res[i].price +
               " || Quantity: " +
              res[i].stock_qty
          );

        }
      });
 
     }

function addInventory() {
  listOptions()
  inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "What is the id of the item you'd like to increase?"
  
    }).then(function(answer){
        connection.query("SELECT * FROM products", function(err, res) {
        itemLength = res.length;
       ans = answer.action;
    if (!(answer.action <= itemLength))
      {console.log(itemLength);
      addInventory()
     
      }else{ purchasing();
      }
    }
    )
});

}

function purchasing() {
  inquirer
    .prompt({
      name: "quantity",
      type: "input",
      message: "How many would you like to add?"
    })
    .then(function(answer) {
      var query = "SELECT item_id, product_name, price, stock_qty FROM products WHERE ?";
      connection.query(query, { item_id: ans}, function(err, res) {

        for (var i = 0; i < res.length; i++) {
          var updateQuant = res[i].stock_qty + parseInt(answer.quantity,10);
          console.log("Previous Quantity: " +res[i].stock_qty)
          console.log("Current Quantity:" +updateQuant);
          if (!(res[i].stock_qty>0))
          {console.log("Sorry, you need to choose a number greater than 0");
        purchasing();
      }else if(isNaN(answer.quantity)){
        console.log("That is not a valid quantity.");
        purchasing();
      }else {
          console.log("You have increased the quantity of " + res[i].product_name + " by " +answer.quantity);
           connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                  stock_qty: updateQuant
              },
              {
                item_id: ans
              }
            ])
       connection.end();  
       

      }
       
        }
      });
    
  

});
}

function addProduct(){
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the name of the item you would like to add?"
      },
      {
        name: "dept",
        type: "input",
        message: "What department would you like to place your item in?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of the item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: " What is the quantity of this item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
     
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          deptartment_name: answer.dept,
          price: answer.price,
          stock_qty: answer.quantity
        }
      )
      console.log( "Added: "+ answer.item + " || Quantity: " + answer.quantity)
     
    });
   
};
