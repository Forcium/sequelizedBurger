var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require ("express-handlebars");
var path = require("path");


//Express application
var app = express();
var PORT = process.env.PORT || 3030;

//Requiring models for syncing below
var db = require("./models");

// Serve static content for the app from the 'public' directory
app.use(express.static(process.cwd() + '/public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.use(express.static(process.cwd() + '/public'));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Import routes and give the server access to them
var routes = require('./controllers/burgers_controller.js')(app);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// LISTENER
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
});
