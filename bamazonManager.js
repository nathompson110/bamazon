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

// function runSearch() {
//   inquirer
//     .prompt({
//       name: "action",
//       type: "input",
//       message: "What is the id of the item you'd like to purchase?"
  
//     }).then(function(answer){
//      ans = answer.action;
//     if (!(answer.action <= itemLength))
//       {console.log("Please enter a valid ID number");
//       runSearch()
     
//       }else{ purchasing();
//       }
//     }
//     )
// };




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
              res[i].price
          );
          items.push(
            "ID: " +
              res[i].item_id +
              " || Product: " +
              res[i].product_name +
              " || Dept: " +
              res[i].deptartment_name +
              " || Price: " +
              res[i].price
          );

        }
      });
    };

   

// function purchasing() {
//   inquirer
//     .prompt({
//       name: "quantity",
//       type: "input",
//       message: "How many would you like to purchase?"
//     })
//     .then(function(answer) {
//       var query = "SELECT item_id, product_name, price, stock_qty FROM products WHERE ?";
//       connection.query(query, { item_id: ans}, function(err, res) {

//         for (var i = 0; i < res.length; i++) {
//           var updateQuant = res[i].stock_qty - answer.quantity
//           if (answer.quantity > res[i].stock_qty)
//           {console.log("Sorry, there are only "+res[i].stock_qty +" left. Please select a different item or quantity")
//         runSearch();
//       }else if(isNaN(answer.quantity)){
//         console.log("That is not a valid quantity.");
//         purchasing()
//       }else {
//     var totalCost = res[i].price * answer.quantity
//           console.log("Your purchase: " +res[i].product_name + "|| Quantity: "+ answer.quantity  +" ||Unit Price: " +res[i].price + "\n Total cost: " + totalCost);
//            connection.query(
//             "UPDATE products SET ? WHERE ?",
//             [
//               {
//                   stock_qty: updateQuant
//               },
//               {
//                 item_id: ans
//               }
//             ])
//        connection.end();  
       

//       }
       
//         }
//       });
    
  

// });
// }