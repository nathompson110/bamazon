var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'root',
    database: 'bamazondb'
});

connection.connect(function(err){
    // createProduct();
});

function createProduct (){
    var query = connection.query(

      
        'insert into products set ?',
       {
            product_name: 'Mona Lisa',
            deptartment_name: 'Priceless art',
            price: 5000000000,
            stock_qty: 1
        },
          
          
        function (err, response){
            console.log(response.affectedRows + " products inserted");
        })
    
 
}

          