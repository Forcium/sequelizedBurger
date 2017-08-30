
var db = require("../models");

module.exports = function(app) {

// Retrieve the list of all burgers in the database
  app.get("/", function(req, res){
    db.burger.findAll({})
    .then(function(data){
      var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});



// Create a new burger entry
app.post("/burgers", function(req, res) {
  db.burger.create(req.body)
  .then(function(burger) {
    res.redirect("/");
  });
});

// Update an existing burger entry
app.put("/:id", function(req, res) {
  db.burger.update (
    {
      devoured: true,
    },
    {
      where: {
        id: req.params.id
      }
    }).then(function(burger) {
      res.redirect("/");
    });
  });

// DELETE route for deleting devoured burgers
  app.delete("/:id", function(req, res) {
    db.burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(burger) {
      res.redirect("/");
    });
  });
};
