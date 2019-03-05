var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const hbs = require('hbs');
var appRoutes = require("./routes/approutes");


var app = express();

// Routes/urls
hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(express.static(__dirname +"/public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', appRoutes);

hbs.registerHelper("formatDatetime", (datetime) => {
  var day = datetime.getDate();
  var month = datetime.getMonth();
  var year = datetime.getFullYear();
  var hour = datetime.getHours();
  var minute = datetime.getMinutes();
  var second = datetime.getSeconds();
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  formatted =day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second
  return formatted;
});

hbs.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
});

hbs.registerHelper('forpages', function(from, to, divide, incr, block) {
    var accum = '';
    for(var i = from+1; i <= Math.ceil(to/divide); i += incr)
        accum += block.fn(i);
    return accum;
});

hbs.registerHelper('ifequals', function(arg1, arg2, options) {
    console.log(arg1, arg2);
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('ifnoteq', function (a, b, options) {
    if (a != b) { return options.fn(this); }
    return options.inverse(this);
});
/*
// cors (?)
// app.use(cors({origin: 'http://localhost:4200'}));
*/


//Exports
module.exports = app;
