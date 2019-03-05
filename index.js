'use strict'

var app = require('./server');
const {connection} = require('./database');


//Sets port of app
var port = process.env.PORT || 3000;
app.set('port', port);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${port}...`);
});
