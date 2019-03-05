const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mysql.stud.ntnu.no',
    user: 'magnram_db_acc',
    password: 'db_acc',
    database: 'magnram_db'
});

// connect to database
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

//On Ctrl + C, end connection
connection.on('SIGINT', function() {
    console.log("Gracefully closes server")
    connection.exit();
});

//Exports
module.exports = connection;
